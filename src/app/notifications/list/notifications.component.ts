import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from '../shared/notifications.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers:[NotificationsService, DataService, AuthService, ToastService],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  isConnecting:boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  bufferValue = 75;

  isSelectedAll: boolean = false;
  notifications: any = [];
  searchTxt: String = "";

  constructor(
    private router:Router, 
    private NotificationsService: NotificationsService,
    private dataService: DataService,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  onSelectAll() {
    this.notifications.forEach(notification => {
      notification.selected = this.isSelectedAll;
    });
  }

  onSelect() {
    if (this.isSelectedAll) {
      this.isSelectedAll = false;
    }
  }

  onChange() {

  }


  removeNotification(notificationId) {
    this.isConnecting = true;
    this.subscription['deleteNotification'] = this.NotificationsService.deleteNotification(notificationId).subscribe(response => {
      const index = this.notifications.findIndex(x => x.uuid == notificationId);
      this.isConnecting = false;
      if( index >= 0) {
        this.notifications.splice(index, 1);
      }
      this.toastService.success('Succcessfully deleted notification.');
    }, error => {
      this.isConnecting = false;
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['login']);
      } else {
        this.notifications = [];
      }
    });
  }

  ngOnInit() {
    let params = { };

    this.isConnecting = true;
    this.subscription['getNotifications'] = this.NotificationsService.getNotifications(params).subscribe(response => {
      this.notifications = [];
      this.isConnecting = false;
      response.forEach(notification => {
        this.notifications.push({
          ...notification,
          selected: false,
        });
      });
      console.log(this.notifications);
    }, error => {
      this.isConnecting = false;
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['login']);
      } else {
        this.notifications = [];
      }
    });
  }

  ngOnDestroy() {
  }
}
