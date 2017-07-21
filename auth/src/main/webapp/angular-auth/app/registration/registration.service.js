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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var constant_helper_1 = require("../constants/constant.helper");
var RegistrationService = (function () {
    function RegistrationService(http) {
        this.subject = new Subject_1.Subject();
        this.http = http;
    }
    RegistrationService.prototype.sendRegistrationMessage = function (type, data, error) {
        var message = {
            type: type,
            data: data,
            error: error
        };
        this.subject.next(message);
    };
    RegistrationService.prototype.getRegistrationMessages = function () {
        return this.subject.asObservable();
    };
    RegistrationService.prototype.register = function (user, tenant) {
        var body = {
            'user': user,
            'tenant': tenant
        };
        var headers = new http_1.Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(constant_helper_1.registrationUrl, body, { headers: headers })
            .map(function (res) {
            var body = res.json();
            if (body.confirmUrl) {
                console.log(body.confirmUrl);
            }
            return body.user;
        });
    };
    return RegistrationService;
}());
RegistrationService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.Http)),
    __metadata("design:paramtypes", [http_1.Http])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map