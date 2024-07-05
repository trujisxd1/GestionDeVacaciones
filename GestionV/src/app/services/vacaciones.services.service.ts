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

    // console.log(this.vacaciones)
    return this.http.get('http://localhost:8080/api/v1/vacaciones/all').pipe(
      map((vacaciones:any) => vacaciones as Vacaciones[])


    )
  }

  create( email:string,vacaciones:Vacaciones):Observable<Vacaciones>{

  return this.http.post<Vacaciones>(`http://localhost:8080/api/v1/vacaciones/crear/${email}`,vacaciones)
}
downloadPdf(tipo: string, UsuarioId: number, Vacaciones_id: number): Observable<Blob> {
  const params = {
    tipo: tipo,
    UsuarioId: UsuarioId.toString(),
    Vacaciones_id: Vacaciones_id.toString()
  };
  return this.http.get(`http://localhost:8080/report/vacaciones/download`, { params: params, responseType: 'blob' });
}
}
