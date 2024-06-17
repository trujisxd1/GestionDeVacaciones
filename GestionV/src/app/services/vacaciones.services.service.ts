import { Injectable } from '@angular/core';
import { Vacaciones } from '../models/vacaciones';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacacionesServicesService {

  vacaciones:Vacaciones[]=[]
  constructor(private http:HttpClient) { }

  findAll():Observable<Vacaciones[]>{

    console.log(this.vacaciones)
    return this.http.get('http://localhost:8080/api/v1/vacaciones/listar').pipe(
      map((vacaciones:any) => vacaciones as Vacaciones[])


    )
  }


}
