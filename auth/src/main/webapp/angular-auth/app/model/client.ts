import {Headers} from "@angular/http";
export class Client {
    constructor(private _clientId: string, private _token: String) {
    }

    authHeader(): Headers {
        let headers: Headers = new Headers();
        headers.set('Authorization', "Bearer " + this._token);
        return headers;
    }


    set token(value: String) {
        this._token = value;
    }


    get token(): String {
        return this._token;
    }

    get clientId(): string {
        return this._clientId;
    }
}