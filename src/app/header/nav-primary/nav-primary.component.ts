import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-primary',
  templateUrl: './nav-primary.component.html'
})
export class NavPrimaryComponent implements OnInit {
  public navbarOpen:boolean = false;
  
  constructor() { }

  ngOnInit() {
  }
  
  toggleNavbar() {
    if(window.innerWidth <= 992){
      this.navbarOpen = !this.navbarOpen;

      let body = document.getElementsByTagName('body')[0],
          className = 'menu-active';

      if(this.hasClass(body, className)){
        this.removeClass(body, className);
      }else{
        this.addClass(body,className);
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

  addClass(elem, cname) {
    elem.className += ' ' + cname;
  }

  removeClass(elem, cname) {
    elem.classList.toggle(cname);
  }
}
