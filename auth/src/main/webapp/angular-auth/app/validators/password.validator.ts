import {AbstractControl, ValidationErrors} from "@angular/forms";
export class PasswordValidator {
    static matchPassword(AC: AbstractControl)  {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('passwords don\'t match');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
            return {"MatchPassword": true}
        } else {
            console.log('passwords match');
            return null;
        }
    }

    static uppercaceCharacterRule(num: number, str: String) {
        if(!str)
            return false;
        let match = str.match(/[A-Z,А-Я]/g);
        return match && match.length >= num;
    }

    static digitalCharacterRule(num: number, str: String) {
        if(!str)
            return false;
        let match = str.match(/[0-9]/g);
        return match && match.length >= num;
    }
    static strongPassword(AC: AbstractControl){
      let password = AC.get('password').value;
        let uppercase = PasswordValidator.uppercaceCharacterRule(1,password );
        let digital = PasswordValidator.digitalCharacterRule(1,password );
        if(password && (password.length < 6 || !uppercase || !digital)){
          console.log('password not strong');
          AC.get('password').setErrors({strongPassword: true});
          return {"strongPassword": true}
      }
    }
}