import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import 'rxjs/Rx';

import { APIConfig } from '../shared/api.config';
import { MicroService } from "../shared/micro.service";
import { ErrorService } from "../services/error.service";

@Injectable()
export class JobsService extends ErrorService {
	private config: APIConfig;

	constructor(
		private http: HttpClient,
		private ms: MicroService
	) {
		super();
		this.config = this.ms.loadConfig('job');
	}

	getJobStatus(jobId) {
		return this.http.get(this.config['get'] + '?id=' + jobId).pipe(catchError(this.handleError)).map(res => {
			return res;
		});
	}
}
