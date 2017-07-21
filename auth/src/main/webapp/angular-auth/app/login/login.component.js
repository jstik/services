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
var authentication_service_1 = require("../service/authentication.service");
var router_1 = require("@angular/router");
var alert_service_1 = require("../service/alert.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router, activeRoute, alertService) {
        this.model = {};
        this.authService = authService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.alertService = alertService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.redirectUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var self = this;
        function success(data) {
            self.router.navigate([self.redirectUrl]);
            self.alertService.success('You successfully log in into application', true, 4000);
            console.log("success" + JSON.stringify(data));
        }
        function error(error) {
            self.alertService.error('login failed', true, 4000);
            console.log(" error " + JSON.stringify(error));
        }
        try {
            this.authService.login(this.model.username, this.model.password)
                .subscribe(function (data) {
                success(data);
            }, function (data) {
                error(data);
            });
        }
        catch (err) {
            self.alertService.error('login failed', true, 4000);
            throw err;
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        templateUrl: 'login.component.html',
        styleUrls: ['login.css']
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        router_1.Router,
        router_1.ActivatedRoute, alert_service_1.AlertService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map