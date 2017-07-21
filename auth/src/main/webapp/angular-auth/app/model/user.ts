import {Tenant} from "./tenant";
import {AuthPrincipal} from "./auth.principal";
import {Client} from "./client";
export class User {
    private _tenants: Tenant[];
    public authPrincipal: AuthPrincipal;

    public clients: { [name: string]: Client; } = {};

    constructor(public id: number,
                public username: string,
                public password?: string,
                public firstname?: string,
                public lastname?: string,
                public email?: string,
                public phone?: string,
                public active?: boolean,
                public regkey?: string,) {
    }


    get tenants(): Tenant[] {
        return this._tenants;
    }

    set tenants(value: Tenant[]) {
        this._tenants = value;
    }

    public addClient(client: Client) {
        let clientId: string = client.clientId;
        this.clients[clientId] = client;
    }

    public getClient(clientId: string): Client {
        return this.clients[clientId];
    }
}