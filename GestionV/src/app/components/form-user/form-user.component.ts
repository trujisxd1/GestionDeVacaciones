import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent {

user:User;

@Output() newUserEventEmitter:EventEmitter <User> =new EventEmitter()
constructor(){

  this.user= new User()
}

onSubmit(userForm:NgForm):void{

  if(userForm.valid){
      this.newUserEventEmitter.emit(this.user)
  console.log(this.user)
  }

  userForm.reset()
  userForm.resetForm()
}
}
