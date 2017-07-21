import {BaseRequestOptions, HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RegistrationFormComponent} from "./registration.form.component";
import {ExtendedInput} from "../input/extended-input.component";
import {ErrorMessageComponent} from "../input/error.message.component";
import {PasswordGroupComponent} from "./password.group.component";
import {RegistrationContainer} from "./registration.container.component";
import {UserService} from "../service/user.service";
import {mockBackendProvider} from "../helpers/mock.backend";
import {MockBackend} from "@angular/http/testing";
import {AdDirective} from "./add.registration.directive";
import {SimpleFormInputModule} from "../input/simple.form.input.module";
import {RegistrationService} from "./registration.service";
import {SuccessRegistration} from "./success.registration.component";
import {router} from "../app.router";
import {ServerErrorModule} from "../_handle/server.error.module";


@NgModule({
    imports : [FormsModule, BrowserModule, HttpModule ,
        ReactiveFormsModule, SimpleFormInputModule, router,ServerErrorModule],
    declarations : [
        RegistrationFormComponent,
        PasswordGroupComponent, RegistrationContainer, AdDirective, SuccessRegistration,
    ],
    entryComponents :[RegistrationFormComponent, SuccessRegistration],
    bootstrap : [RegistrationContainer],
    providers : [
        RegistrationService,
        //mock backend providers
        mockBackendProvider,
        BaseRequestOptions,
        MockBackend,
    ],
    exports : [PasswordGroupComponent]
})
export class RegistrationModule {

}