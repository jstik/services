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
var password_service_1 = require("./password.service");
var server_error_service_1 = require("../_handle/server.error.service");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(passwordService, serverErrorService) {
        this.passwordService = passwordService;
        this.serverErrorService = serverErrorService;
        this.submitted = false;
        this.notFound = false;
    }
    ForgotPasswordComponent.prototype.submit = function () {
        var _this = this;
        if (this.username) {
            this.passwordService.resendRegistrationEmail(this.username)
                .subscribe(function (success) {
                _this.submitted = true;
            }, function (error) {
                if (!_this.serverErrorService.testResponse(error)) {
                    _this.notFound = true;
                }
            });
        }
    };
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'forgot.password.html',
        styleUrls: ['password.css']
    }),
    __metadata("design:paramtypes", [password_service_1.PasswordService,
        server_error_service_1.ServerErrorService])
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot.password.component.js.map