import {
    AfterViewInit, Component, ComponentFactoryResolver, Directive, OnDestroy, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {AdDirective} from "./add.registration.directive";
import {RegistrationFormComponent} from "./registration.form.component";
import {SuccessRegistration} from "./success.registration.component";
import {RegistrationService} from "./registration.service";
import {ServerErrorService} from "../_handle/server.error.service";

@Component({
    moduleId : module.id.toString(),
    templateUrl : 'registration.container.html'
})

export class RegistrationContainer implements AfterViewInit, OnDestroy{
    @ViewChild(AdDirective) adRegistration: AdDirective;
    @ViewChild(RegistrationFormComponent)  form : RegistrationFormComponent;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private regService: RegistrationService,
                private serverErrorService : ServerErrorService) { }

    loadForm(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(RegistrationFormComponent);
        let viewContainerRef = this.adRegistration.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    }
    loadSuccessView(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SuccessRegistration);
        let viewContainerRef = this.adRegistration.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    }

    ngOnDestroy(): void {

    }

    ngAfterViewInit(): void {
        this.loadForm();
        let subscription = this.regService.getRegistrationMessages().subscribe(
            message => {
                if(message.type === 'regSuccess'){
                    this.loadSuccessView();
                } else {
                    this.serverErrorService.testResponse(message.error);
                    console.log(message.error);
                }
            }
        );
    }


}