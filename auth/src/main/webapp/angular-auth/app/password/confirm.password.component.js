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
var router_1 = require("@angular/router");
var password_group_component_1 = require("../registration/password.group.component");
var password_service_1 = require("./password.service");
var server_error_service_1 = require("../_handle/server.error.service");
var authentication_service_1 = require("../service/authentication.service");
var alert_service_1 = require("../service/alert.service");
var ConfirmPasswordComponent = (function () {
    function ConfirmPasswordComponent(passwordService, serverErrorService, activatedRoute, authService, router, alertService) {
        this._submitted = false;
        this.passwordService = passwordService;
        this.serverErrorService = serverErrorService;
        this.authService = authService;
        this.router = router;
        this.alertService = alertService;
        this.redirectUrl = activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }
    Object.defineProperty(ConfirmPasswordComponent.prototype, "user", {
        set: function (value) {
            this._user = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfirmPasswordComponent.prototype, "key", {
        set: function (value) {
            this._key = value;
        },
        enumerable: true,
        configurable: true
    });
    ConfirmPasswordComponent.prototype.isValid = function () {
        return this.passwordGroup.isValid();
    };
    ConfirmPasswordComponent.prototype.isTouched = function () {
        return this.passwordGroup.isTouched();
    };
    Object.defineProperty(ConfirmPasswordComponent.prototype, "submitted", {
        get: function () {
            return this._submitted;
        },
        set: function (value) {
            this._submitted = value;
        },
        enumerable: true,
        configurable: true
    });
    ConfirmPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.passwordGroup.markAsTouched();
        if (this.isValid()) {
            var self_1 = this;
            var password_1 = this.passwordGroup.getPassword();
            this.passwordService.confirmPassword(password_1, this._user.username, this._key)
                .subscribe(function (res) {
                _this.submitted = true;
                console.debug("Password submitted successfully");
                _this.authService.login(_this._user.username, password_1)
                    .subscribe(function (success) {
                    self_1.router.navigate([self_1.redirectUrl]);
                    self_1.alertService.success(' Welcome! You successfully complete account registration', true, 4000);
                }, function (er) {
                    _this.serverErrorService.testResponse(er);
                });
            }, function (er) {
                _this.serverErrorService.testResponse(er);
            });
        }
    };
    return ConfirmPasswordComponent;
}());
__decorate([
    core_1.ViewChild('passwordGroup'),
    __metadata("design:type", password_group_component_1.PasswordGroupComponent)
], ConfirmPasswordComponent.prototype, "passwordGroup", void 0);
ConfirmPasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'confirm.password.html',
        styleUrls: ['password.css']
    }),
    __metadata("design:paramtypes", [password_service_1.PasswordService,
        server_error_service_1.ServerErrorService,
        router_1.ActivatedRoute,
        authentication_service_1.AuthenticationService,
        router_1.Router,
        alert_service_1.AlertService])
], ConfirmPasswordComponent);
exports.ConfirmPasswordComponent = ConfirmPasswordComponent;
//# sourceMappingURL=confirm.password.component.js.map