
import {Component, OnInit} from "@angular/core";
import {AlertService} from "../service/alert.service";
@Component({
    moduleId: module.id.toString(),
    selector : 'alert',
    templateUrl : 'alert.component.html'
})

export class AlertComponent implements OnInit{
    message : any;
    private alertService: AlertService;

    constructor(alertService :AlertService){
        this.alertService = alertService;

    }
    ngOnInit(): void {
        this.alertService.getMessage().subscribe(message => {
            this.message = message;
            if(message &&  message.destroyAfter){
                setTimeout(()=> this.message = undefined, message.destroyAfter)
            }
        });
    }

}