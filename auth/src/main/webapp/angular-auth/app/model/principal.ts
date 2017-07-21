import {Authoritie} from "./authoritie";
export class Principal {
    constructor(public username: String,
                public authorities: Authoritie[],
                public accountNonExpired : boolean,
                public accountNonLocked : boolean,
                public credentialsNonExpired :boolean,
                public enabled : boolean
    ) {
    }
}