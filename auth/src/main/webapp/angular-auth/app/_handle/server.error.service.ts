import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ServerErrorService{

    private subject = new Subject<any>();

    testResponse(response: Response): Boolean {
        if (response.ok) {
            this.subject.next(null);
        }
        if (response.status >= 400 && response.status != 406) {
            this.subject.error(response.statusText);
            return true;
        } else {
            this.subject.next(response);
            return false;
        }
    }
    getMessage() : Observable<any>{
        return  this.subject.asObservable();
    }

}