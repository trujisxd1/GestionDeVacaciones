import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'usuarios',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',

})
export class UserComponent {

  @Input() users:User[]=[]
}
