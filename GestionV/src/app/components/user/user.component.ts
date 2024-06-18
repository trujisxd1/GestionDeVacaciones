import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { faUserPlus,faUserXmark,faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'usuarios',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './user.component.html',
  styleUrl: './user.css'


})
export class UserComponent implements OnInit{
  title: string = 'Listado de Usuarios';

   users:User[]=[]
   trash = faUserXmark;
   edit=faUserPen
   plus=faUserPlus

  onRemove(id: number):void {

    this.sharingData.idUserEventEmitter.emit(id)
  }

  onSelectedUser(user:User):void{

    this.router.navigate(['/usuarios/edit',user.id])
  }

  constructor(private router:Router, private service:UserService, private sharingData:SharingDataService){


  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users=users)
  }
}
