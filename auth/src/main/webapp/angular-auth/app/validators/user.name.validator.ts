import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import { ReflectiveInjector} from "@angular/core";
import {
    BaseRequestOptions, BaseResponseOptions,
    BrowserXhr, CookieXSRFStrategy, Http, RequestOptions, ResponseOptions,
    XHRBackend, XSRFStrategy
} from "@angular/http";
import {checkUsernameUrl} from "../constants/constant.helper";

interface IUsernameValidator {
}

function checkUsername(control: AbstractControl) : Observable<IUsernameValidator> {

    function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
        return new Http(xhrBackend, requestOptions);
    }

    function _createDefaultCookieXSRFStrategy() {
        return new CookieXSRFStrategy();
    }
    let injector = ReflectiveInjector.resolveAndCreate( [
        {provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]},
        BrowserXhr,
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: ResponseOptions, useClass: BaseResponseOptions},
        XHRBackend,
        {provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy
        },
    ]);
    let http = injector.get(Http);

    return new Observable((obs: any) => {
        function checkOnServer(value: any) {
            return http.get(checkUsernameUrl, {params: {'username': value}})
                .subscribe(
                    data => {
                        obs.next(null);
                       // obs.next({'usernameTaken': false});
                        obs.complete();
                    },
                    error => {
                        console.log(error.json().message);
                        if (error.status === 406)
                            obs.next({'usernameTaken': true});
                        obs.complete();
                    }
                )
        }

        control.valueChanges.subscribe((value: any) => {
           return checkOnServer(value) ;
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

export class UsernameValidator {

    constructor() {}

    static checkUsername(control: AbstractControl) {
        return checkUsername(control);
    }
}