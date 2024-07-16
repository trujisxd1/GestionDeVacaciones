import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Puesto } from '../models/puesto';
import { Cordinacion } from '../models/cordinacion';
import { Vacaciones } from '../models/vacaciones';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private users:User[]=[]
  private puestos:Puesto[]=[]
  private cordinaciones:Cordinacion[]=[]

  private url:string='http://localhost:8080/api/v1'
  constructor(private http:HttpClient) { }

  findAll():Observable<User[]>{

    // console.log(this.users)
    return this.http.get('http://localhost:8080/api/v1/listar').pipe(
      map((users:any) => users as User[])


    )
  }
  findAllPageable(page:number):Observable<any>{

    // console.log(this.users)
    return this.http.get<any>(`http://localhost:8080/api/v1/listarPage/${page}`)



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
findById(id:number):Observable<User>{

  return this.http.get<User>("http://localhost:8080/api/v1/buscar/" + id)

}
create(user:User):Observable<User>{

  return this.http.post<User>("http://localhost:8080/api/v1/crear",user)
}

update(user:User):Observable<User>{

  return this.http.put<User>(`http://localhost:8080/api/v1/editar/${user.id}`,user)


}

remove(id:number):Observable<void>{

  return this.http.delete<void>(`http://localhost:8080/api/v1/eliminar/${id}`)
}

findByEmail(email: string): Observable<Vacaciones[]> {
  return this.http.get<Vacaciones[]>(`http://localhost:8080/api/v1/vacaciones/byemail/${email}`);
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
