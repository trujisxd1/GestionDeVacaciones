import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './user-app.component.html',
  providers: [DatePipe]
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  userSelected: User;

  constructor(private service: UserService, private datepipe: DatePipe,private sharingData:SharingDataService) {
    this.userSelected = new User();
  }

  addUser(): void {

    this.sharingData.newUserEventEmitter.subscribe(user=>{

      if (user.id > 0) {
        this.users = this.users.map(u => u.id === user.id ? { ...user, } : u);
        Swal.fire({
          title: "USUARIO ACTUALIZADO",
          text: "Actualizado con éxito",
          icon: "success"
        });
      } else {

        this.users = [...this.users, { ...user }];
        Swal.fire({
          title: "USUARIO CREADO",
          text: "Creado con éxito",
          icon: "success"
        });
      }
      this.userSelected = new User();
    })

  }

  delete(): void {

    this.sharingData.idUserEventEmitter.subscribe(id =>{
      Swal.fire({
        title: "Estas seguro de eliminar?",
        text: "No podras revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id !== id);
          Swal.fire({
            title: "Borrado con exito!",
            text: "Registro borrado",
            icon: "success"
          });
        }
      });

    })

  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser()
    this.delete()
    this.setSelectUser()
  }



  setSelectUser(): void {

    this.sharingData.selectUserEmitter.subscribe(userRow=>{

      this.userSelected = { ...userRow };
    })

    }



}
