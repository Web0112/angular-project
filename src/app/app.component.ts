import { Component, Input, OnInit, OnDestroy, HostBinding, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  showWelcome: boolean;
  authSub: Subscription;
  routerSub: Subscription;

  @HostBinding('class') bdClass: string;
  
  constructor(private router: Router, public authService: AuthService, private snotifyService: SnotifyService){ }

  ngOnInit() {
    this.bdClass = this.authService.isAuthenticated() ? 'dashboard' : 'login';
    
    this.authSub = this.authService.userIsLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.bdClass = (loggedIn) ? 'dashboard' : 'login'
      }
    );
    
    this.routerSub = this.router.events.subscribe((event) => {
      if( event instanceof NavigationEnd ){
        this.showWelcome = ( event.url == '/stats' ) ? true : false;
      }
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  onResize(event) {
    let body = document.getElementsByTagName('body')[0],
          className = 'menu-active';
    if(event.target.innerWidth >= 992){
      if(this.hasClass(body,className)){
        this.removeClass(body, className);
      }
    }
  }

  hasClass(elem, cname) {
    var classes = elem.className.split(' ');
    for (var i = 0; i <= classes.length - 1; i++) {
      if (classes[i] === cname) {
        return true;
      }
    } return false;
  }
  
  removeClass(elem, cname) {
    var classes = elem.className.split(' ');
    for (var i = classes.length - 1; i >= 0; i--) {
      if (classes[i] === cname) {
        elem.className = elem.className.replace(classes[i], '');
      }
      elem.className[i] = classes.join(' ');
    }
  }

}
