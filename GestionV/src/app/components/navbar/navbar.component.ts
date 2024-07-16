import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { faCalendarDay, faCalendarPlus, faHouse, faPlane, faR, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {

  vac=faPlane
  plus=faUserPlus
 login=faRightToBracket
  create= faCalendarPlus
  calendar=faCalendarDay

  home=faHouse

  constructor(private auth:AuthService,private route:Router){

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
