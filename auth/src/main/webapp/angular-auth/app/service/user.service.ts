import {Http, Response} from "@angular/http";
import {User} from "../model/user";
import {Tenant} from "../model/tenant";
import {Observable} from "rxjs/Observable";
import {registrationUrl} from "../constants/constant.helper";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export  class UserService{
    private http: Http;

    constructor(@Inject(Http) http: Http){
        this.http = http;
    }

    register(user : User, tenant : Tenant) :Observable<User>{
        let body = {
            'user': user,
            'tenant': tenant
        };
        return this.http.post(registrationUrl, body)
            .map((res : Response) => {
                if(res.status >= 200 &&  res.status< 300){
                    let body = res.json();
                    if(body.confirmUrl){
                        console.log(body.confirmUrl);
                    }
                   return body.user as User;
                } else {
                  throw new Error(' Error in request ' + res.url + ' ' + res.status);
                }
            });
    }

}