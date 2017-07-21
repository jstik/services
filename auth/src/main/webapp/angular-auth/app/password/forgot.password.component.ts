import {Component} from "@angular/core";
import {PasswordService} from "./password.service";
import {ServerErrorService} from "../_handle/server.error.service";
@Component({
    moduleId : module.id.toString(),
    templateUrl : 'forgot.password.html',
    styleUrls : ['password.css']
})

export class ForgotPasswordComponent{
    constructor(private passwordService : PasswordService,
                private serverErrorService : ServerErrorService){

    }
    username : String;
    submitted : boolean = false;
    notFound : boolean = false;

    submit(){
        if (this.username) {
            this.passwordService.resendRegistrationEmail(this.username)
                .subscribe(
                    success => {
                        this.submitted = true;
                    },
                    error => {
                        if (!this.serverErrorService.testResponse(error)) {
                            this.notFound = true;
                        }
                    }
                )
        }
    }


}