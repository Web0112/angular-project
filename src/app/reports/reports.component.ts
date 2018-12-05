import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

// const moment = _moment;

import { ReportsService } from './reports.service';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import columns from '../shared/columns';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html', 
  styleUrls: ['./reports.component.scss'],
  providers:[ReportsService, DataService, AuthService, ToastService]
})
export class ReportsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  isConnecting:boolean = false;
  mode = 'indeterminate';
  value = 30;
  bufferValue = 75;

  bulkActions: string = 'bulkAction';
  checkSelectAll: boolean = false;
  reports: any = [];
  modalOpened: boolean = false;

  filters: any = [];
  dateFrom = new FormControl(moment().add(-7, 'days').format());
  dateTo = new FormControl(moment().format());

  // Modal Data
  offers: any = [];
  tags: any = [];
  creditRaiting = [
    'poor',
    'fair',
    'good',
    'excellent'
  ];
  statisticsColumns: any = [];
  calcStatisticsColumns: any = [];

  tracking:any = [0, 1, 2, 3, 4, 41];
  leadData: any = [5, 6, 30, 31, 32, 33];
  revenue: any = [11, 13, 36, 37, 38, 39, 40];
  performance: any = [14, 28, 29, 34, 35];
  predictions: any = [15, 16, 20, 21, 22, 23, 24];
  expenses: any = [17, 18];
  misc:any = [12, 10, 7, 8, 9];

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

  addRevenue: any = {
    addRev: 0,
    columnsList: [],
    creditPool: [],
    dateFrom: "",
    dateTo: "",
    leadType1: null,
    leadType2: null,
    leadType3: null,
    loanAmount: false,
    offerID: null,
    offers: "",
    state: false,
    subid: "",
    subid2: "",
    subid3: "",
    subid4: "",
    subid5: "",
    tags: [],
  }
  revenueCredit: any = {
    poor: true,
    fair: true,
    good: true,
    excellent: true,    
  }

  constructor(
    private router:Router, 
    private reportsService: ReportsService,
    private dataService: DataService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {  }

  ngOnInit() {
    let params = {
      columnsList: ['subid', 'subid2', 'subid3', 'subid4', 'subid5', 'add_revenue', 'tags', 'accepted_leads', 'raw_leads', 'accepted_pct', 'unmatched_leads', 'unmatched_pct', 'leads_pl', 'actual_pl', 'leads_pf'],
      creditPool: ['poor', 'fair', 'good', 'excellent'],
      dateFrom: moment(this.dateFrom.value).format('YYYY-MM-DD'),
      dateTo: moment(this.dateTo.value).format('YYYY-MM-DD'),
      filter: 1,
      loanAmount: false,
      state: false
    };
    
    this.isConnecting = true;
    this.subscription['getReports'] = this.reportsService.getReports(params).subscribe(response => {
      this.reports = response.report;
      this.isConnecting = false;
    }, error => {
      this.isConnecting = false;
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['login']);
      } else {
        this.reports = [];
      }
    });

    this.statisticsColumns = [];
    this.calcStatisticsColumns = [];
    columns.forEach(column => {
      if (column.field.indexOf('_pct') > 0) {
        this.calcStatisticsColumns.push({
          value: column.field,
          title: column.title,
        });
        this.filter.calcStatistics[column.field] = true;
      } else {
        this.statisticsColumns.push({
          value: column.field,
          title: column.title,
        });
        this.filter.statistics[column.field] = true;
      }
    });

    this.subscription['getOffers'] = this.dataService.getOffers().subscribe(response => {
      this.offers = [];
      this.offers.push({
        id: '',
        value: '',
        text: 'Select Offer',
      })
      response.forEach(offer => {
        this.offers.push({
          id: offer.offerID,
          value: offer.offerID,
          text: offer.offerName,
        });
      });
    }, error => {
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['/']);
      } else {
        this.offers = [];
      }
    });

    this.subscription['getAllTags'] = this.dataService.getAllTags().subscribe(response => {
      this.tags = [];
      response.forEach(tag => {
        this.tags.push(tag);
      });
    }, error => {
      if (error.name && error.name === 'UnauthorizedError') {
        this.authService.removeAuthData();
        this.router.navigate(['/']);
      } else {
        this.tags = [];
      }
    });

    this.subscription['getFilters'] = this.dataService.getFilters().subscribe(response => {
      this.filters = [];
      this.filters.push({
        id: '',
        value: '',
        text: 'Select Filter'
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
          text: 'Select Filter'
        });
      }
    });
  }

  ngOnDestroy() {
  }

  onAddRevenue() {

    if (!this.addRevenue.subid) {
      delete this.addRevenue.subid;
    } else {
      this.addRevenue.subid = this.addRevenue.subid.toString();
    }
    if (!this.addRevenue.subid2) {
      delete this.addRevenue.subid2;
    } else {
      this.addRevenue.subid2 = this.addRevenue.subid2.toString();
    }
    if (!this.addRevenue.subid3) {
      delete this.addRevenue.subid3;
    } else {
      this.addRevenue.subid3 = this.addRevenue.subid3.toString();
    }
    if (!this.addRevenue.subid4) {
      delete this.addRevenue.subid4;
    } else {
      this.addRevenue.subid4 = this.addRevenue.subid4.toString();
    }
    if (!this.addRevenue.subid5) {
      delete this.addRevenue.subid5;
    } else {
      this.addRevenue.subid5 = this.addRevenue.subid5.toString();
    }

    this.addRevenue.columnsList = [];
    let statist = [];
    columns.forEach(column => {
        statist.push({
          value: column.field,
        });
    });
    for (let i in statist) {
      if (statist[i]) {
        this.addRevenue.columnsList.push(statist[i].value);
      }
    }

    this.addRevenue.columnsList.splice(this.addRevenue.columnsList.length - 1, 1);
    this.addRevenue.columnsList.splice(5, 2, "add_revenue", "tags");
    
    if (this.addRevenue.dateFrom === "") {
      this.addRevenue.dateFrom = moment(this.dateFrom.value).format('YYYY-MM-DD');
    }
    if (this.addRevenue.dateTo === "") {
      this.addRevenue.dateTo = moment(this.dateTo.value).format('YYYY-MM-DD');
    }

    this.addRevenue.creditPool = [];
    if (this.revenueCredit["poor"]) {
      this.addRevenue.creditPool.push("poor");
    }
    if (this.revenueCredit["fair"]) {
      this.addRevenue.creditPool.push("fair");
    }
    if (this.revenueCredit["good"]) {
      this.addRevenue.creditPool.push("good");
    }
    if (this.revenueCredit["excellent"]) {
      this.addRevenue.creditPool.push("excellent");
    }


    let body = this.addRevenue;
    this.subscription['addNewRevenue'] = this.dataService.addNewRevenue(body).subscribe(
      res => {
        this.toastService.success("Add Revenue Successfully");
        document.getElementById("revenue-modal").classList.remove('open');
        document.getElementById("revenue-modal").style.display = "none";
      },
      error => {
        this.toastService.error(error.toString());
        document.getElementById("revenue-modal").classList.remove('open');
        document.getElementById("revenue-modal").style.display = "none";
      }
    );
  }

  onSaveFilter() {
    if (this.filter.name === '') {
      this.toastService.error('Please input filter name before save');
    }
    let postData = {
      subid: this.filter.subID1,
      subid2: this.filter.subID2,
      subid3: this.filter.subID3,
      subid4: this.filter.subID4,
      subid5: this.filter.subID5,
      tags: [],
      name: this.filter.name,
      loanAmount: this.filter.loanAmount,
      state: this.filter.state,
      leadType1: this.filter.leadType1,
      leadType2: this.filter.leadType2,
      leadType3: this.filter.leadType3,
      creditPool: [],
      columnsList: [],
    };
    for (let i in this.filter.statistics) {
      if (this.filter.statistics[i]) {
        postData.columnsList.push(i);
      }
    }
    for (let i in this.filter.credit) {
      if (this.filter.credit[i]) {
        postData.creditPool.push(i);
      }
    }
  }

  onGenerateReport() {
    let params = {
      columnsList: [],
      creditPool: [],
      loanAmount: this.filter.loanAmount,
      dateFrom: moment(this.dateFrom.value).format('YYYY-MM-DD'),
      dateTo: moment(this.dateTo.value).format('YYYY-MM-DD'),
    };
    
    for (let i in this.filter.statistics) {
      if (this.filter.statistics[i]) {
        params['columnsList'].push(i);
      }
    }

    for (let i in this.filter.credit) {
      if (this.filter.credit[i]) {
        params['creditPool'].push(i);
      }
    }

    this.isConnecting = true;
    this.subscription['getReports'] = this.reportsService.getReports(params).subscribe(
      response => {
        this.isConnecting = false;
        this.reports = [];
        response.report.forEach(report => {
          this.reports.push(report);
        });
      },
      error => {
        this.isConnecting = false;
        this.toastService.error('Failed to generate report.');
      }
    )
  }

  onChangeFilter(e) {
    this.filter.filterID = e.value;
    if (e.value !== '') {
      this.filter.name = e.data[0].text;

      this.subscription['getFilter'] = this.dataService.getFilter(e.value).subscribe(
        response => {
          this.filter.subID1 = response.subid;
          this.filter.subID2 = response.subid2;
          this.filter.subID3 = response.subid3;
          this.filter.subID4 = response.subid4;
          this.filter.subID5 = response.subid5;
          this.filter.leadType1 = response.leadType1;
          this.filter.leadType2 = response.leadType2;
          this.filter.leadType3 = response.leadType3;
          for (let i in this.filter.credit) {
            this.filter.credit[i] = response.creditPool.includes(i);
          }
          for (let i in this.filter.statistics) {
            this.filter.statistics[i] = response.columnsList.includes(i);
          }
        },
        error => {
          this.toastService.error('Failed to fetch Filter data');
        }
      )
    } else {
      this.filter.name = '';
    }
  }

  onChangeDate(e, value) {
    if (value === 'from') {
      this.dateFrom = new FormControl(e.value);
    } else if (value === 'to') {
      this.dateTo = new FormControl(e.value);
    }
  }

  onChangeOfferIDs(e) {
    this.filter.offerID = e.value;
  }

  onChangeRevenueOfferIDs(e) {
    if (e.value) {
      this.addRevenue.offerID = e.value;
    }
  }

  onChnageRevenueCredit(e) {
    this.addRevenue.creditPool.push(e.value);
  }

  onRevenueChangeDate(e, value) {
    if (value === 'from') {
      this.addRevenue.dateFrom = moment(e.value).format('YYYY-MM-DD');
    } else if (value === 'to') {
      this.addRevenue.dateTo = moment(e.value).format('YYYY-MM-DD');
    }
  }

  onToggleStatistics(option, stat) {
    this.filter[stat][option] = !this.filter[stat][option];
  }

  onExportReport() {
    var csvData = this.ConvertToCSV();
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);

    var period = this.reports.dateFrom+'-'+this.reports.dateTo;
    var filename = "report_"+period+".csv";

    if(navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      var a = document.createElement("a");
      a.href = url;
      a.download = 'ETPHoldReview.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  
  ConvertToCSV() {
    var array = typeof this.reports != 'object' ? JSON.parse(this.reports) : this.reports;
    var str = '';
    var row = "";

    for (var index in this.reports[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }

    return str;
  }
}