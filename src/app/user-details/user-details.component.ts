import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	userID : string;
	userInfo : UserModel;
	repoList : any;
	followersList : any;

	constructor(private _actRoute: ActivatedRoute, private _usrService: UserInfoService) {
	}

	ngOnInit() {
		this._actRoute.params.subscribe( params => {
			this.userID = params.userID;
			this.getUserInfo();
			this.getRepo();
			this.getFollowers();
		});	
	}

	getRepo(){
		this._usrService.getRepositoryList(this.userID).subscribe(
			data => {				
				this.repoList = data;
			},
			err => {
				console.log(err);
			}
		);
	}

	getFollowers(){
		this._usrService.getFollowersList(this.userID).subscribe(
			data => {				
				this.followersList = data;
			},
			err => {
				console.log(err);
			}
		);
	}

	getUserInfo(){
		this._usrService.getUserDetails(this.userID).subscribe(
			data => {
				this.userInfo = data;
			},
			err => {
				console.log(err);
			}
		);
	}

}
