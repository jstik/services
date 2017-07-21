"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var auth_guard_1 = require("./guard/auth.guard");
var registration_container_component_1 = require("./registration/registration.container.component");
var confirm_container_1 = require("./password/confirm.container");
var forgot_password_component_1 = require("./password/forgot.password.component");
var appRouter = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registration/submit/:username/', component: confirm_container_1.ConfirmContainer },
    { path: 'registration', component: registration_container_component_1.RegistrationContainer },
    { path: 'recoveryPassword', component: forgot_password_component_1.ForgotPasswordComponent },
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', redirectTo: '' },
];
exports.router = router_1.RouterModule.forRoot(appRouter);
//# sourceMappingURL=app.router.js.map