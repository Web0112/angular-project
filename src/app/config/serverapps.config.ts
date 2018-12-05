export class ServerApps {
	environment: string = 'local'; //value could be either 'live' or local'
	appsHostedOn: string = 'leads-dashboard-staging.herokuapp.com';
	// injectorHostedOn = {
	//     ipaddress: 'int.gain250.com', 
	//     port: '8090'
	// };
	masterUrl: string = 'https://' + this.appsHostedOn;
	ckeditor = {
		plugins: ['personalizertwo','personalizer','injectorlinks'], 
		path:{
			local: '/assets/js/ckeditor/plugins/', 
			live: '/app/assets/js/ckeditor/plugins/'
		}
	};
	
	auth = {
		api: {
			auth: ['signin'] 
		}
	};

	data = { 
		api: {
			data: [
				'offers', 
				'all-tags', 
				'report/filters', 
				'report/filter',
				'notifications',
				'notification',
				'users',
				'revenue-filters',
				'contracts',
				'settings',
				'offer-ids',
				'campaigns',
				'leads-recheck',
				'has-offers-recheck'
			]
		}
	};

	reports = { 
		api: {
			reports: [
				'main',
			]
		}
	};

	offers = {
		api: {
			offers: ['offers']
		}
	}
}