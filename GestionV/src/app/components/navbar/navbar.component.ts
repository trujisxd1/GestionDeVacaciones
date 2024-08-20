import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { faCalendarDay, faCalendarPlus, faHouse, faPlane, faR, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Vacaciones } from '../../models/vacaciones';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent implements OnInit{

  diasre?:Vacaciones
  vac=faPlane
  plus=faUserPlus
 login=faRightToBracket
  create= faCalendarPlus
  calendar=faCalendarDay
  email: any = this.auth.getUserEmail();
  vacaciones: Vacaciones[] = [];

  vacacioness: Vacaciones = new Vacaciones();
  home=faHouse

  constructor(private auth:AuthService,private route:Router,private service: UserService,private activatedRouter:ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.activatedRouter.params.pipe(

      switchMap(({id})=>this.service.diasRestantes(this.email))
    ).subscribe(diasre=>{



        this.diasre=diasre

        console.log({diasre})
          return
    })


  }



  get loginU(){
return this.auth.user
  }

  get admin(){
    return this.auth.isAdmin()
  }

  hanlerLogout(){
    this.auth.logout()
    this.route.navigate(['/login'])
  }
  @Input() users:User[]=[]

  @Input() paginador:any={}




}
