import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

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
  userSelected:User;

  constructor(private service:UserService, private datepipe:DatePipe){

    this.userSelected= new User()

  }

  addUser(user:User){



    user.fechaDeIngreso=this.formatDate(user.fechaDeIngreso)
  this.users=[... this.users,{...user}]

  Swal.fire({
    title: "USUARIO CREADO",
    text: "Creado con exito",
    icon: "success"
  });
  }

  delete(id:number):void{

    this.users=this.users.filter(user => user.id !=id);

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

  setSelectUser(userRow:User):void{
this.userSelected={... userRow}
  }
}
