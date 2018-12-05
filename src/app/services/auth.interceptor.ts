import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { Console } from "@angular/core/src/console";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const coppiedReq = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`)
        });
        return next.handle(coppiedReq);
    }
}
