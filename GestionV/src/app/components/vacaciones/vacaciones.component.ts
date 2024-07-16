import { Component, OnInit } from '@angular/core';
import { Vacaciones } from '../../models/vacaciones';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';
import { faFilePdf, faPlaneCircleExclamation, faPlaneCircleXmark, faSuitcaseRolling, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginadorComponent } from '../paginador/paginador.component';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [FontAwesomeModule,PaginadorComponent,RouterModule],
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit{

  pageUrl:string='/usuarios/page'
  paginador:any={}
title="Vacaciones"
trash = faPlaneCircleXmark;
edit=faPlaneCircleExclamation
plus=faSuitcaseRolling
pdf=faFilePdf

vacation: Vacaciones[] = [];

constructor(private services: VacacionesServicesService,private router: Router,private sharingData: SharingDataService) { }

ngOnInit(): void {
  this.services.findAll().subscribe(vacaciones => this.vacation = vacaciones);

  console.log(this.vacation)
}

downloadPdf(tipo: string, UsuarioId: number, Vacaciones_id: number): void {
  this.services.downloadPdf(tipo, UsuarioId, Vacaciones_id).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vacaciones_${UsuarioId}_${Vacaciones_id}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  });
}

editvaca(): void {
  this.sharingData.newVacationEmitter.subscribe(vaca => {
    if (vaca && vaca.id > 0) {
      this.services.update(vaca).subscribe(userUpdate => {
        if (this.vacation) {
          this.vacation = this.vacation.map(u => u.id === userUpdate.id ? userUpdate : u);
        } else {
          this.vacation = [userUpdate];
        }

        // Mensaje de depuración
        console.log("Usuarios después de actualizar:", this.vacation);

        this.router.navigate(['/vacaciones'], {

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
      this.services.remove(id).subscribe(() => {
        if (this.vacation) {
          this.vacation = this.vacation.filter(user => user.id != id);
        }

        // Mensaje de depuración
        console.log("Usuarios después de eliminar:", this.vacation);

        this.router.navigate(['/usuarios/create'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vacaciones'], {

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
}
