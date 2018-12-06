import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-secondary',
  templateUrl: './nav-secondary.component.html'
})
export class NavSecondaryComponent implements OnInit {

  user: object;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.userIsLoggedIn.emit(false);
    this.authService.destroyAuthData();
  }

}
