import { Component, OnInit } from '@angular/core';
import { Vacaciones } from '../../models/vacaciones';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { faCalendarXmark, faFilePdf, faPenToSquare, faPlaneCircleExclamation, faPlaneCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mis-vacaciones',
  standalone: true,
  imports: [FontAwesomeModule,RouterModule],
  templateUrl: './mis-vacaciones.component.html',
  styleUrl: './mis-vacaciones.component.css'
})
export class MisVacacionesComponent implements OnInit {
  vacaciones: any[] = [];

  vacacioness: Vacaciones = new Vacaciones();

  email: any = this.auth.getUserEmail(); // Correo electrónico estático por ahora
  pdf=faFilePdf
  edit=faPenToSquare
  trash = faCalendarXmark;
  isEdit: boolean = false;
  constructor(private vacacionesServices: VacacionesServicesService,
    private sharingData:SharingDataService,private service: UserService,private router: Router,
    private route: ActivatedRoute,private auth:AuthService) { }

  ngOnInit(): void {
    this.obtenerVacaciones();
    console.log(this.vacaciones)

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vacacionesServices.findById(Number(id)).subscribe(vacaciones => {
        this.vacacioness = vacaciones;

      });
    }
  }


  obtenerVacaciones(): void {
    this.service.findByEmail(this.email).subscribe(
      data => {
        this.vacaciones = data;
      },
      error => {
        console.error('Error al obtener vacaciones', error);
      }
    );
  }

  downloadPdf(tipo: string, UsuarioId: number, Vacaciones_id: number): void {
    this.service.downloadPdf(tipo, UsuarioId, Vacaciones_id).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vacaciones_${UsuarioId}_${Vacaciones_id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
  onRemove(id:number){
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
        this.vacacionesServices.remove(id).subscribe(() => {
          if (this.vacaciones) {
            this.vacaciones = this.vacaciones.filter(user => user.id != id);
          }

          // Mensaje de depuración
          console.log("Usuarios después de eliminar:", this.vacaciones);

          this.router.navigate(['/vacaciones'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/vacaciones/misVacaciones'], {

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
  }

  editvaca(): void {
    this.sharingData.newVacationEmitter.subscribe(vaca => {
      if (vaca && vaca.id > 0) {
        this.vacacionesServices.update(vaca).subscribe(userUpdate => {
          if (this.vacaciones) {
            this.vacaciones = this.vacaciones.map(u => u.id === userUpdate.id ? userUpdate : u);
          } else {
            this.vacaciones = [userUpdate];
          }

          // Mensaje de depuración
          console.log("Usuarios después de actualizar:");

          this.router.navigate(['/misVacaciones'], {

          }).then(() => {
            console.log("Redirección después de actualizar el usuario.");
          });

          Swal.fire({
            title: "USUARIO ACTUALIZADO",
            text: "Actualizado con éxito",
            icon: "success"
          });
        });
      }
    });
  }
}
