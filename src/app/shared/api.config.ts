export class APIConfig {
	constructor(host, app){
		let url = 'https://' + host;
		if (app.port) {
			url += ':' + app.port;
		}
		if( app.api ){
			for(let i in app.api){
				for(let k in app.api[i]){
					let theKey = ( app.api[i][k].indexOf('/') !== -1 ) ? app.api[i][k].replace(/\//g, '') : app.api[i][k];
					if (i === 'auth') {
						this[theKey] = url + '/' + app.api[i][k];
					} else if (i === 'data') {
						this[theKey] = url + '/v1/' + app.api[i][k];
					} else {
						this[theKey] = url + '/v1/' + i + '/' + app.api[i][k];
					}
				}
			}
		}
		return this;
	}
}