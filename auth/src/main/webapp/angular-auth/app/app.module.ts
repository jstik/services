import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {LoginComponent} from "./login/login.component";
import {AuthenticationService} from "./service/authentication.service";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import {router} from "./app.router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./guard/auth.guard";
import {AlertService} from "./service/alert.service";
import {AlertComponent} from "./directives/alert.component";
import {mockBackendProvider} from "./helpers/mock.backend";
import {MockBackend} from "@angular/http/testing";
import {UserService} from "./service/user.service";
import {RegistrationModule} from "./registration/registration.module";
import {SimpleFormInputModule} from "./input/simple.form.input.module";
import {PasswordModule} from "./password/password.module";

@NgModule({
    imports : [
        FormsModule, BrowserModule, HttpModule , router, ReactiveFormsModule,
        RegistrationModule, SimpleFormInputModule, PasswordModule,
    ],
    declarations : [
        AppComponent, LoginComponent, HomeComponent, AlertComponent,

    ],
    bootstrap : [AppComponent],
    providers : [
        AuthenticationService,
        AuthGuard,
        AlertService,
        UserService,
        //mock backend providers
        mockBackendProvider,
        BaseRequestOptions,
        MockBackend,

    ]
})
export class AppModule {

}