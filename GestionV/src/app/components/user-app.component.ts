import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent,FormUserComponent],
  templateUrl: './user-app.component.html',

})
export class UserAppComponent implements OnInit{

  title:string ='Listado de Usuarios'

  users:User[]=[]

  constructor(private service:UserService){


  }

  addUser(user:User){

  this.users=[... this.users,{...user}]
  }
  ngOnInit(): void {

    this.service.findAll().subscribe(users=>this.users=users)

  }
}
