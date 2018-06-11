import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../user-info.service';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

	user : UserModel;
	usersList : Array<UserModel> = [];
	isExists : boolean = true;
	errorMsg : string;

	constructor(private _usrService: UserInfoService) {}

	ngOnInit() {
		let lcl_storage = window.localStorage.getItem('gitUsers');
		if(lcl_storage != null) {
			let objArray = JSON.parse(lcl_storage);
			this.usersList = [...objArray];
		}
	}

	onClickAdd(request){
		let form = request.form,
			usrName = request.value.userName;

		if( this.dupCheck(usrName) ) {
			this._usrService.getUserDetails(usrName).subscribe( 
				res => {		
					this.isExists = true;		
					this.user = {...res};				
					this.usersList.push(this.user);	
									
					window.localStorage.setItem( 'gitUsers', JSON.stringify(this.usersList) );
					form.reset();
				},
				err => { 
					if(err.status == 404){
						this.isExists = false;
						this.errorMsg = "User is not found";
					} else {
						console.log(err);
					}
				}
			);
		}
		else {
			this.isExists = false;
			this.errorMsg = "User is already exists";
		}
	}

	dupCheck(usrName) {		
		let res = this.usersList.findIndex( (user:any) => user.login.toLowerCase() == usrName.toLowerCase() );
		return res > -1 ? false: true;
	}

	resetFlag(){
		this.isExists = true;
	}
}
