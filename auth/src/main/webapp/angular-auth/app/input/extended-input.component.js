"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var error_message_component_1 = require("./error.message.component");
var ExtendedInput = (function () {
    function ExtendedInput() {
        this.labelText = '';
        this.isError = false;
        this.valid = true;
    }
    ExtendedInput.prototype.ngOnInit = function () {
        //$(this.elRef.nativeElement).find('input').trigger('click');
    };
    ExtendedInput.prototype.ngDoCheck = function () {
        if (this.errors) {
            this.errors.toArray().forEach(function (error, i) {
                if (i == 0) {
                    error.show();
                }
                else {
                    error.hide();
                }
            });
        }
    };
    return ExtendedInput;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ExtendedInput.prototype, "labelText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ExtendedInput.prototype, "isError", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ExtendedInput.prototype, "valid", void 0);
__decorate([
    core_1.ContentChildren(error_message_component_1.ErrorMessageComponent),
    __metadata("design:type", core_1.QueryList)
], ExtendedInput.prototype, "errors", void 0);
ExtendedInput = __decorate([
    core_1.Component({
        selector: 'extended-input',
        template: " <label>{{labelText}} <span class=\"regForm text-danger\">*</span> </label>\n        <div class=\"controls\" [ngClass]=\"{'has-error':isError}\" >\n            <ng-content ></ng-content>\n       </div> \n    <ng-content select=\"error-message\" ></ng-content>"
    }),
    __metadata("design:paramtypes", [])
], ExtendedInput);
exports.ExtendedInput = ExtendedInput;
//# sourceMappingURL=extended-input.component.js.map