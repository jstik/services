import {ExtendedInput} from "./extended-input.component";
import {ErrorMessageComponent} from "./error.message.component";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
@NgModule({
    imports : [FormsModule, ReactiveFormsModule, BrowserModule],
    declarations : [
         ExtendedInput, ErrorMessageComponent,
    ],
    bootstrap : [],
    providers : [],
    exports : [ExtendedInput, ErrorMessageComponent]
})

export class SimpleFormInputModule{

}