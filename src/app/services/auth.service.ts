import { EventEmitter } from "@angular/core";
import { fail } from "assert";

export class AuthService {
	userIsLoggedIn = new EventEmitter<boolean>();
	
	storeAuthData(authData) {
		if( authData ){
				localStorage.setItem('AuthData', JSON.stringify(authData));
		}
	}

	removeAuthData() {
		localStorage.removeItem('AuthData');
	}

	destroyAuthData() {
		localStorage.removeItem('AuthData');
	}
	
	getToken(): string {
		const userData = this.isAuthenticated();
		return ( userData ) ? userData.accessToken : null;
	}

	isAuthenticated(){
		var userData = localStorage.getItem('AuthData');
		if( userData ){
			return JSON.parse(userData);
		}else{
			return null;
		}
	}
}