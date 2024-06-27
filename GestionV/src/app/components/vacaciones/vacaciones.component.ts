import { Component, OnInit } from '@angular/core';
import { Vacaciones } from '../../models/vacaciones';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';
import { faFilePdf, faPlaneCircleExclamation, faPlaneCircleXmark, faSuitcaseRolling, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginadorComponent } from '../paginador/paginador.component';


@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [FontAwesomeModule,PaginadorComponent],
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

vacation:Vacaciones[]=[]

constructor(private services:VacacionesServicesService){

}
ngOnInit(): void {
this.services.findAll().subscribe(vacaciones => this.vacation=vacaciones)
console.log(this.vacation)
}
}
