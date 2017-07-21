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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var add_registration_directive_1 = require("./add.registration.directive");
var registration_form_component_1 = require("./registration.form.component");
var success_registration_component_1 = require("./success.registration.component");
var registration_service_1 = require("./registration.service");
var server_error_service_1 = require("../_handle/server.error.service");
var RegistrationContainer = (function () {
    function RegistrationContainer(componentFactoryResolver, regService, serverErrorService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.regService = regService;
        this.serverErrorService = serverErrorService;
    }
    RegistrationContainer.prototype.loadForm = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(registration_form_component_1.RegistrationFormComponent);
        var viewContainerRef = this.adRegistration.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    };
    RegistrationContainer.prototype.loadSuccessView = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(success_registration_component_1.SuccessRegistration);
        var viewContainerRef = this.adRegistration.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    };
    RegistrationContainer.prototype.ngOnDestroy = function () {
    };
    RegistrationContainer.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.loadForm();
        var subscription = this.regService.getRegistrationMessages().subscribe(function (message) {
            if (message.type === 'regSuccess') {
                _this.loadSuccessView();
            }
            else {
                _this.serverErrorService.testResponse(message.error);
                console.log(message.error);
            }
        });
    };
    return RegistrationContainer;
}());
__decorate([
    core_1.ViewChild(add_registration_directive_1.AdDirective),
    __metadata("design:type", add_registration_directive_1.AdDirective)
], RegistrationContainer.prototype, "adRegistration", void 0);
__decorate([
    core_1.ViewChild(registration_form_component_1.RegistrationFormComponent),
    __metadata("design:type", registration_form_component_1.RegistrationFormComponent)
], RegistrationContainer.prototype, "form", void 0);
RegistrationContainer = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'registration.container.html'
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
        registration_service_1.RegistrationService,
        server_error_service_1.ServerErrorService])
], RegistrationContainer);
exports.RegistrationContainer = RegistrationContainer;
//# sourceMappingURL=registration.container.component.js.map