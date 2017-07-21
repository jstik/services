import {MockBackend, MockConnection} from "@angular/http/testing";
import {MockDataStorage} from "./mock.data.storage";
import {
    BaseRequestOptions, Http, RequestMethod, RequestOptions, Response, ResponseOptions,
    XHRBackend, Headers
} from "@angular/http";
import {
    authUrl, checkConfirmPasswordLinkUrl, confirmPasswordUrl, registrationUrl,
    testAuthUrl, testCheckConfirmPasswordLinkUrl, testConfirmPasswordUrl, testRegistrationUrl
} from "../constants/constant.helper";
import {User} from "../model/user";
import {FactoryProvider} from "@angular/core/src/di";

export function mockBackendFactory(mockBackend : MockBackend, options: BaseRequestOptions, backend : XHRBackend){

    mockBackend.connections.subscribe( (con : MockConnection)=> {
        console.log('MockBackend work ' + con.request.url);
        setTimeout(() => {
            if (con.request.url.endsWith(testAuthUrl) && con.request.method == RequestMethod.Post) {
                mockAuth(con);
                return;
            }
            if (con.request.url.endsWith(testRegistrationUrl) && con.request.method == RequestMethod.Post) {
                mockRegistration(con);
                return;
            }
            if(con.request.url.endsWith(testCheckConfirmPasswordLinkUrl)  && con.request.method == RequestMethod.Post){
                mockCheckPasswordConfirmLink(con);
                return;
            }
            if(con.request.url.endsWith(testConfirmPasswordUrl) && con.request.method == RequestMethod.Post){
                mockPasswordConfirm(con);
            }
            let http = new Http(backend, options);
            let requestOptions = new RequestOptions({
                method: con.request.method,
                headers: con.request.headers,
                body: con.request.getBody(),
                url: con.request.url,
                withCredentials: con.request.withCredentials,
                responseType: con.request.responseType
            });
            http.request(con.request.url, requestOptions).subscribe(
                response => {
                    con.mockRespond(response)
                },
                error => {
                    con.mockError(error)
                }
            )
        }, 500)
    });
    return new Http(mockBackend, options)
}

function mockRegistration(con : MockConnection){
    let params = JSON.parse(con.request.getBody());
    let user : User = params.user as User;
    let key = 'xx';
    let response = {
        'user' : user,
        'confirmUrl' : encodeURI('/registration/submit/' + user.username +'/?key=' +key)
    } ;
    user.regkey = key;
    MockDataStorage.addData('users', user);
    MockDataStorage.addData('tenants', params.tenant);
    console.log(MockDataStorage.getData('users'));
    console.log(MockDataStorage.getData('tenants'));
    con.mockRespond(new Response(new ResponseOptions(
        {
            body: JSON.stringify(response),
            status: 200,
            url: con.request.url,
        })));
}

function mockCheckPasswordConfirmLink(con : MockConnection){
    let data = MockDataStorage.getData('users');
    let users : User[] = JSON.parse(data);
    let params = JSON.parse(con.request.getBody());
    let user = users.find((u)=> u.username == params.username);
    if(user && user.regkey === params.key){
        con.mockRespond(
            new Response(new ResponseOptions(
                {   body : JSON.stringify({user: user}),
                    status : 200,
                    url: con.request.url
                }))
        )
    }else {
        con.mockRespond(
            new Response(new ResponseOptions(
                {
                    body : 'Couldn\'t find user with given name and key',
                    status : 403,
                    url: con.request.url

                }))
        )
    }
}

function mockPasswordConfirm(con : MockConnection){
    let data = MockDataStorage.getData('users');
    let users : User[] = JSON.parse(data);
    let params = JSON.parse(con.request.getBody());
    let user = users.find((u)=> u.username == params.username);
    if(user && user.regkey === params.key){
        con.mockRespond(
            new Response(new ResponseOptions(
                {
                    body: JSON.stringify({
                        user: user,
                        authPrincipal: {
                            "authorities": [{"authority": "Admin"}],
                            "details": {
                                "remoteAddress": "0:0:0:0:0:0:0:1",
                                "sessionId": "533D5DD189FFE537C67A9A3EC0D7C19E"
                            },
                            "authenticated": true,
                            "principal": {
                                "password": null,
                                "username": user.username,
                                "authorities": [{"authority": "Admin"}],
                                "accountNonExpired": true,
                                "accountNonLocked": true,
                                "credentialsNonExpired": true,
                                "enabled": true
                            },
                            "credentials": null,
                            "name": user.username
                        }

                    }),
                    status : 200,
                    url: con.request.url
                }))
        )
    }else {
        con.mockRespond(
            new Response(new ResponseOptions(
                {
                    body : 'Couldn\'t find user with given name and key',
                    status : 403,
                    url: con.request.url

                }))
        )
    }
}

function mockAuth(con : MockConnection){
    let data = MockDataStorage.getData('users');
    let users : User[] = JSON.parse(data);
    let params = JSON.parse(con.request.getBody());
    let loggedUser = users.find((u)=> u.username == params.username);
    if(loggedUser && loggedUser.password === params.password){
        let headers : Headers = new Headers();
        headers.set('token', 'mockjwtToken');
        con.mockRespond(
            new Response(new ResponseOptions(
                {   body : JSON.stringify(loggedUser),
                    status : 200,
                    url: con.request.url,
                    headers: headers,
                }))
        )
    }else {
        con.mockRespond(
        new Response(new ResponseOptions(
              { body : 'password is incorrect',
                status : 403,
                url: con.request.url
              }))
        )
    }
}

export let mockBackendProvider : FactoryProvider ={
    provide: Http,
    useFactory: mockBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend ]
};