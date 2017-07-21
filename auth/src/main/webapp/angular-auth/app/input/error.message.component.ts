import {Component, Input} from "@angular/core";
@Component({
    selector : 'error-message',
    template : `
        <div class="text-danger">
            <ng-content> </ng-content>
        </div>
    `
})

export class ErrorMessageComponent{
   showError : boolean = true;

   show(){
      this.showError = true;
   }

   hide(){
       this.showError = false;
   }

}