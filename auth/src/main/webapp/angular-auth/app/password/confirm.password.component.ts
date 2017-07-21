import {Component, EventEmitter, Host, OnInit, Output, ViewChild, ViewContainerRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user";
import {PasswordGroupComponent} from "../registration/password.group.component";
import {PasswordService} from "./password.service";
import {ServerErrorService} from "../_handle/server.error.service";
import {AdConfirmDirective} from "./add.confirm.directive";
import {ConfirmContainer} from "./confirm.container";
import {AuthenticationService} from "../service/authentication.service";
import {AlertService} from "../service/alert.service";
@Component({
    moduleId : module.id.toString(),
    templateUrl : 'confirm.password.html',
    styleUrls : ['password.css']
})

export class ConfirmPasswordComponent{
    redirectUrl: any;
    @ViewChild('passwordGroup') passwordGroup : PasswordGroupComponent;

    private _user: User;

    private _key: String;

    private _submitted : boolean = false;

    private passwordService: PasswordService;
    private serverErrorService: ServerErrorService;
    private authService: AuthenticationService;
    private router: Router;
    private alertService: AlertService;

    constructor(passwordService : PasswordService,
                serverErrorService : ServerErrorService,
                activatedRoute : ActivatedRoute,
                authService : AuthenticationService,
                router: Router,
                alertService : AlertService
    ){
        this.passwordService = passwordService;
        this.serverErrorService = serverErrorService;
        this.authService = authService;
        this.router = router;
        this.alertService = alertService;
        this.redirectUrl = activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    }
    set user(value: User) {
        this._user = value;
    }
    set key(value: String) {
        this._key = value;
    }
    isValid() : boolean{
        return this.passwordGroup.isValid();
    }
    isTouched() : boolean{
        return this.passwordGroup.isTouched();
    }
    get submitted(): boolean {
        return this._submitted;
    }
    set submitted(value: boolean) {
        this._submitted = value;
    }

    submit(){
        this.passwordGroup.markAsTouched();
        if(this.isValid()){
            let self = this;
            let password = this.passwordGroup.getPassword();
            this.passwordService.confirmPassword(password, this._user.username, this._key )
                .subscribe( res =>{
                   this.submitted =true;
                   console.debug("Password submitted successfully");
                   this.authService.login(this._user.username, password, null)
                       .subscribe(success =>{
                           self.router.navigate([self.redirectUrl]);
                           self.alertService.success(' Welcome! You successfully complete account registration', true, 4000);
                       },er => {
                          this.serverErrorService.testResponse(er);
                       });

                }, er => {
                   this.serverErrorService.testResponse(er);
                })
        }
    }

}