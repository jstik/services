import {Directive, ViewContainerRef} from "@angular/core";
@Directive({
    selector: '[ad-confirm]',
})

export class AdConfirmDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}