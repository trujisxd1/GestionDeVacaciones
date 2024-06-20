import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { faHouse, faPlane, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {

  vac=faPlane
  plus=faUserPlus

  home=faHouse

  @Input() users:User[]=[]

  @Input() paginador:any={}

}
