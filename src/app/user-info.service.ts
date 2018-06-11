import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserModel } from './user-model';

@Injectable()
export class UserInfoService {
	usersApiURL : string;	

	constructor(private _http: HttpClient) { 
		this.usersApiURL  = 'https://api.github.com/users/';		
	}

	getUserDetails(userName) {		
		return this._http.get<UserModel>( this.usersApiURL + userName );
	}

	getRepositoryList(userName) {
		return this._http.get( this.usersApiURL + userName + '/repos');
	}

	getFollowersList(userName){
		return this._http.get( this.usersApiURL + userName + '/followers');
	}

}
