import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { faUserPlus,faUserXmark,faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginadorComponent } from '../paginador/paginador.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'usuarios',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule,PaginadorComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.css'


})
export class UserComponent implements OnInit{
  title: string = 'Listado de Usuarios';

   users:User[]=[]
   pageUrl:string='/usuarios/page'
   paginador:any={}
   trash = faUserXmark;
   edit=faUserPen
   plus=faUserPlus

  onRemove(id: number):void {

    this.sharingData.idUserEventEmitter.emit(id)
  }

  onSelectedUser(user:User):void{

    this.router.navigate(['/usuarios/edit',user.id])
  }

  constructor(private router:Router,
     private service:UserService,
      private sharingData:SharingDataService
      ,private route:ActivatedRoute,private auth:AuthService

      ){

        if(this.router.getCurrentNavigation()?.extras.state){
          this.users=this.router.getCurrentNavigation()?.extras.state!['users']
          this.users=this.router.getCurrentNavigation()?.extras.state!['paginador']
        }
  }
  get admin(){
    return this.auth.isAdmin()
  }
  ngOnInit(): void {

    // if(this.users==undefined || this.users.length==0){

    //   this.service.findAll().subscribe(users => this.users=users)
    // }

    this.route.paramMap.subscribe(params=>{
      const page=+(params.get('page') || '0')
      this.service.findAllPageable(page).subscribe(pageable =>
        {
          this.users = pageable.content as User[]
          this.paginador=pageable
          this.sharingData.PageUserEventEmitter.emit({users:this.users,paginador:this.paginador})
        });

    })
  }
}
