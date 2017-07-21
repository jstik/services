"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ServerErrorService = (function () {
    function ServerErrorService() {
        this.subject = new Subject_1.Subject();
    }
    ServerErrorService.prototype.testResponse = function (response) {
        if (response.ok) {
            return false;
        }
        if (response.status >= 400 && response.status != 406) {
            this.subject.error(response.statusText);
            return true;
        }
        else {
            this.subject.next(response);
            return false;
        }
    };
    ServerErrorService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return ServerErrorService;
}());
ServerErrorService = __decorate([
    core_1.Injectable()
], ServerErrorService);
exports.ServerErrorService = ServerErrorService;
//# sourceMappingURL=server.error.service.js.map