import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component ({
  selector: 'app-recheck-leadsRecheck',
  templateUrl: './recheck-leadsRecheck.component.html',
  styleUrls: ['./recheck-leadsRecheck.component.scss'],
  providers: [ DataService, ToastService ],
})

export class LeadsRecheckComponent implements OnInit, OnDestroy {

  isConnecting: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  bufferValue = 75;

  subscription: Subscription[] = [];

  dateFrom = new FormControl(moment().format());
  dateTo = new FormControl(moment().format());

  newLeads = [];
  fields = [
    {
      label: 'Lead ID',
      value: 'leadID'
    }, 
    {
      label: 'Affiliate Name',
      value: 'affiliateName'
    }, 
    {
      label: 'Campaign ID',
      value: 'campaignID'
    }, 
    {
      label: 'Campaign Name',
      value: 'campaignName'
    }, 
    {
      label: 'Created on',
      value: 'createdOn'
    }, 
    {
      label: 'Offer ID',
      value: 'offerID'
    }, 
    {
      label: 'Offer Name',
      value: 'offerName'
    }, 
    {
      label: 'Paid',
      value: 'paid'
    }, 
    {
      label: 'Subid',
      value: 'subid'
    }, 
    {
      label: 'Sold',
      value: 'sold'
    }, 
    {
      label: 'Vertical ID',
      value: 'verticalID'
    }, 
    {
      label: 'Vertical Name',
      value: 'verticalName'
    },
  ];
  fetchTime = '';
  timeZone = moment().utc(true);

  onChangeDate(event, type) {
    if (type === 'from') {
      this.dateFrom = new FormControl(event.value);
    } else if (type === 'to') {
      this.dateTo = new FormControl(event.value);
    }
  }

  onCheckLeadsClick(checkOld) {
    let body = {
      dateFrom: moment(this.dateFrom.value).format('YYYY-MM-DD'),
      dateTo: moment(this.dateTo.value).format('YYYY-MM-DD'),
      checkOld: checkOld,
    }

    this.isConnecting = true;
    this.subscription['postLeadsRecheck'] = this.dataService.postLeadsRecheck(body).subscribe(
      res => {
        this.isConnecting = false;
        if (!res) return;
        this.newLeads = res.leads;
        this.fetchTime = moment(res.fetchTime).format('YYYY-MM-DD');
        if (!this.newLeads.length) {
          this.toastService.success('No new Leads');
          return;
        }
        this.formatNewLeads();
        this.toastService.success(this.newLeads.length + ' new Leads');
      }, err => {
        this.isConnecting = false;
        console.log("error = ", err);
        this.toastService.error("Something went wrong!");
      }
    )
  }

  formatNewLeads() {
    this.newLeads.sort((a, b) => {
      return a.createdOn > b.createedOn ? 1 : 0;
    });
    this.newLeads = this.newLeads.map(lead => {
      lead.createdOn = moment(lead.createdOn).format('YYYY-MM-DD');
      return lead;
    })
  }

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.isConnecting = true;
    this.subscription['getLeadsRecheck'] = this.dataService.getLeadsRecheck().subscribe(
      res => {
        this.isConnecting = false;
        if (!res) return;
        console.log('fetchTime: ', res);
        console.log('timezone: ', this.timeZone.format('YYYY-MM-DD, h:mm a'));
        this.fetchTime = moment(res.fetchTime).format('YYYY-MM-DD, h:mm a');
        console.log('changed timezone: ', this.timeZone);
        console.log('changed timezone: ', this.timeZone.format('YYYY-MM-DD, h:mm a'));
        this.newLeads = res.newLeads;
        this.formatNewLeads();
      }, err => {
        this.isConnecting = false;
        this.toastService.error(err.message);
      }
    )
  }
  ngOnDestroy() {

  }
}