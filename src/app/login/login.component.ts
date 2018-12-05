import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styles: [`
    .small { font-size: 12px !important; }
    .login__error{ line-height: 18px !important; }
    input.ng-invalid.ng-touched { border-bottom-color: red !important; }
  `], 
  providers:[LoginService],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  error: string;
  loginForm: FormGroup;
  loginSubscription: Subscription;
  isLoginstate:boolean = false;

  color='primary';
  mode='indeterminate'
  diameter=20;
  value=50;
  swidth=10;
  
  constructor(private router:Router, private loginService:LoginService, private authService:AuthService) { }

  ngOnInit() {
    //Check if user is already logged, so redirect to dashboard.
    if( this.authService.isAuthenticated() ){
      this.router.navigate(['/reports']);
    }
    this.isLoginstate = false;
    //Prepare login form
    this.error = '';
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required), 
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.isLoginstate = true;
    this.loginSubscription = this.loginService.login(this.loginForm.value).subscribe(
      data => {
        this.router.navigate(['/reports']);
      },
      error => {
        this.error = error;
        this.isLoginstate = false;
      }
    );
  }

  ngOnDestroy() {
    if( this.loginSubscription ){
      this.loginSubscription.unsubscribe();  
    }
  }
}
