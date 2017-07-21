

import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    router: Router;

    constructor(router: Router){
        this.router = router;

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean
        | Observable<boolean>
        | Promise<boolean> {
        if(localStorage.getItem('LOGGEDUSER')){
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}