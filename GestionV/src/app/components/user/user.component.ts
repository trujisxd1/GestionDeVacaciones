import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';


@Component({
  selector: 'usuarios',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',

})
export class UserComponent {

  @Input() users:User[]=[]

 @Output() idUserEventEmitter = new EventEmitter()

 @Output() selectUserEmitter = new EventEmitter()
  onRemove(id: number):void {

    this.idUserEventEmitter.emit(id)
  }

  onSelectedUser(user:User):void{
    this.selectUserEmitter.emit(user)
  }

}
