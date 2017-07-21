

import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {RegistrationContainer} from "./registration/registration.container.component";
import {ConfirmContainer} from "./password/confirm.container";
import {ForgotPasswordComponent} from "./password/forgot.password.component";

const appRouter : Routes =[
    { path : 'login', component: LoginComponent},
    {path: 'registration/submit/:username/', component: ConfirmContainer},
    {path : 'registration' , component: RegistrationContainer},
    {path : 'recoveryPassword' , component: ForgotPasswordComponent},
    { path : '', component : HomeComponent, canActivate: [AuthGuard] },
    { path : '**',  redirectTo : '' },

];
export const router = RouterModule.forRoot(appRouter);