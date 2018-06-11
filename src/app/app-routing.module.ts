import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [  
   { path:'', component:AddUsersComponent, pathMatch:'full'},
   { path:'user/:userID', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
