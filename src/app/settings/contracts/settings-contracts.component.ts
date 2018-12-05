import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-settings-contracts',
  templateUrl: './settings-contracts.component.html',
  styleUrls: ['./settings-contracts.component.scss'],
  providers:[ DataService, ToastService],
})

export class SettingsContractsComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];

  isConnecting: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  bufferValue = 75;

  contracts = [];
  changedContracts = [];

  constructor(
    private dataService: DataService,
    private toastService: ToastService,
  ) { }

  getContractsFromServer() {
    this.isConnecting = true;
    this.subscription['getContracts'] = this.dataService.getContracts().subscribe(response => {
      if (!response) return;
      console.log("this.contracts : ", response);
      this.contracts = response;
      this.isConnecting = false;
      this.toastService.success("Load contracts successfully");
    }, error => {
      this.toastService.error(error.message);
      this.isConnecting = false;
    });
  }

  updateContracts() {
    let body = [];
    this.changedContracts.forEach(changedContract => {
      this.contracts.forEach(contract => {
        if (contract.contractID === changedContract) {
          body.push(contract);
        }
      });
    });
    console.log("body: ", body);
    this.subscription['updateContracts'] = this.dataService.updateContracts(body).subscribe(
      response => { 
        this.toastService.success("Save Contract Successfully");
      },
      error => {
        this.toastService.error(error.message);
    });
  }

  addToChanged(event, id) {
    console.log("event: ", event);
    console.log("contract.type: ", this.contracts[id]);
    let index = this.changedContracts.findIndex(elem => {
      return elem === id;
    });
    if (index === -1) {
      this.changedContracts.push(id);
    }
  }

  addToChangedType(event, id, type) {
    console.log("event: ", event);
    console.log("contrac.id ", id);
    console.log("contract type ", type);
    let index = this.changedContracts.findIndex(elem => {
      return elem === id;
    });
    if (index === -1) {
      this.changedContracts.push(id);
    }
    let ind = this.contracts.findIndex(elem => {
      return elem.contractID === id;
    });

    if (ind !== -1) {
      console.log("ind: ", ind);
      console.log("this.contacts[ind]: ", this.contracts[ind].type);
      this.contracts[ind].type = event.value;
    }
    console.log("this.contacts: ", this.contracts);
  }

  ngOnInit() {
    this.getContractsFromServer();
  }

  ngOnDestroy() {

  }
}