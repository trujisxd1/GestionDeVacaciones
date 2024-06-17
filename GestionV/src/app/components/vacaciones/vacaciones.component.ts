import { Component, OnInit } from '@angular/core';
import { Vacaciones } from '../../models/vacaciones';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';


@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [],
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit{


title="Vacaciones"

vacation:Vacaciones[]=[]

constructor(private services:VacacionesServicesService){

}
ngOnInit(): void {
this.services.findAll().subscribe(vacaciones => this.vacation=vacaciones)
}
}
