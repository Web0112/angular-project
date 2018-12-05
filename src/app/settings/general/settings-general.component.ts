import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss'],
  providers:[ DataService, ToastService],
})

export class SettingsGeneralComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];

  isConnecting: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  bufferValue = 75;

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
  ) { }

  newID = null;
  newCampaign = null;

  offerIDs = [];
  campaigns = [];

  isSelectedAll: boolean = false;

  onSelectAll() {
    this.campaigns.forEach(campaign => {
      campaign.selected = this.isSelectedAll;
    });
  }

  onSelect() {
    if (this.isAllSelected()) {
      this.isSelectedAll = true;
    } else {
      this.isSelectedAll = false;
    }
  }

  isAllSelected() {
    let index = this.campaigns.findIndex(item => {
      return !item.selected;
    })

    return index === -1;
  }

  getOfferIDsFromServer() {
    this.isConnecting = true;
    this.subscription['getOfferIDs'] = this.dataService.getOfferIDs().subscribe(
      res => {
        this.isConnecting = false;
        if (!res) return;
        this.offerIDs = res.ids;
        this.offerIDs.sort((a, b) => {return a - b;});
      }, error => {
        this.isConnecting = false;
        this.toastService.error(error.message);
      }
    )
  }

  getCampaignsFromServer() {
    this.isConnecting = true;
    this.subscription['getCampaigns'] = this.dataService.getCampaigns().subscribe(
      res => {
        this.isConnecting = false;
        if (!res) return;
        this.campaigns = res;
      }, err => {
        this.isConnecting = false;
        this.toastService.error(err.message);
      }
    )
  }

  postOfferIDsToServer() {
    let body = this.offerIDs;
    this.isConnecting = true;
    this.subscription['postOfferIDs'] = this.dataService.postOfferIDs(body).subscribe(
      res => {
        this.isConnecting = false;
      }, err => {
        this.isConnecting = false;
        this.toastService.error(err.message);
      }
    )
  }

  postCampaignsIDsToServer() {
    let body = this.campaigns.map(campaign => {
      let campaignSettings = {};
      campaignSettings[campaign.campaignID] = campaign.selected;
      return campaignSettings;
    });
    this.isConnecting = true;
    this.subscription['postCampaignsIDs'] = this.dataService.postCampaignsIDs(body).subscribe(
      res => {this.isConnecting = false;},
      err => {
        this.isConnecting = false;
        this.toastService.error(err.message);
      }
    )
  }

  addNewID(event) {
    if (event && event.which !== 13 || !this.newID) return;

    let index = this.offerIDs.findIndex(elem => {
      return elem === this.newID;
    });
    if (index < 0) {
      this.offerIDs.push(this.newID);
    }
    this.offerIDs.sort((a, b) => { return a - b; });
    this.newID = null;
    this.postOfferIDsToServer();
  }

  removeID(id) {
    let index = this.offerIDs.findIndex(elem => {
      return elem === id;
    });
    if (index > -1) {
      this.offerIDs.splice(index, 1);
    }
  }

  ngOnInit() {
    this.getOfferIDsFromServer();
    this.getCampaignsFromServer();
  }

  ngOnDestroy() {

  }
}