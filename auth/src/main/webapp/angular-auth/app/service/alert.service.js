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
var Subject_1 = require("rxjs/Subject");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.subject = new Subject_1.Subject();
        this.keepAfterNavigationChange = false;
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterNavigationChange) {
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange, destroyAfter) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        var mess = { type: 'success', message: message };
        if (destroyAfter) {
            mess['destroyAfter'] = destroyAfter;
        }
        this.subject.next(mess);
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange, destroyAfter) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        var mess = { type: 'error', message: message };
        if (destroyAfter) {
            mess['destroyAfter'] = destroyAfter;
        }
        this.subject.next(mess);
    };
    AlertService.prototype.info = function (message, keepAfterNavigationChange, destroyAfter) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        var mess = { type: 'info', message: message };
        if (destroyAfter) {
            mess['destroyAfter'] = destroyAfter;
        }
        this.subject.next(mess);
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], AlertService);
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map