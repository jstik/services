"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var simple_form_input_module_1 = require("../input/simple.form.input.module");
var app_router_1 = require("../app.router");
var add_confirm_directive_1 = require("./add.confirm.directive");
var confirm_container_1 = require("./confirm.container");
var confirm_password_component_1 = require("./confirm.password.component");
var fail_confirm_password_component_1 = require("./fail.confirm.password.component");
var password_service_1 = require("./password.service");
var testing_1 = require("@angular/http/testing");
var registration_module_1 = require("../registration/registration.module");
var server_error_module_1 = require("../_handle/server.error.module");
var forgot_password_component_1 = require("./forgot.password.component");
var PasswordModule = (function () {
    function PasswordModule() {
    }
    return PasswordModule;
}());
PasswordModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpModule,
            forms_1.ReactiveFormsModule, simple_form_input_module_1.SimpleFormInputModule, registration_module_1.RegistrationModule,
            app_router_1.router, server_error_module_1.ServerErrorModule,
        ],
        declarations: [
            add_confirm_directive_1.AdConfirmDirective, confirm_container_1.ConfirmContainer, confirm_password_component_1.ConfirmPasswordComponent,
            fail_confirm_password_component_1.FailConfirmPasswordComponent, forgot_password_component_1.ForgotPasswordComponent
        ],
        providers: [
            password_service_1.PasswordService,
            testing_1.MockBackend
        ],
        entryComponents: [confirm_password_component_1.ConfirmPasswordComponent, fail_confirm_password_component_1.FailConfirmPasswordComponent],
        bootstrap: [confirm_container_1.ConfirmContainer]
    })
], PasswordModule);
exports.PasswordModule = PasswordModule;
//# sourceMappingURL=password.module.js.map