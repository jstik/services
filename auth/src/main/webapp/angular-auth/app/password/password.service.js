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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var constant_helper_1 = require("../constants/constant.helper");
var PasswordService = (function () {
    function PasswordService(http) {
        this.http = http;
    }
    PasswordService.prototype.checkLink = function (username, key) {
        var headers = new http_1.Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(constant_helper_1.checkConfirmPasswordLinkUrl, JSON.stringify({
            username: username,
            key: key
        }), { headers: headers }).map(function (res) {
            var body = res.json();
            return body;
        });
    };
    PasswordService.prototype.confirmPassword = function (password, username, key) {
        var headers = new http_1.Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(constant_helper_1.confirmPasswordUrl, JSON.stringify({
            username: username,
            key: key,
            password: password
        }), { headers: headers }).map(function (res) {
            return res.json();
        });
    };
    PasswordService.prototype.resendRegistrationEmail = function (username) {
        return this.http.get(constant_helper_1.resendRegistrationEmailUrl, { params: { 'username': username } });
    };
    return PasswordService;
}());
PasswordService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PasswordService);
exports.PasswordService = PasswordService;
//# sourceMappingURL=password.service.js.map