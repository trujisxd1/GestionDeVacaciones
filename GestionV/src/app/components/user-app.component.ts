import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(private service: UserService, private datepipe: DatePipe,private sharingData:SharingDataService, private router:Router) {

  }

  addUser(): void {

    this.sharingData.newUserEventEmitter.subscribe(user=>{

      if (user.id > 0) {

        this.service.update(user).subscribe(userUpdate =>{
          this.users = this.users.map(u => u.id === userUpdate.id ? { ...userUpdate, } : u);


          this.router.navigate(['/usuarios'])
          // console.log("crear usuario usuer", user)
          // console.log("crear usuario usuernew", userUpdate)
        })

        Swal.fire({
          title: "USUARIO ACTUALIZADO",
          text: "Actualizado con éxito",
          icon: "success"
        });
      } else {

        this.service.create(user).subscribe(userNew =>{

          this.users = [...this.users, { ...userNew }];
          this.router.navigate(['/usuarios'])


        })

        Swal.fire({
          title: "USUARIO CREADO",
          text: "Creado con éxito",
          icon: "success"
        });
      }

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

          this.service.remove(id).subscribe(()=>{
             this.users = this.users.filter(user => user.id != id);
          this.router.navigate(['/usuarios/create'],{skipLocationChange:true}).then(()=>{
            this.router.navigate(['/usuarios'])
          })
          })


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
    this.finUserById()

  }

  finUserById(){

    this.sharingData.findUserByIdEventEmitter.subscribe(id =>{

      const user= this.users.find(user=>user.id==id)
      this.sharingData.selectUserEvenEmitter.emit(user)
    })


  }







}
