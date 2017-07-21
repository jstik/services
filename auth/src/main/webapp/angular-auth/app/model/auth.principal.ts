import {Authoritie} from "./authoritie";
import {Details} from "./details";
import {Principal} from "./principal";
export class AuthPrincipal{
    constructor(
        public authorities : Authoritie[],
        public details : Details,
        public authenticated : boolean,
        public principal : Principal
    ){

    }
}