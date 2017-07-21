"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SuccessRegistration = (function () {
    function SuccessRegistration() {
    }
    return SuccessRegistration;
}());
SuccessRegistration = __decorate([
    core_1.Component({
        selector: 'reg-success',
        template: "\n      <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n              <p>You're successfully register in our system.</p>\n              <div> Please , check your mail box and submit your registration </div>\n          </div>\n          \n      </div>\n  "
    })
], SuccessRegistration);
exports.SuccessRegistration = SuccessRegistration;
//# sourceMappingURL=success.registration.component.js.map