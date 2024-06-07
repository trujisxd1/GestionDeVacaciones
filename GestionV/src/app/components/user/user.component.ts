import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'usuarios',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',

})
export class UserComponent {
  title: string = 'Listado de Usuarios';

   users:User[]=[]


  onRemove(id: number):void {

    this.sharingData.idUserEventEmitter.emit(id)
  }

  onSelectedUser(user:User):void{

    this.router.navigate(['/usuarios/edit',user.id], {state:{user}})
  }

  constructor(private router:Router, private service:UserService, private sharingData:SharingDataService){
if(this.router.getCurrentNavigation()?.extras.state){

  this.users=this.router.getCurrentNavigation()?.extras.state!['users']

}else{
  this.service.findAll().subscribe(users => this.users=users)
}

  }
}
