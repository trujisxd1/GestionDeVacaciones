import { Cordinacion } from "./cordinacion"
import { Puesto } from "./puesto"


export class User{

  id:number =0
  nombre!:string
  apellidoM!:string
  apellidoP!:string
  email!:string
  password!:string
  rfc!:string
  fechaDeIngreso!:string
  puesto!: Puesto
  cordinacion!: Cordinacion



}
