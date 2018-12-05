import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ErrorService {
    handleError(err: HttpErrorResponse | any) {
        console.log('error is : , ', err);
        if( typeof err.error !== 'undefined' && typeof err.error.error !== 'undefined' ){
            return Observable.throw(err.error.error);
        }
        return Observable.throw(err.error || err);
    }
}