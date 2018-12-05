import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import 'rxjs/Rx';

import { APIConfig } from '../../shared/api.config';
import { MicroService } from "../../shared/micro.service";
import { ErrorService } from "../../services/error.service";

@Injectable()
export class NotificationsService extends ErrorService {
	private config: APIConfig;

  constructor(
	  private http: HttpClient,
    private ms: MicroService
  ) {
		super();
    this.config = this.ms.loadConfig('data');
  }

  getEmailLists(params) {
    return this.http.get(this.config['users'+'/'+params]).pipe(catchError(this.handleError)).map(res => {
      return res;
    });
  }

  getAllEmails() {
    return this.http.get(this.config['users']).pipe(catchError(this.handleError)).map(res => {
      return res;
    });
  }

  getNotification(params) {
		return this.http.get(this.config['notification'] + '/' + params).pipe(catchError(this.handleError)).map(notification => {
			return notification;
		});
  }

  getNotifications(params) {
		return this.http.get(this.config['notifications']).pipe(catchError(this.handleError)).map(notifications => {
			return notifications;
		});
  }

  deleteNotification(params) {
    return this.http.delete(this.config['notification']+'/'+params).pipe(catchError(this.handleError)).map(res => {
      return res;
    });
  }

	saveNewNotificaiton(data) {
    console.log('data: ', data);
		return this.http.post(
			this.config['notification'],
			data
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		});
  }
  
  updateNotification(data) {
    return this.http.put(
      this.config['notification']+'/'+data.uuid,
      data
    )
    .pipe(catchError(this.handleError))
    .map(res => {
      return res;
    });
  }
}
