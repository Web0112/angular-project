import { Injectable } from '@angular/core';
import { ServerApps } from '../config/serverapps.config';
import { APIConfig } from './api.config';

@Injectable()
export class MicroService {
    
    constructor(private srvApps: ServerApps) { }

    loadConfig( app: string ): APIConfig {
        return new APIConfig(this.srvApps.appsHostedOn, this.fetchNestedConfig(this.srvApps, app));
    }

    loadObject( object: string ) {
        return this.srvApps[object];
    }

    fetchNestedConfig(obj, prop) {
        if(typeof obj === 'undefined') {
            return false;
        }
        var _index = prop.indexOf('.')
        if(_index > -1) {
            return this.fetchNestedConfig(obj[prop.substring(0, _index)], prop.substr(_index + 1));
        }
        return obj[prop];
    }

}