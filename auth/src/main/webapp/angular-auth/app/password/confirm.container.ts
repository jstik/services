import {Component, ComponentFactoryResolver, Inject, ViewChild} from "@angular/core";
import {AdConfirmDirective} from "./add.confirm.directive";
import {PasswordService} from "./password.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {ConfirmPasswordComponent} from "./confirm.password.component";
import {FailConfirmPasswordComponent} from "./fail.confirm.password.component";
import {ServerErrorService} from "../_handle/server.error.service";
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'confirm.container.html',

})

export class ConfirmContainer {
    @ViewChild(AdConfirmDirective) adConfirmDirective: AdConfirmDirective;
    private username: String;
    private key: String;
    private user: User;
    private componentFactoryResolver: ComponentFactoryResolver;

    constructor(@Inject(PasswordService) passwordService: PasswordService,
                route: ActivatedRoute,
                componentFactoryResolver: ComponentFactoryResolver,
                serverErrorService : ServerErrorService
    ) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.username = route.snapshot.params.username;
        this.key = route.snapshot.queryParams.key;

        passwordService.checkLink(this.username, this.key)
            .subscribe(
                (user: User) => {
                    this.user = user;
                    this.loadConfirmPassword();
                },
                (error) => {
                    console.debug(error);
                    if(!serverErrorService.testResponse(error)){
                        this.loadFailConfirmPassword();
                    }
                }
            )

    }

    loadConfirmPassword(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmPasswordComponent);
        let containerRef = this.adConfirmDirective.viewContainerRef;
        containerRef.clear();
        let instance = containerRef.createComponent(componentFactory).instance;
        instance.user = this.user;
        instance.key = this.key;
    }

    loadFailConfirmPassword(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FailConfirmPasswordComponent);
        let containerRef = this.adConfirmDirective.viewContainerRef;
        containerRef.clear();
        containerRef.createComponent(componentFactory)
    }

}