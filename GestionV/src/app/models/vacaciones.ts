import { User } from "./user"


export class Vacaciones
{

  id!:number
  fechaInicio!:string
  fechaFin!:string
  estado!:string
  periodo!:string
  diasSolicitados!:number
  diasRestantes!:number
  user!:User

}
