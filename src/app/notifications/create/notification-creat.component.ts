import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NotificationsService } from '../shared/notifications.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import columns from '../../shared/columns';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-creat.component.html',
  providers: [
    NotificationsService,
    DataService,
    AuthService,
    ToastService,
  ],
  styleUrls: ['./notification-creat.component.scss']
})
export class NotificationCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('f') categoryForm: NgForm;

  notification = {
    name: '',
    reportType: "Report",
    emailRecipients: [],
    level: 'subid',
    matchAll: true,
    filterUuid: '',
    alerts: [],
    reportHours: [],
    reportDaysOfWeek: [],
    emailHours: [],
    emailDaysOfWeek: [],
    timeZone: 'Asia/Shanghai',
  }

  isUpdatePage:boolean = false;
  typeText: boolean = false;



  subIDColumn: any = [];


  matchType: boolean = true;
  matchTypeText: String = "Match All";


  filters: any = [];
  filter: any = {
    filterID: '',
    name: '',
    subID1: '',
    subID2: '',
    subID3: '',
    subID4: '',
    subID5: '',
    leadType1: '',
    leadType2: '',
    leadType3: '',
    offerID: -1,
    credit: {
      poor: true,
      fair: true,
      good: true,
      excellent: true,
    },
    state: false,
    statistics: {},
    calcStatistics: {}
  }


  availableAlerts: any = [];
  selectedAlert: any ;
  

  newMailRecipients = '';
  emailList:any = [];
  availableEmailList:any = [];
  subscription: Subscription[] = [];
  user = {};
  placeholderString = 'Select timezone';
  scheduleDayLists: any = [
    {id: 1, text: "Sunday"}, 
    {id: 2, text: "Monday"}, 
    {id: 3, text: "Tuesday"}, 
    {id: 4, text: "Wednesday"}, 
    {id: 5, text: "Thursday"}, 
    {id: 6, text: "Friday"}, 
    {id: 7, text: "Saturday"}
  ];
  allHours: any = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  uuid: String = '';

  constructor(
    private route: ActivatedRoute,
    private router:Router, 
    private NotificationsService: NotificationsService,
    private dataService: DataService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {

    this.availableAlerts.push({
      id: '',
      value: '',
      text: 'Select'
    });
    columns.forEach(column => {
      if (column.field.indexOf('subid') < 0) {
        this.availableAlerts.push({
          id: '',
          value: column.field,
          text: column.title,
        });
      }
    });

    this.route.params.subscribe(params => {
      if( typeof params.uuid !== 'undefined' && (params.uuid != null || params.uuid != '') ){
        this.uuid = params.uuid;
        this.isUpdatePage = true;
        this.getNotificationFromServer();
      }
    });
  }

  getNotificationFromServer() {

    
    if (this.uuid) {
      this.subscription['getNotification'] = this.NotificationsService.getNotification(this.uuid).subscribe(response => {
        if (response ) {
          this.notification = response;
          if (!this.notification.reportHours) this.notification.reportHours = [];
          if (!this.notification.reportDaysOfWeek) this.notification.reportDaysOfWeek = [];
          if (!this.notification.emailHours) this.notification.emailHours = [];
          if (!this.notification.emailDaysOfWeek) this.notification.emailDaysOfWeek = [];
          if (!this.notification.emailRecipients) this.notification.emailRecipients = [];
          if (!this.notification.alerts) this.notification.alerts = [];
          // this.notification.uuid = undefined;
          var mid_availableAlerts = this.availableAlerts;

          if (this.notification.reportType == "notification") {
            this.typeText = true;
          }
          else {
            this.typeText = false;
          }
          for (let ind = 0;ind < this.notification.reportDaysOfWeek.length;ind ++) {
            this.notification.reportDaysOfWeek[ind] = this.notification.reportDaysOfWeek[ind].toString();
          }
          for (let ind = 0;ind < this.notification.emailDaysOfWeek.length;ind ++) {
            this.notification.emailDaysOfWeek[ind] = this.notification.emailDaysOfWeek[ind].toString();
          }

          this.notification.alerts.forEach(function (item) {
            var index = mid_availableAlerts.findIndex(function (elem) {return elem.value === item.name;});
            if (index > 0){
              item.label = mid_availableAlerts[index].text;
            }
            else {
              item.label = item.name;
            }
          });

          var mid_notification = this.notification;
          this.availableAlerts = this.availableAlerts.filter(function (element) {
            return mid_notification.alerts.findIndex(function (elem) { return elem.name === element.value; }) === -1;
          });

          // if (response.timeZone){
          //   this.notification.timeZone = this.timezonesList[this.timezonesList.indexOf(response.timeZone)];
          // } else {
          //   this.notification.timeZone = this.timezonesList[this.timezonesList.indexOf(moment().format('YYYY-MM-DD'))];
          // }
          this.getFilterFromServer(this.notification.filterUuid);
        }
      });
    }
  }

  getFilterFromServer(uuid) {
    if (!uuid) return;
    this.subscription['getFilter'] = this.dataService.getFilter(uuid).subscribe(
      response => {
        // this.filter.subID1 = response.subid;
        // this.filter.subID2 = response.subid2;
        // this.filter.subID3 = response.subid3;
        // this.filter.subID4 = response.subid4;
        // this.filter.subID5 = response.subid5;
        this.filter.leadType1 = response.leadType1;
        this.filter.leadType2 = response.leadType2;
        this.filter.leadType3 = response.leadType3;
        for (let i in this.filter.credit) {
          this.filter.credit[i] = response.creditPool.includes(i);
        }
        for (let i in this.filter.statistics) {
          this.filter.statistics[i] = response.columnsList.includes(i);
        }
        this.notification.filterUuid = response.uuid;
      },
      error => {
        this.toastService.error('Failed to fetch Filter data');
      }
    )
  }

  onSelectType(e) {
    if (e.target.checked) {
      this.notification.reportType = "notification";
    } else {
      this.notification.reportType = "report";
    }
  }

  onToggleStatistics(option) {
    let str: String = option+'';
    this.notification.level = ''+str;
    let numstr = str.slice(5, 6);
    for (let i = 0; i < 5 ; i ++) {
      if (i == 0) {
        if (i < Number(numstr)) {
          this.filter.statistics["subid".toString()] = true;
        }
        else {
          this.filter.statistics["subid".toString()] = false;
        }
      }
      else {
        if (i < Number(numstr)) {
          this.filter.statistics["subid"+(i+1).toString()] = true;
        }
        else {
          this.filter.statistics["subid"+(i+1).toString()] = false;
        }
      }
    }
  }

  onChangeTimezone(e) {
    this.notification.timeZone = e;
  }

  onChangeFilter(e) {
    this.notification.filterUuid = e.value;
    this.filter.filterID = e.value;
    if (e.value !== '' && e.data.length != 0) {
      this.filter.name = e.data[0].text;

      this.subscription['getFilter'] = this.dataService.getFilter(e.value).subscribe(
        response => {
          // this.filter.subID1 = response.subid;
          // this.filter.subID2 = response.subid2;
          // this.filter.subID3 = response.subid3;
          // this.filter.subID4 = response.subid4;
          // this.filter.subID5 = response.subid5;
          this.filter.leadType1 = response.leadType1;
          this.filter.leadType2 = response.leadType2;
          this.filter.leadType3 = response.leadType3;
          for (let i in this.filter.credit) {
            this.filter.credit[i] = response.creditPool.includes(i);
          }
          for (let i in this.filter.statistics) {
            this.filter.statistics[i] = response.columnsList.includes(i);
            if (this.filter.statistics[i] === true) {
              this.typeText = true;
              this.notification.reportType = "notification";
            }
          }
          console.log(this.filter.statistics);
          this.notification.filterUuid = response.uuid;
        },
        error => {
          this.toastService.error('Failed to fetch Filter data');
        }
      )
    } else {
      this.filter.name = '';
    }
  }

  onSelectMatchType(event) {
    if (event.target.checked) {
      this.matchTypeText = "Match All";
    } else {
      this.matchTypeText = "Match Any";
    }
  }

  addAlert(e) {
    if (e.data[0].value == "") return;
    this.selectedAlert = e.data[0];
    if (!this.selectedAlert) return;
    this.notification.alerts.push({
      name: this.selectedAlert.value,
      label: this.selectedAlert.text,
      min: null,
      max: null,
    });
    this.availableAlerts.splice(this.availableAlerts.findIndex(
      element => {
        return element.text === this.selectedAlert.label;
      }
    ), 1);
  }

  saveNotification() {
    let body = this.notification;
    // body.alerts.forEach(item => {
    //   delete item.label;
    // });
    this.subscription['saveNewNotificaiton'] = this.NotificationsService.saveNewNotificaiton(body).subscribe(
      response => {
        this.toastService.success("Notification is saved");
      },
      error => {
        if (error.message == "Property 'name' is required") {
          this.toastService.error("Name is required");
        } else if (error.message == "Property 'filterUuid' is required") {
          this.toastService.error("Filter is not selected");
        } else if (error.message == 'Alerts in "Notify on" section should be set') {
          this.toastService.error('"Notify on" is not selected');
        } else if (error.message == "Constraint error, got value 0 expected range 1-31") {
          this.toastService.error('Schedule is not completed');
        }
      }
    );
  }

  updateNotification() {
    let body = this.notification;
    this.subscription['updateNotification'] = this.NotificationsService.updateNotification(body).subscribe(
      response => {
        if (response) {
          this.toastService.success('Notification is updated');
        }
      },
      error => {
        this.toastService.error('Failed to update');
      }
    );
  }

  removeAlert(alert) {
    this.notification.alerts.splice(this.notification.alerts.findIndex(element => element.label === alert.label), 1);
  }

  toggleSelection(item) {
    let idx = this.notification.reportHours.indexOf(item);
    if (idx > -1) {
      this.notification.reportHours.splice(idx, 1);
      return;
    }
    this.notification.reportHours.push(item);
  }

  toggleSelectionEmail(item) {
    let idx = this.notification.emailHours.indexOf(item);
    if (idx > -1) {
      this.notification.emailHours.splice(idx, 1);
      return;
    }
    this.notification.emailHours.push(item);
  }

  toggleWeekday(event) {
    this.notification.reportDaysOfWeek = event.value;
  }

  toggleWeekdayMail(event) {
    this.notification.emailDaysOfWeek = event.value;
  }

  changeTimezone(timezone) {
    // this.user.timezone = timezone;
  }

  emailInputKeyup($event) {
    $event = ($event) ? $event : window.event;
    var charCode = ($event.which) ? $event.which : $event.keyCode;
    if ((charCode === 13) && (this.newMailRecipients)) {
        this.addEmail();
    }
    if (this.isChar(charCode)) return;
    if (this.newMailRecipients.length < 3) {
        this.emailList = [];
        return;
    }
  }

  addEmail = function () {
    if ((!this.newMailRecipients) || this.newMailRecipients.indexOf("@") < 0) {
      // this.toastService.error("Email is not valid");
      this.toastService.error('Email is not valid');
      var elem = this.element(document.querySelector('#emailInput'));
      elem.addClass('invalid');
      elem.focus();
      return;
    }
    this.notification.emailRecipients.push(this.newMailRecipients);
    this.newMailRecipients = '';
  }

  removeEmail(email) {
    this.notification.emailRecipients.splice(this.notification.emailRecipients.findIndex(element => element===email), 1);
  }

  isChar(charCode) {
    if ((charCode === 8) || (charCode > 31 && (charCode < 48 || charCode > 57) || (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)))) {
        return false;
    }
    return true;
  }

  ngOnInit() {
    this.subIDColumn = [];
    let i = 0;
    columns.forEach(column => {
      if (i < 5) {
        this.subIDColumn.push({
          value: column.field,
          title: column.title,
        });
        this.filter.statistics[column.field] = false;
        i ++;
      }
    });

    this.subscription['getAllEmails'] = this.NotificationsService.getAllEmails().subscribe(response => {
      this.emailList = [];
      response.forEach(notification => {
        this.emailList.push({
          id: '',
          value: notification.email,
          text: notification.email,
        });
      });
    }, error => {
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['login']);
      } else {
        this.emailList = [];
      }
    });

    this.subscription['getFilters'] = this.dataService.getFilters().subscribe(response => {
      this.filters = [];
      this.filters.push({
        id: '',
        value: '',
        text: 'Select'
      });
      response.forEach(filter => {
        this.filters.push({
          id: filter.uuid,
          value: filter.uuid,
          text: filter.name,
        });
      });
    }, error => {
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['/']);
      } else {
        this.filters = [];
        this.filters.push({
          id: '',
          value: '',
          text: 'Select'
        });
      }
    });
  }

  ngAfterViewInit() {
    
  }
}