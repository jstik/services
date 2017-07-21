import {Component} from "@angular/core";
import {PasswordValidator} from "../validators/password.validator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
    selector: 'password-group',
    template : `
        <div [formGroup] ="passwordGroup">
        <extended-input [labelText] ="'Password'"
                        [isError]="passwordGroup.controls.password.errors && passwordGroup.controls.password.touched" >
            <input type="password"  formControlName="password"   id="password"
                   name="password" placeholder="" class="form-control"
                   [(ngModel)]="password">
              <error-message *ngIf="passwordGroup.controls.password.errors?.strongPassword && passwordGroup.controls.password.touched">
                Password needs to be at least 6 characters and contains uppercase character as well as digital character.
            </error-message>       
        </extended-input>
        <extended-input [labelText] ="'Confirm Password'"
                        [isError]="passwordGroup.controls.confirmPassword.errors && passwordGroup.controls.confirmPassword.touched" >
            <input type="password"  formControlName="confirmPassword" [formGroup]="passwordGroup" id="confirmPassword"
                   name="confirmPassword" placeholder="" class="form-control">
            <error-message *ngIf="passwordGroup.controls.password.errors?.required && passwordGroup.controls.password.touched">
                Password is required
            </error-message>
            <error-message *ngIf="passwordGroup.controls.confirmPassword.errors?.matchPassword && passwordGroup.controls.confirmPassword.touched">
                Password not match
            </error-message>
          
        </extended-input>
        </div>
    `
})

export class PasswordGroupComponent{

    private passwordGroup: FormGroup;
    private fBuilder: FormBuilder;
    private password: string;


    constructor(fBuilder: FormBuilder){
        this.fBuilder = fBuilder;
        this.passwordGroup = this.fBuilder.group({
            password: ['', Validators.compose([Validators.required ])],
            confirmPassword: ['', Validators.required]
        }, {
            validator: Validators.compose(
                [PasswordValidator.matchPassword, PasswordValidator.strongPassword]
            )
        });
    }

    markAsTouched() {
        for (let control in this.passwordGroup.controls) {
            this.passwordGroup.controls[control].markAsTouched(false);
        }
    }

    isValid() : boolean{
        return this.passwordGroup.valid;
    }

    isTouched() : boolean{
        return this.passwordGroup.touched;
    }

    getPassword(){
        return this.password;
    }
}