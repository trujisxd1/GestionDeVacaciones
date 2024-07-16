import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  providers: [DatePipe]
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  paginador: any = {};

  constructor(
    private service: UserService,
    private datepipe: DatePipe,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {}

  addUser(): void {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user && user.id > 0) {
        this.service.update(user).subscribe(userUpdate => {
          if (this.users) {
            this.users = this.users.map(u => u.id === userUpdate.id ? userUpdate : u);
          } else {
            this.users = [userUpdate];
          }

          // Mensaje de depuración
          console.log("Usuarios después de actualizar:", this.users);

          this.router.navigate(['/usuarios'], {
            state: {
              user: this.users,
              paginador: this.paginador
            }
          }).then(() => {
            console.log("Redirección después de actualizar el usuario.");
          });

          Swal.fire({
            title: "USUARIO ACTUALIZADO",
            text: "Actualizado con éxito",
            icon: "success"
          });
        });
      } else {
        this.service.create(user).subscribe(userNew => {
          if (this.users) {
            this.users = [...this.users, userNew];
          } else {
            this.users = [userNew];
          }

          // Mensaje de depuración
          console.log("Usuarios después de crear:", this.users);

          this.router.navigate(['/usuarios'], {
            state: {
              user: this.users,
              paginador: this.paginador
            }
          }).then(() => {
            console.log("Redirección después de crear el usuario.");
          });

          Swal.fire({
            title: "USUARIO CREADO",
            text: "Creado con éxito",
            icon: "success"
          });
        });
      }
    });
  }

  delete(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
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
          this.service.remove(id).subscribe(() => {
            if (this.users) {
              this.users = this.users.filter(user => user.id != id);
            }

            // Mensaje de depuración
            console.log("Usuarios después de eliminar:", this.users);

            this.router.navigate(['/usuarios/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/usuarios'], {
                state: {
                  user: this.users,
                  paginador: this.paginador
                }
              }).then(() => {
                console.log("Redirección después de eliminar el usuario.");
              });
            });

            Swal.fire({
              title: "Borrado con exito!",
              text: "Registro borrado",
              icon: "success"
            });
          });
        }
      });
    });
  }

  ngOnInit(): void {
    this.addUser();
    this.delete();
    this.finUserById();
    this.pageUserEvent();
    this.handlerLogin()
  }

  handlerLogin(){
this.sharingData.hanlerdEmitter.subscribe(({email,password})=>{
  console.log(email)

  this.authService.loginUser({email,password}).subscribe({
    next:response=>{

      const token=response.token
      const payload=this.authService.getPayload(token)

      console.log(payload)
      const user={email:payload.sub}

      const login={
        user,
        isAuth:true,
        isAdmin:payload.isAdmin
      }
      this.authService.token=token
      this.authService.user=login

      this.router.navigate(['/usuarios/page/0'])

    },
    error:error=>{

      if(error.status==401){
        Swal.fire('Error en el login','Username o password invalidos','error')
      }
    }
  })
})
  }

  pageUserEvent() {
    this.sharingData.PageUserEventEmitter.subscribe(pegeable => {
      if (pegeable) {
        this.users = pegeable.user || [];
        this.paginador = pegeable.paginador || {};
      }
    });
  }

  finUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      if (id) {
        const user = this.users.find(user => user.id === id);
        this.sharingData.selectUserEvenEmitter.emit(user);
      }
    });
  }
}
