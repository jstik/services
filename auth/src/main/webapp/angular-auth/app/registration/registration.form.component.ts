import {
    Component,
    ViewChild,
} from "@angular/core";
import {User} from "../model/user";
import {Tenant} from "../model/tenant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonValidator} from "../validators/common.validator";
import {PasswordGroupComponent} from "./password.group.component";
import {RegistrationService} from "./registration.service";
import {UsernameValidator} from "../validators/user.name.validator";
import {ServerErrorService} from "../_handle/server.error.service";


@Component({
    moduleId: module.id.toString(),
    selector : 'regForm',
    templateUrl: 'registration.form.html',
    styleUrls: ['registration.css']
})

export class RegistrationFormComponent {
    user: User = new User(-1, '');
    tenant: Tenant = new Tenant(-1, '');
    emailGroup:  FormGroup;
    public regForm : FormGroup;
    loginForm : FormGroup;
    companyName : FormGroup;
    firstNameGroup: FormGroup;
    lastNameGroup : FormGroup;
    private registrationService: RegistrationService;

  /*  @ViewChild('passwordGroup') passwordGroup : PasswordGroupComponent;*/

    constructor(fBuilder: FormBuilder, registrationService : RegistrationService){
        this.registrationService = registrationService;
        this.loginForm  = fBuilder.group({
            login : ['', Validators.compose([Validators.required,
                CommonValidator.WithoutWhitespaces,
                Validators.minLength(4),
            ]),  UsernameValidator.checkUsername],
        });
        this.companyName = fBuilder.group({
            companyName : ['', Validators.compose([Validators.required ])],
        });
        this.emailGroup = fBuilder.group({
            emailControl: ['', Validators.compose([Validators.required, CommonValidator.ValidateEmail ])],
        });
        this.firstNameGroup = fBuilder.group({
            firstNameGroup : ['', Validators.compose([Validators.required ])]
        });
        this.lastNameGroup =  fBuilder.group({
            lastNameGroup : ['', Validators.compose([Validators.required ])]
        });
        this.regForm = fBuilder.group({
            emailControl: this.emailGroup.controls.emailControl,
            login : this.loginForm.controls.login,
            companyName: this.companyName.controls.companyName,
            firstNameGroup : this.firstNameGroup.controls.firstNameGroup,
            lastNameGroup : this.lastNameGroup.controls.lastNameGroup,
        });


    }

    submit() {
        this.markAsTouched();
        if(this.isValid()){
           /* this.user.password = this.passwordGroup.getPassword();*/
            this.registrationService.register(this.user, this.tenant)
                .subscribe(
                    success => {
                        this.registrationService.sendRegistrationMessage('regSuccess', success, null)
                    },
                    error => {
                        this.registrationService.sendRegistrationMessage('regError', null, error);
                        console.log('Registration Error ' + error);
                    }
                ) ;
        }

    }

    isValid(): boolean{
        return !this.regForm.invalid ;/*&&  this.passwordGroup.isValid()*/
    }

    isTouched(): boolean {
        return this.regForm.touched /*||  this.passwordGroup.isTouched()*/;
    }

    markAsTouched(){
        for(let c in this.regForm.controls){
            this.regForm.controls[c].markAsTouched(false);
        }
       /* this.passwordGroup.markAsTouched();*/
    }

}