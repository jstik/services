import {
    Component, ContentChildren, DoCheck, Input, OnInit,
    QueryList
} from "@angular/core";
import {ErrorMessageComponent} from "./error.message.component";
import * as $ from 'jquery';
@Component({
    selector: 'extended-input',
    template: ` <label>{{labelText}} <span class="regForm text-danger">*</span> </label>
        <div class="controls" [ngClass]="{'has-error':isError}" >
            <ng-content ></ng-content>
       </div> 
    <ng-content select="error-message" ></ng-content>`
})
export class ExtendedInput implements DoCheck, OnInit{

    @Input()
    labelText:string = '';
    @Input()
    isError:boolean = false;

    @Input() valid : boolean = true;

    @ContentChildren(ErrorMessageComponent)
    errors:QueryList<ErrorMessageComponent>;

    constructor(){
    }
    ngOnInit(): void {

        //$(this.elRef.nativeElement).find('input').trigger('click');
    }

    ngDoCheck():void {
        if (this.errors) {
            this.errors.toArray().forEach(
                (error:ErrorMessageComponent, i:number) => {
                    if (i == 0) {
                        error.show();
                    } else {
                        error.hide();
                    }
                });
        }
    }
}