import {Http, Response, Headers} from "@angular/http";
import {Injectable, ViewChild} from "@angular/core";
import {User} from "../model/user";
import {
    checkConfirmPasswordLinkUrl, confirmPasswordUrl,
    resendRegistrationEmailUrl
} from "../constants/constant.helper";
import {Observable} from "rxjs/Observable";
import {AdConfirmDirective} from "./add.confirm.directive";

@Injectable()
export class PasswordService {
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    checkLink(username: String, key: String): Observable<any> {
        let headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(checkConfirmPasswordLinkUrl, JSON.stringify({
            username: username,
            key: key
        }), {headers: headers}).map(function (res: Response) {
            let body = res.json();
            return body as User;
        });
    }

    confirmPassword(password: String, username: String, key: String): Observable<any> {
        let headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        return this.http.post(confirmPasswordUrl, JSON.stringify({
            username: username,
            key: key,
            password: password
        }), {headers: headers}).map(function (res: Response) {
            return res.json();
        });
    }

    resendRegistrationEmail(username: String): Observable<any> {
       return this.http.get(resendRegistrationEmailUrl, {params: {'username': username}});
    }
}