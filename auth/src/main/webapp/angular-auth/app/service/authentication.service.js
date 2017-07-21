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
require("rxjs/add/observable/of");
require("rxjs/add/operator/map");
var alert_service_1 = require("./alert.service");
var http_1 = require("@angular/http");
var constant_helper_1 = require("../constants/constant.helper");
var router_1 = require("@angular/router");
var AuthenticationService = (function () {
    function AuthenticationService(http, alertService, route) {
        this.http = http;
        this.alertService = alertService;
        this.route = route;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var headers = new http_1.Headers();
        headers.set('Authorization', "Basic " + btoa(username + ":" + password));
        return this.http.get(constant_helper_1.authUrl, { headers: headers }).map(function (response) {
            var user = response.json().user;
            user.authPrincipal = response.json().authPrincipal;
            localStorage.setItem('LOGGEDUSER', JSON.stringify(user));
            return user;
            /*let token = response.headers ? response.headers.get('token') : null;
            if (token) {
                let user = response.json() as User;
                localStorage.setItem('LOGGEDUSER', JSON.stringify(user));
                return user;
            } else {
                throw new Error(' User not logged in');
            }*/
        });
        /*  return this.http.post(authUrl, JSON.stringify({username : username, password : password}))
         .map((response: Response)  => {
         let token = response.headers ? response.headers.get('token') : null;
         if(token) {
         let user = response.json() as User;
         localStorage.setItem('LOGGEDUSER', JSON.stringify(user));
         return user;
         }else {
         throw new Error(' User not logged in');
         }
         });*/
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        console.debug("logout");
        return this.http.post('logout', {}).subscribe(function (success) {
            _this.alertService.success('You successfully logout', true);
            localStorage.removeItem('LOGGEDUSER');
            _this.route.navigate(['/login']);
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.Http)),
    __metadata("design:paramtypes", [http_1.Http,
        alert_service_1.AlertService,
        router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map