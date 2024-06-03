import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private users:User[]=[{

    id:1,
    nombre:"gustavo",
    apellidoM:"Martinez",
    apellidoP:"Trujillo",
    email:"gutamvol262@gmail.com",
    password:"12345",
    rfc:"ABGDS",
    fechaDeIngreso:"21/02/2024",
    puesto:"JR",
    cordinacion:"ARG"
  },
  {

    id:2,
    nombre:"Juan",
    apellidoM:"Martinez",
    apellidoP:"Trujillo",
    email:"gutamvol263@gmail.com",
    password:"12345",
    rfc:"ABGDASL",
    fechaDeIngreso:"21/02/2024",
    puesto:"SR",
    cordinacion:"MXT"
  }]
  constructor() { }

  findAll():Observable<User[]>{


    return of(this.users);
  }
}
