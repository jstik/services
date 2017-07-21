"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var constant_helper_1 = require("../constants/constant.helper");
function checkUsername(control) {
    function httpFactory(xhrBackend, requestOptions) {
        return new http_1.Http(xhrBackend, requestOptions);
    }
    function _createDefaultCookieXSRFStrategy() {
        return new http_1.CookieXSRFStrategy();
    }
    var injector = core_1.ReflectiveInjector.resolveAndCreate([
        { provide: http_1.Http, useFactory: httpFactory, deps: [http_1.XHRBackend, http_1.RequestOptions] },
        http_1.BrowserXhr,
        { provide: http_1.RequestOptions, useClass: http_1.BaseRequestOptions },
        { provide: http_1.ResponseOptions, useClass: http_1.BaseResponseOptions },
        http_1.XHRBackend,
        { provide: http_1.XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy
        },
    ]);
    var http = injector.get(http_1.Http);
    return new Observable_1.Observable(function (obs) {
        function checkOnServer(value) {
            return http.get(constant_helper_1.checkUsernameUrl, { params: { 'username': value } })
                .subscribe(function (data) {
                obs.next(null);
                // obs.next({'usernameTaken': false});
                obs.complete();
            }, function (error) {
                console.log(error.json().message);
                if (error.status === 406)
                    obs.next({ 'usernameTaken': true });
                obs.complete();
            });
        }
        control.valueChanges.subscribe(function (value) {
            return checkOnServer(value);
        });
        /*    control.valueChanges.debounceTime(400).flatMap(
                (value: any, ix: number) =>{
                    let params = new URLSearchParams();
                    params.set('username', value);
    
                    return  http.get(checkUsernameUrl, {search: params})
                    .subscribe(
                        data => {
                            //obs.next(null);
                            obs.complete();
                        },
                        error => {
                            console.log(error.json().message);
                            obs.next({'usernameTaken': true });
                            obs.complete();
                        }
                    )
                }
            )*/
    });
}
var UsernameValidator = (function () {
    function UsernameValidator() {
    }
    UsernameValidator.checkUsername = function (control) {
        return checkUsername(control);
    };
    return UsernameValidator;
}());
exports.UsernameValidator = UsernameValidator;
//# sourceMappingURL=user.name.validator.js.map