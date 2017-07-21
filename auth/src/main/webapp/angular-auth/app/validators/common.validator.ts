import {AbstractControl, ValidationErrors} from "@angular/forms";
export class CommonValidator{
    static ValidateEmail(ac : AbstractControl) :ValidationErrors{
      let email = ac.value;
      let EMAIL_REGEXP =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(email && email != "" && (email.length < 5 || !EMAIL_REGEXP.test(email))){
         /* ac.get('emailControl').setErrors({ValidateEmail : true});*/
          ac.setErrors({ValidateEmail : true});
          console.log('Email not valid');
          return {"ValidateEmail" : true}
      }
    }
    /* Validate that string don't contain whitespaces*/
    static WithoutWhitespaces(ac : AbstractControl) :ValidationErrors{
        let str = ac.value;
        if(str && /\s/g.test(str.trim())){
            ac.setErrors({ContainsWhitespaces : true});
            console.log('Contains Whitespaces');
            return {"ContainsWhitespaces" : true}
        }
    }
}