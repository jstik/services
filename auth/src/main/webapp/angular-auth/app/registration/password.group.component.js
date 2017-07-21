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
var password_validator_1 = require("../validators/password.validator");
var forms_1 = require("@angular/forms");
var PasswordGroupComponent = (function () {
    function PasswordGroupComponent(fBuilder) {
        this.fBuilder = fBuilder;
        this.passwordGroup = this.fBuilder.group({
            password: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            confirmPassword: ['', forms_1.Validators.required]
        }, {
            validator: forms_1.Validators.compose([password_validator_1.PasswordValidator.matchPassword, password_validator_1.PasswordValidator.strongPassword])
        });
    }
    PasswordGroupComponent.prototype.markAsTouched = function () {
        for (var control in this.passwordGroup.controls) {
            this.passwordGroup.controls[control].markAsTouched(false);
        }
    };
    PasswordGroupComponent.prototype.isValid = function () {
        return this.passwordGroup.valid;
    };
    PasswordGroupComponent.prototype.isTouched = function () {
        return this.passwordGroup.touched;
    };
    PasswordGroupComponent.prototype.getPassword = function () {
        return this.password;
    };
    return PasswordGroupComponent;
}());
PasswordGroupComponent = __decorate([
    core_1.Component({
        selector: 'password-group',
        template: "\n        <div [formGroup] =\"passwordGroup\">\n        <extended-input [labelText] =\"'Password'\"\n                        [isError]=\"passwordGroup.controls.password.errors && passwordGroup.controls.password.touched\" >\n            <input type=\"password\"  formControlName=\"password\"   id=\"password\"\n                   name=\"password\" placeholder=\"\" class=\"form-control\"\n                   [(ngModel)]=\"password\">\n              <error-message *ngIf=\"passwordGroup.controls.password.errors?.strongPassword && passwordGroup.controls.password.touched\">\n                Password needs to be at least 6 characters and contains uppercase character as well as digital character.\n            </error-message>       \n        </extended-input>\n        <extended-input [labelText] =\"'Confirm Password'\"\n                        [isError]=\"passwordGroup.controls.confirmPassword.errors && passwordGroup.controls.confirmPassword.touched\" >\n            <input type=\"password\"  formControlName=\"confirmPassword\" [formGroup]=\"passwordGroup\" id=\"confirmPassword\"\n                   name=\"confirmPassword\" placeholder=\"\" class=\"form-control\">\n            <error-message *ngIf=\"passwordGroup.controls.password.errors?.required && passwordGroup.controls.password.touched\">\n                Password is required\n            </error-message>\n            <error-message *ngIf=\"passwordGroup.controls.confirmPassword.errors?.matchPassword && passwordGroup.controls.confirmPassword.touched\">\n                Password not match\n            </error-message>\n          \n        </extended-input>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], PasswordGroupComponent);
exports.PasswordGroupComponent = PasswordGroupComponent;
//# sourceMappingURL=password.group.component.js.map