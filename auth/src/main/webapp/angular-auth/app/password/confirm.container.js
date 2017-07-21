"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var add_confirm_directive_1 = require("./add.confirm.directive");
var password_service_1 = require("./password.service");
var router_1 = require("@angular/router");
var confirm_password_component_1 = require("./confirm.password.component");
var fail_confirm_password_component_1 = require("./fail.confirm.password.component");
var server_error_service_1 = require("../_handle/server.error.service");
var ConfirmContainer = (function () {
    function ConfirmContainer(passwordService, route, componentFactoryResolver, serverErrorService) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.username = route.snapshot.params.username;
        this.key = route.snapshot.queryParams.key;
        passwordService.checkLink(this.username, this.key)
            .subscribe(function (user) {
            _this.user = user;
            _this.loadConfirmPassword();
        }, function (error) {
            console.debug(error);
            if (!serverErrorService.testResponse(error)) {
                _this.loadFailConfirmPassword();
            }
        });
    }
    ConfirmContainer.prototype.loadConfirmPassword = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(confirm_password_component_1.ConfirmPasswordComponent);
        var containerRef = this.adConfirmDirective.viewContainerRef;
        containerRef.clear();
        var instance = containerRef.createComponent(componentFactory).instance;
        instance.user = this.user;
        instance.key = this.key;
    };
    ConfirmContainer.prototype.loadFailConfirmPassword = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(fail_confirm_password_component_1.FailConfirmPasswordComponent);
        var containerRef = this.adConfirmDirective.viewContainerRef;
        containerRef.clear();
        containerRef.createComponent(componentFactory);
    };
    return ConfirmContainer;
}());
__decorate([
    core_1.ViewChild(add_confirm_directive_1.AdConfirmDirective),
    __metadata("design:type", add_confirm_directive_1.AdConfirmDirective)
], ConfirmContainer.prototype, "adConfirmDirective", void 0);
ConfirmContainer = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'confirm.container.html',
    }),
    __param(0, core_1.Inject(password_service_1.PasswordService)),
    __metadata("design:paramtypes", [password_service_1.PasswordService,
        router_1.ActivatedRoute,
        core_1.ComponentFactoryResolver,
        server_error_service_1.ServerErrorService])
], ConfirmContainer);
exports.ConfirmContainer = ConfirmContainer;
//# sourceMappingURL=confirm.container.js.map