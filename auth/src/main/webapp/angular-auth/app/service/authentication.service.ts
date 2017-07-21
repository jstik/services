 import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {AlertService} from "./alert.service";
import {Http, Response, Headers} from "@angular/http";
import {authUrl, oauthTokenUrl, clientRedirect} from "../constants/constant.helper";
 import {Authoritie} from "../model/authoritie";
 import {Details} from "../model/details";
 import {AuthPrincipal} from "../model/auth.principal";
 import {Router} from "@angular/router";
 import {Client} from "../model/client";



@Injectable()
export class AuthenticationService{
    constructor(@Inject(Http) private http: Http,
                private alertService: AlertService,
                private route: Router) {

    }

    login(username: string, password: string, client: Client): Observable<User> {
        return this.userDetails(username, password, client);
    }

    oauthToken(username: string, password: string, clientId: string): Observable<Client> {
        let headers: Headers = new Headers();
        headers.set('Authorization', "Basic " + btoa(username + ":" + password));
        return this.http.post(oauthTokenUrl, {}, {
            headers: headers,
            params: {'client_id': clientId, 'grant_type': 'client_credentials'}
        }).map((response: Response) => {
            let token = response.json().access_token;
            return new Client(clientId, token);
        });
    }

    userDetails(username: string, password: string, client: Client) : Observable<User>{
        let headers: Headers = new Headers();
        headers.set('Authorization', "Basic " + btoa(username + ":" + password));
        return this.http.get(authUrl, {headers: headers}).map((response: Response) => {
            let user : User = response.json().user  as User;
            user.authPrincipal = response.json().authPrincipal as AuthPrincipal;
            /*if(client){
                user.addClient(client);
            }*/
            localStorage.setItem('LOGGEDUSER', JSON.stringify(user));
            return user;

        });
    }


    redirectClient(client: Client, redirectUrl: string): Observable<any> {
        return this.http.get(clientRedirect, {
            params: {'client_id': client.clientId, redirectUrl: redirectUrl},
            headers: client.authHeader()
        });
    }

    logout() {
        console.debug("logout");
        return this.http.post('logout', {}).subscribe(success => {
                this.alertService.success('You successfully logout', true);
                localStorage.removeItem('LOGGEDUSER');
                this.route.navigate(['/login']);
            }
        )
    }
}