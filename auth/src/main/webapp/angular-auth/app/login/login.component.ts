import {Component, Inject, OnInit} from '@angular/core'
import {Observable} from "rxjs/Rx";
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";
import {AlertService} from "../service/alert.service";
import {Client} from "../model/client";
import {ACCESS_TOKEN, clientRedirect} from "../constants/constant.helper";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.css']
})

export class LoginComponent implements OnInit {
    activeRoute: ActivatedRoute;
    router: Router;
    model: any = {};
    authService: AuthenticationService;
    redirectUrl: string;
    clientId: string;
    clientRedirect: boolean;
    user : User;
    private alertService: AlertService;

    constructor(authService: AuthenticationService,
                router: Router,
                activeRoute: ActivatedRoute, alertService: AlertService) {
        this.authService = authService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.alertService = alertService;
    }

    ngOnInit(): void {
        this.redirectUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
        this.clientId = this.activeRoute.snapshot.queryParams['client_id'] || null;
        this.clientRedirect = this.activeRoute.snapshot.queryParams['clientRedirect'] || false;
    }

    login() {
        let self = this;
        try {
            if (this.clientId) {
                this.authService.oauthToken(this.model.username, this.model.password, this.clientId)
                    .subscribe((client: Client) => {
                            this.userDetails(client);
                        }, (error => {
                            self.alertService.error('Login failed', true, 4000);
                            console.log(" error " + JSON.stringify(error));
                        })
                    );
            } else {
                this.userDetails(null);
            }

        } catch (err) {
            this.alertService.error('Login failed', true, 4000);
            throw err;
        }

    };

    userDetails(client : Client){
        let self = this;
        function success(user: User) {
            console.log("success" + JSON.stringify(user));
            //let client = user.getClient(self.clientId);
            if(client){

                self.authService.redirectClient(client, self.redirectUrl).subscribe(res =>{
                    self.alertService.success('You successfully log in into application', true, 4000);
                    window.location.href = res._body + '?' + ACCESS_TOKEN + '=' + client.token;
                }, error=>{

                });

            }else {
                self.router.navigate([self.redirectUrl]);
                self.alertService.success('You successfully log in into application', true, 4000);
            }
        }
        this.authService.login(this.model.username, this.model.password, client)
            .subscribe(
                data => {
                    success(data)
                },
                data => {
                    self.alertService.error('Login failed', true, 4000);
                    console.log(" error " + data.message);
                }
            )
    }
}

