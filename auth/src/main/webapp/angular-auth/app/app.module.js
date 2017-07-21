"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var platform_browser_1 = require("@angular/platform-browser");
var login_component_1 = require("./login/login.component");
var authentication_service_1 = require("./service/authentication.service");
var http_1 = require("@angular/http");
var app_router_1 = require("./app.router");
var home_component_1 = require("./home/home.component");
var auth_guard_1 = require("./guard/auth.guard");
var alert_service_1 = require("./service/alert.service");
var alert_component_1 = require("./directives/alert.component");
var mock_backend_1 = require("./helpers/mock.backend");
var testing_1 = require("@angular/http/testing");
var user_service_1 = require("./service/user.service");
var registration_module_1 = require("./registration/registration.module");
var simple_form_input_module_1 = require("./input/simple.form.input.module");
var password_module_1 = require("./password/password.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpModule, app_router_1.router, forms_1.ReactiveFormsModule,
            registration_module_1.RegistrationModule, simple_form_input_module_1.SimpleFormInputModule, password_module_1.PasswordModule,
        ],
        declarations: [
            app_component_1.AppComponent, login_component_1.LoginComponent, home_component_1.HomeComponent, alert_component_1.AlertComponent,
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            authentication_service_1.AuthenticationService,
            auth_guard_1.AuthGuard,
            alert_service_1.AlertService,
            user_service_1.UserService,
            //mock backend providers
            mock_backend_1.mockBackendProvider,
            http_1.BaseRequestOptions,
            testing_1.MockBackend,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map