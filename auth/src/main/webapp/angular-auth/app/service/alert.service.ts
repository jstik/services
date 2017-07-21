import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Router, NavigationStart} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AlertService{
    private subject = new Subject<any>();
    private keepAfterNavigationChange : boolean = false;

    constructor(router : Router){
        router.events.subscribe(event => {
          if(event instanceof NavigationStart){
              if(this.keepAfterNavigationChange) {
                  this.keepAfterNavigationChange = false;
              } else {
                  this.subject.next();
              }
          }
        })
    }

    success(message: string , keepAfterNavigationChange = false, destroyAfter? : number){
       this.keepAfterNavigationChange = keepAfterNavigationChange;
       let mess : Object = {type: 'success', message: message};
       if(destroyAfter){
           mess['destroyAfter'] = destroyAfter;
       }
       this.subject.next(mess);
    }

    error(message: string , keepAfterNavigationChange = false, destroyAfter? : number){
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        let mess : Object = {type: 'error', message: message};
        if(destroyAfter){
            mess['destroyAfter'] = destroyAfter;
        }
        this.subject.next(mess);
    }

    info(message: string , keepAfterNavigationChange = false, destroyAfter? : number){
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        let mess : Object = {type: 'info', message: message};
        if(destroyAfter){
            mess['destroyAfter'] = destroyAfter;
        }
        this.subject.next(mess);
    }

    getMessage() : Observable<any>{
        return  this.subject.asObservable();
    }

}
