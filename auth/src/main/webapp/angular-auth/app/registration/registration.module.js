"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var registration_form_component_1 = require("./registration.form.component");
var password_group_component_1 = require("./password.group.component");
var registration_container_component_1 = require("./registration.container.component");
var mock_backend_1 = require("../helpers/mock.backend");
var testing_1 = require("@angular/http/testing");
var add_registration_directive_1 = require("./add.registration.directive");
var simple_form_input_module_1 = require("../input/simple.form.input.module");
var registration_service_1 = require("./registration.service");
var success_registration_component_1 = require("./success.registration.component");
var app_router_1 = require("../app.router");
var server_error_module_1 = require("../_handle/server.error.module");
var RegistrationModule = (function () {
    function RegistrationModule() {
    }
    return RegistrationModule;
}());
RegistrationModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpModule,
            forms_1.ReactiveFormsModule, simple_form_input_module_1.SimpleFormInputModule, app_router_1.router, server_error_module_1.ServerErrorModule],
        declarations: [
            registration_form_component_1.RegistrationFormComponent,
            password_group_component_1.PasswordGroupComponent, registration_container_component_1.RegistrationContainer, add_registration_directive_1.AdDirective, success_registration_component_1.SuccessRegistration,
        ],
        entryComponents: [registration_form_component_1.RegistrationFormComponent, success_registration_component_1.SuccessRegistration],
        bootstrap: [registration_container_component_1.RegistrationContainer],
        providers: [
            registration_service_1.RegistrationService,
            //mock backend providers
            mock_backend_1.mockBackendProvider,
            http_1.BaseRequestOptions,
            testing_1.MockBackend,
        ],
        exports: [password_group_component_1.PasswordGroupComponent]
    })
], RegistrationModule);
exports.RegistrationModule = RegistrationModule;
//# sourceMappingURL=registration.module.js.map