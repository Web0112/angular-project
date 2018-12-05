import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-settings-prediction',
    templateUrl: './settings-prediction.component.html',
    styleUrls: ['./settings-prediction.component.scss'],
    providers:[ DataService, ToastService ],
})

export class SettingsPredictionComponent implements OnInit, OnDestroy {

    isConnecting: boolean = false;
    color = 'primary';
    mode = 'indeterminate';
    value = 30;
    bufferValue = 75;

    subscription: Subscription[] = [];

    fields = [
        {
            label: 'Value',
            name: 'value',
        },
        {
            label: 'Method 1 Factor',
            name: 'method1Factor',
        },
        {
            label: 'Method 2 Factor 1 Day',
            name: 'method2Factor1Day',
        },
        {
            label: 'Method 2 Factor 2 Day',
            name: 'method2Factor2Day',
        },
        {
            label: 'Method 2 Factor 7 Day',
            name: 'method2Factor7Day',
        },
    ];

    subidFactors = [{
        method1Factor: 0.25,
        method2Factor1Day: 2.5,
        method2Factor2Day: 2,
        method2Factor7Day: 1.33,
        subid: 'Default',
        subid2: null,
        subid3: null,
        subid4: null,
        subid5: null,
        uuid: '',
        value: 1400,
    }];

    newSubid = {
        subid: null,
        method1Factor: null,
        value: null,
        method2Factor1Day: null,
        method2Factor2Day: null,
        method2Factor7Day: null,
    };

    constructor(
        private dataService: DataService,
        private toastService: ToastService,
    ) { }

    onUpdateButtonClick() {
        this.putDataToServer();
    }

    onResetButtonClick() {
        this.fields.forEach(elem => {
            elem.name = '';
        })
    }

    getDataFromServer() {
        this.isConnecting = true;
        this.subscription['getPredictions'] = this.dataService.getPredictions().subscribe(
            response => {
                this.isConnecting = false;
                if (!response) return;
                console.log("getDataFromServer: ", response);
                this.setSubidFactors(response);
            }, error => {
                this.isConnecting = false;
                this.toastService.error(error.message);
            }
        );
    }

    putDataToServer() {
        let body = this.subidFactors;
        this.isConnecting = true;
        this.subscription['putPredictions'] = this.dataService.putPredictions(body).subscribe(
            response => {
                this.isConnecting = false;
                if (response) {
                    this.toastService.success('Settings are saved');
                    this.setSubidFactors(response);
                }
            }
        )
    }

    postSubidToServer(newSubid) {
        if (!newSubid.subid) return;
        let body = newSubid;
        this.isConnecting = true;
        this.subscription['postPredictions'] = this.dataService.postPredictions(body).subscribe(
            response => {
                this.isConnecting = false;
                if (!response) return;
                this.toastService.success('Settings are saved');
                this.subidFactors.push(response);
                console.log("postSubidToServer: ", response);
                // this.subidFactors.sort(function (a, b) {
                //     if (a === 'Default') return 1;
                //     if (b === 'Default') return -1;
                //     return  (a.subid - b.subid) ||
                //             (a.subid2 - b.subid2) ||
                //             (a.subid4 - b.subid4) ||
                //             (a.subid5 - b.subid5) ||
                //             (a.subid6 - b.subid6);

                // });
                for (let f in newSubid) {
                    this.newSubid[f] = null;
                }
            }, error => {
                this.isConnecting = false;
                this.toastService.error(error.message);
            }
        )
    }

    addNewID(event) {
        document.getElementById("id-addBtn").classList.remove('active');
        if (event && event.which !== 13 || !this.newSubid.subid) return;

        this.postSubidToServer(this.newSubid);
    }

    removeID(uuid) {
        this.isConnecting = true;
        this.subscription['deletePrediction'] = this.dataService.deletePrediction(uuid).subscribe(
            response => {
                this.isConnecting = false;
                if (response) {
                    let index = this.subidFactors.findIndex(item => {
                        return item.uuid === response.uuid;
                    })
                    this.subidFactors.splice(index, 1);
                }
            }, error => {
                this.isConnecting = false;
                this.toastService.error(error.message);
            }
        )
    }

    setSubidFactors(data) {
        if (data.length) this.subidFactors = data;
        let index = this.subidFactors.findIndex(item => {
            return item.subid === 'Default';
        });
        let first = this.subidFactors[0];
        this.subidFactors[0] = this.subidFactors[index];
        this.subidFactors[index] = first;

        console.log("subidFactors: ", this.subidFactors);
        // this.subidFactors.sort(function(a, b) {
        //     if (a === 'Default') return 1;
        //     if (b === 'Default') return -1;
        //     return a.subid - b.subid;
        // });
    }

    ngOnInit() {
        this.getDataFromServer();
    }

    ngOnDestroy() {

    }
}