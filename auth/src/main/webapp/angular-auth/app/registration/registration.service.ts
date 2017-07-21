
import {Inject, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Http, Response, Headers} from "@angular/http";
import {User} from "../model/user";
import {Tenant} from "../model/tenant";
import {Observable} from "rxjs/Observable";
import {registrationUrl} from "../constants/constant.helper";

@Injectable()
export class RegistrationService{
   subject : Subject<any> = new Subject();

   private http: Http;

   constructor(@Inject(Http) http: Http){
      this.http = http;
   }

   sendRegistrationMessage(type: string, data: User, error: string) {
      let message = {
         type: type,
         data: data,
         error: error
      };
      this.subject.next(message);
   }

   getRegistrationMessages(){
      return this.subject.asObservable();
   }


   register(user: User, tenant: Tenant): Observable<User> {
      let body = {
         'user': user,
         'tenant': tenant
      };
      let headers : Headers = new Headers();
      headers.set('Content-Type', 'application/json');
      return this.http.post(registrationUrl, body, {headers: headers})
          .map((res: Response) => {
             let body = res.json();
             if (body.confirmUrl) {
                console.log(body.confirmUrl);
             }
             return body.user as User;
          });
   }

}