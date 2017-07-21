import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {SimpleFormInputModule} from "../input/simple.form.input.module";
import {router} from "../app.router";
import {AdConfirmDirective} from "./add.confirm.directive";
import {ConfirmContainer} from "./confirm.container";
import {ConfirmPasswordComponent} from "./confirm.password.component";
import {FailConfirmPasswordComponent} from "./fail.confirm.password.component";
import {PasswordService} from "./password.service";
import {MockBackend} from "@angular/http/testing";
import {RegistrationModule} from "../registration/registration.module";
import {ServerErrorModule} from "../_handle/server.error.module";
import {ForgotPasswordComponent} from "./forgot.password.component";
@NgModule({
    imports: [
        FormsModule, BrowserModule, HttpModule ,
        ReactiveFormsModule, SimpleFormInputModule, RegistrationModule,
        router, ServerErrorModule,
    ],
    declarations : [
        AdConfirmDirective, ConfirmContainer, ConfirmPasswordComponent,
        FailConfirmPasswordComponent, ForgotPasswordComponent
    ],
    providers : [
        PasswordService,
        MockBackend
    ],
    entryComponents :[ConfirmPasswordComponent, FailConfirmPasswordComponent],
    bootstrap: [ConfirmContainer]
})

export class PasswordModule {

}