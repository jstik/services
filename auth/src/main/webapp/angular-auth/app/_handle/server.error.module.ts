import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ServerErrorComponent} from "./server.error.component";
import {ServerErrorService} from "./server.error.service";
@NgModule({
    imports: [BrowserModule],
    declarations :[ServerErrorComponent],
    providers:[ServerErrorService],
    bootstrap:[],
    exports: [ServerErrorComponent]
})

export class ServerErrorModule{}