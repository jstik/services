"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ErrorMessageComponent = (function () {
    function ErrorMessageComponent() {
        this.showError = true;
    }
    ErrorMessageComponent.prototype.show = function () {
        this.showError = true;
    };
    ErrorMessageComponent.prototype.hide = function () {
        this.showError = false;
    };
    return ErrorMessageComponent;
}());
ErrorMessageComponent = __decorate([
    core_1.Component({
        selector: 'error-message',
        template: "\n        <div class=\"text-danger\">\n            <ng-content> </ng-content>\n        </div>\n    "
    })
], ErrorMessageComponent);
exports.ErrorMessageComponent = ErrorMessageComponent;
//# sourceMappingURL=error.message.component.js.map