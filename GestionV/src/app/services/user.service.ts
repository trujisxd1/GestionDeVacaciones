import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Puesto } from '../models/puesto';
import { Cordinacion } from '../models/cordinacion';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private users:User[]=[]
  private puestos:Puesto[]=[]
  private cordinaciones:Cordinacion[]=[]
  constructor(private http:HttpClient) { }

  findAll():Observable<User[]>{

    console.log(this.users)
    return this.http.get('http://localhost:8080/api/v1/listar').pipe(
      map((users:any) => users as User[])


    )
  }

findAllPuesto():Observable<Puesto[]>{

  return this.http.get("http://localhost:8080/api/v1/puestos").pipe(
    map((puestos:any)=> puestos as Puesto[])
  )
}

findAllCordinacion():Observable<Cordinacion[]>{

  return this.http.get("http://localhost:8080/api/v1/cordinaciones/listar").pipe(
    map((cordinaciones:any)=> cordinaciones as Cordinacion[])
  )
}
}
