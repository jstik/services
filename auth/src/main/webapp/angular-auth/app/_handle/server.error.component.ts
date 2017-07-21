import {Component, OnInit} from "@angular/core";
import {ServerErrorService} from "./server.error.service";
@Component({
    moduleId : module.id.toString(),
    templateUrl : 'server.error.html',
    selector : 'server-error',
    styleUrls : ['server.error.css']
})

export class ServerErrorComponent implements OnInit{
    error : any;
    warring : any;
    private service: ServerErrorService;
    constructor(service : ServerErrorService){
        this.service = service;

    }
    ngOnInit(): void {
        this.service.getMessage().subscribe(message => {
            this.warring =  message;
            this.error = null;
        }, er =>{
            this.error = er;
            console.debug(er);
        })
    }
}