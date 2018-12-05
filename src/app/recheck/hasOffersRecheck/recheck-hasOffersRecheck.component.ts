import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { format } from 'util';

@Component ({
    selector: 'app-recheck-hasOffersRecheck',
    templateUrl: './recheck-hasOffersRecheck.component.html',
    styleUrls: ['./recheck-hasOffersRecheck.component.scss'],
    providers: [ DataService, ToastService ],
})

export class HasOffersRecheck implements OnInit, OnDestroy {

    isConnecting: boolean = false;
    color = 'primary';
    mode = 'indeterminate';
    value = 30;
    bufferValue = 75;

    dateFrom = new FormControl(moment().add(-7, 'days').format());
    dateTo = new FormControl(moment().format());
    offerID = '';
    publisherID = '';
    newLeads = [];

    subscription: Subscription[] = [];

    onChangeDate(event, type) {
        if (type === 'from') {
            this.dateFrom = new FormControl(event.value);
        } else if (type === 'to') {
            this.dateTo = new FormControl(event.value);
        }
    }

    onCheckLeadsClick() {
        let body = {
            dateFrom: moment(this.dateFrom.value).format('YYYY-MM-DD'),
            dateTo: moment(this.dateTo.value).format('YYYY-MM-DD'),
            offerID: this.offerID,
            publisherID: this.publisherID,
        }

        this.isConnecting = true;
        this.subscription['postHasOffers'] = this.dataService.postHasOffers(body).subscribe(
            res => {
                this.isConnecting = false;
                if (!res) return;
                this.newLeads = res;
                if (!this.newLeads.length) {
                    this.toastService.success('No New Leads');
                    return;
                }
                this.toastService.success(this.newLeads.length + 'new Leads');
            }, err => {
                this.isConnecting = false;
                this.toastService.error("something went wrong!");
            }
        )
    }

    constructor (
        private dataService: DataService,
        private toastService: ToastService,
    ) { }

    ngOnInit () {
        
    }

    ngOnDestroy () {
        
    }
}