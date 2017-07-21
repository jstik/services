import {Directive, ViewContainerRef} from "@angular/core";
@Directive({
    selector: '[ad-registration]',
})

export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}