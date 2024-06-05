import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent {

  @Input()user:User;
maxDate: string;

@Output() openEventEmitter= new EventEmitter()
@Output() newUserEventEmitter:EventEmitter <User> =new EventEmitter()
constructor(){

  this.user= new User()
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = today.getFullYear();
  this.maxDate = `${year}-${month}-${day}`
}

onSubmit(userForm:NgForm):void{

  if(userForm.valid){
      this.newUserEventEmitter.emit(this.user)

  }

  userForm.reset()
  userForm.resetForm()
}
onClear(userForm:NgForm):void{
  this.user= new User()

  userForm.reset()
  userForm.resetForm()
}
onOpen(){
  this.openEventEmitter.emit()
}
}
