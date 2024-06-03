import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent,FormUserComponent],
  templateUrl: './user-app.component.html',
  providers: [DatePipe]

})
export class UserAppComponent implements OnInit{

  title:string ='Listado de Usuarios'

  users:User[]=[]

  constructor(private service:UserService, private datepipe:DatePipe){


  }

  addUser(user:User){



    user.fechaDeIngreso=this.formatDate(user.fechaDeIngreso)
  this.users=[... this.users,{...user}]
  }
  ngOnInit(): void {

    this.service.findAll().subscribe(users=>this.users=users)

  }
  formatDate(date: string | null): string {
    if (date) {
      const formattedDate = this.datepipe.transform(date, 'dd/MM/yyyy');
      return formattedDate ? formattedDate : date;
    }
    return '';
  }
}
