import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent {

  user:User;
maxDate: string;



constructor(private sharingData:SharingDataService, private router:Router){

  this.user= new User()
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = today.getFullYear();
  this.maxDate = `${year}-${month}-${day}`

  if(this.router.getCurrentNavigation()?.extras.state){

    this.user=this.router.getCurrentNavigation()?.extras.state!['user']

  }else{
    this.user = new User()
  }
}

onSubmit(userForm:NgForm):void{

  if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user)

  }

  userForm.reset()
  userForm.resetForm()
}
onClear(userForm:NgForm):void{
  this.user= new User()

  userForm.reset()
  userForm.resetForm()

  Swal.fire({
    title: "Formulario limpio",
    text: "success",
    icon: "success"
  });
}

}
