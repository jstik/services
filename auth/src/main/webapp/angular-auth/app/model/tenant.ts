import {User} from "./user";
export class Tenant {
    public users?: User[];
    constructor(
                public id: number,
                public name: string,
                public phone?: string,
                public address?: string,
                public description? : string) {

    }
}