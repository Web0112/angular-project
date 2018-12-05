import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/Rx';
import { AuthService } from "../services/auth.service";

import { APIConfig } from "../shared/api.config";
import { MicroService } from "../shared/micro.service";

@Injectable()
export class LoginService {
    private config: APIConfig;
    
    constructor(private http: HttpClient, private authService: AuthService, private ms: MicroService){ 
        this.config = ms.loadConfig('auth');
    }

    login( userData ) {
        return this.http.post(this.config['signin'], userData).pipe(
            catchError(this.handleError)
        ).map(user => {
            console.log('user:' , user);
            if (user && user.user && user.token) {
                let userInfo = {
                    ...user.user,
                    ...user.token
                };
                this.authService.storeAuthData(userInfo);
                this.authService.userIsLoggedIn.emit(true);
                return user.user;
            }else{
                return null;
            }
        });
    }
    
    private handleError(err: HttpErrorResponse | any) {
        console.log('error: ', err);
        if( typeof err.error !== 'undefined' ){
            return Observable.throw(err.error.error.message);
        }
        return Observable.throw(err.message || err);
    }

}