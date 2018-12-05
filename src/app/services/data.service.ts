import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import 'rxjs/Rx';

import { APIConfig } from '../shared/api.config';
import { MicroService } from "../shared/micro.service";
import { ErrorService } from "../services/error.service";

@Injectable()
export class DataService extends ErrorService {
	private config: APIConfig;

  constructor(
	  private http: HttpClient,
    private ms: MicroService
  ) {
		super();
    this.config = this.ms.loadConfig('data');
  }

  getOffers() {
		return this.http.get(
			this.config['offers']
		)
		.pipe(catchError(this.handleError))
		.map(offers => {
			return offers;
		});
	}
	
	getAllTags() {
		return this.http.get(
			this.config['all-tags']
		)
		.pipe(catchError(this.handleError))
		.map(tags => {
			return tags;
		});
	}

	getFilters() {
		return this.http.get(
			this.config['reportfilters']
		)
		.pipe(catchError(this.handleError))
		.map(filters => {
			return filters;
		});
	}

	getFilter(uuid) {
		return this.http.get(
			this.config['reportfilter'] + '/' + uuid
		)
		.pipe(catchError(this.handleError))
		.map(filter => {
			return filter;
		});
	}

	saveFilter(data) {
		return this.http.post(
			this.config['reportfilter'],
			data
		)
		.pipe(catchError(this.handleError))
		.map(filter => {
			return filter;
		});
	}

  addNewRevenue(param) {
		console.log('params:, ', param);
    return this.http.post(
      this.config['revenue-filters'], 
			param,
			{ responseType: 'text' }
    )
    .pipe(catchError(this.handleError))
    .map(res => {
      return res;
    });
	}
	
	getContracts() {
		return this.http.get(
			this.config['contracts']
		)
		.pipe(catchError(this.handleError))
		.map(res =>{
			return res;
		})
	}

	updateContracts(data) {
		return this.http.put(
			this.config['contracts'],
			data,
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	getPredictions() {
		return this.http.get(
			this.config['settings']
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	putPredictions(data) {
		return this.http.put(
			this.config['settings'],
			data
		)
		.pipe(catchError(this.handleError))
		.map(res=>{
			return res;
		})
	}

	postPredictions(data) {
		return this.http.post(
			this.config['settings'],
			data
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		});
	}

	deletePrediction(uuid) {
		return this.http.delete(
			this.config['settings']+'/'+uuid
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}
	
	getOfferIDs() {
		return this.http.get(
			this.config['offer-ids']
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	getCampaigns() {
		return this.http.get(
			this.config['campaigns']
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	postOfferIDs(data) {
		return this.http.post(
			this.config['offer-ids'],
			data,
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	postCampaignsIDs(data) {
		return this.http.post(
			this.config['campaigns'],
			data
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}
	
	postLeadsRecheck(data) {
		return this.http.post(
			this.config['leads-recheck'],
			data,
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}

	getLeadsRecheck() {
		return this.http.get(
			this.config['leads-recheck']
		)
		.pipe(catchError(this.handleError))
		.map(res=>{
			return res;
		})
	}

	postHasOffers(data) {
		return this.http.post(
			this.config['has-offers-recheck'] + '/',
			data,
		)
		.pipe(catchError(this.handleError))
		.map(res => {
			return res;
		})
	}
}