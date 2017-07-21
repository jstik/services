"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/http/testing");
var mock_data_storage_1 = require("./mock.data.storage");
var http_1 = require("@angular/http");
var constant_helper_1 = require("../constants/constant.helper");
function mockBackendFactory(mockBackend, options, backend) {
    mockBackend.connections.subscribe(function (con) {
        console.log('MockBackend work ' + con.request.url);
        setTimeout(function () {
            if (con.request.url.endsWith(constant_helper_1.testAuthUrl) && con.request.method == http_1.RequestMethod.Post) {
                mockAuth(con);
                return;
            }
            if (con.request.url.endsWith(constant_helper_1.testRegistrationUrl) && con.request.method == http_1.RequestMethod.Post) {
                mockRegistration(con);
                return;
            }
            if (con.request.url.endsWith(constant_helper_1.testCheckConfirmPasswordLinkUrl) && con.request.method == http_1.RequestMethod.Post) {
                mockCheckPasswordConfirmLink(con);
                return;
            }
            if (con.request.url.endsWith(constant_helper_1.testConfirmPasswordUrl) && con.request.method == http_1.RequestMethod.Post) {
                mockPasswordConfirm(con);
            }
            var http = new http_1.Http(backend, options);
            var requestOptions = new http_1.RequestOptions({
                method: con.request.method,
                headers: con.request.headers,
                body: con.request.getBody(),
                url: con.request.url,
                withCredentials: con.request.withCredentials,
                responseType: con.request.responseType
            });
            http.request(con.request.url, requestOptions).subscribe(function (response) {
                con.mockRespond(response);
            }, function (error) {
                con.mockError(error);
            });
        }, 500);
    });
    return new http_1.Http(mockBackend, options);
}
exports.mockBackendFactory = mockBackendFactory;
function mockRegistration(con) {
    var params = JSON.parse(con.request.getBody());
    var user = params.user;
    var key = 'xx';
    var response = {
        'user': user,
        'confirmUrl': encodeURI('/registration/submit/' + user.username + '/?key=' + key)
    };
    user.regkey = key;
    mock_data_storage_1.MockDataStorage.addData('users', user);
    mock_data_storage_1.MockDataStorage.addData('tenants', params.tenant);
    console.log(mock_data_storage_1.MockDataStorage.getData('users'));
    console.log(mock_data_storage_1.MockDataStorage.getData('tenants'));
    con.mockRespond(new http_1.Response(new http_1.ResponseOptions({
        body: JSON.stringify(response),
        status: 200,
        url: con.request.url,
    })));
}
function mockCheckPasswordConfirmLink(con) {
    var data = mock_data_storage_1.MockDataStorage.getData('users');
    var users = JSON.parse(data);
    var params = JSON.parse(con.request.getBody());
    var user = users.find(function (u) { return u.username == params.username; });
    if (user && user.regkey === params.key) {
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: JSON.stringify({ user: user }),
            status: 200,
            url: con.request.url
        })));
    }
    else {
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({
            body: 'Couldn\'t find user with given name and key',
            status: 403,
            url: con.request.url
        })));
    }
}
function mockPasswordConfirm(con) {
    var data = mock_data_storage_1.MockDataStorage.getData('users');
    var users = JSON.parse(data);
    var params = JSON.parse(con.request.getBody());
    var user = users.find(function (u) { return u.username == params.username; });
    if (user && user.regkey === params.key) {
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({
            body: JSON.stringify({
                user: user,
                authPrincipal: {
                    "authorities": [{ "authority": "Admin" }],
                    "details": {
                        "remoteAddress": "0:0:0:0:0:0:0:1",
                        "sessionId": "533D5DD189FFE537C67A9A3EC0D7C19E"
                    },
                    "authenticated": true,
                    "principal": {
                        "password": null,
                        "username": user.username,
                        "authorities": [{ "authority": "Admin" }],
                        "accountNonExpired": true,
                        "accountNonLocked": true,
                        "credentialsNonExpired": true,
                        "enabled": true
                    },
                    "credentials": null,
                    "name": user.username
                }
            }),
            status: 200,
            url: con.request.url
        })));
    }
    else {
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({
            body: 'Couldn\'t find user with given name and key',
            status: 403,
            url: con.request.url
        })));
    }
}
function mockAuth(con) {
    var data = mock_data_storage_1.MockDataStorage.getData('users');
    var users = JSON.parse(data);
    var params = JSON.parse(con.request.getBody());
    var loggedUser = users.find(function (u) { return u.username == params.username; });
    if (loggedUser && loggedUser.password === params.password) {
        var headers = new http_1.Headers();
        headers.set('token', 'mockjwtToken');
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: JSON.stringify(loggedUser),
            status: 200,
            url: con.request.url,
            headers: headers,
        })));
    }
    else {
        con.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'password is incorrect',
            status: 403,
            url: con.request.url
        })));
    }
}
exports.mockBackendProvider = {
    provide: http_1.Http,
    useFactory: mockBackendFactory,
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions, http_1.XHRBackend]
};
//# sourceMappingURL=mock.backend.js.map