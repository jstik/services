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
var user_1 = require("../model/user");
var tenant_1 = require("../model/tenant");
var forms_1 = require("@angular/forms");
var common_validator_1 = require("../validators/common.validator");
var registration_service_1 = require("./registration.service");
var user_name_validator_1 = require("../validators/user.name.validator");
var RegistrationFormComponent = (function () {
    /*  @ViewChild('passwordGroup') passwordGroup : PasswordGroupComponent;*/
    function RegistrationFormComponent(fBuilder, registrationService) {
        this.user = new user_1.User(-1, '');
        this.tenant = new tenant_1.Tenant(-1, '');
        this.registrationService = registrationService;
        this.loginForm = fBuilder.group({
            login: ['', forms_1.Validators.compose([forms_1.Validators.required,
                    common_validator_1.CommonValidator.WithoutWhitespaces,
                    forms_1.Validators.minLength(4),
                ]), user_name_validator_1.UsernameValidator.checkUsername],
        });
        this.companyName = fBuilder.group({
            companyName: ['', forms_1.Validators.compose([forms_1.Validators.required])],
        });
        this.emailGroup = fBuilder.group({
            emailControl: ['', forms_1.Validators.compose([forms_1.Validators.required, common_validator_1.CommonValidator.ValidateEmail])],
        });
        this.firstNameGroup = fBuilder.group({
            firstNameGroup: ['', forms_1.Validators.compose([forms_1.Validators.required])]
        });
        this.lastNameGroup = fBuilder.group({
            lastNameGroup: ['', forms_1.Validators.compose([forms_1.Validators.required])]
        });
        this.regForm = fBuilder.group({
            emailControl: this.emailGroup.controls.emailControl,
            login: this.loginForm.controls.login,
            companyName: this.companyName.controls.companyName,
            firstNameGroup: this.firstNameGroup.controls.firstNameGroup,
            lastNameGroup: this.lastNameGroup.controls.lastNameGroup,
        });
    }
    RegistrationFormComponent.prototype.submit = function () {
        var _this = this;
        this.markAsTouched();
        if (this.isValid()) {
            /* this.user.password = this.passwordGroup.getPassword();*/
            this.registrationService.register(this.user, this.tenant)
                .subscribe(function (success) {
                _this.registrationService.sendRegistrationMessage('regSuccess', success, null);
            }, function (error) {
                _this.registrationService.sendRegistrationMessage('regError', null, error);
                console.log('Registration Error ' + error);
            });
        }
    };
    RegistrationFormComponent.prototype.isValid = function () {
        return !this.regForm.invalid; /*&&  this.passwordGroup.isValid()*/
    };
    RegistrationFormComponent.prototype.isTouched = function () {
        return this.regForm.touched /*||  this.passwordGroup.isTouched()*/;
    };
    RegistrationFormComponent.prototype.markAsTouched = function () {
        for (var c in this.regForm.controls) {
            this.regForm.controls[c].markAsTouched(false);
        }
        /* this.passwordGroup.markAsTouched();*/
    };
    return RegistrationFormComponent;
}());
RegistrationFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'regForm',
        templateUrl: 'registration.form.html',
        styleUrls: ['registration.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, registration_service_1.RegistrationService])
], RegistrationFormComponent);
exports.RegistrationFormComponent = RegistrationFormComponent;
//# sourceMappingURL=registration.form.component.js.map