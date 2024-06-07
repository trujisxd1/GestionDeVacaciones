import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Puesto } from '../../models/puesto';
import { UserService } from '../../services/user.service';
import { Cordinacion } from '../../models/cordinacion';

@Component({
  selector: 'form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',

})
export class FormUserComponent implements OnInit {

  user:User;
  puestos: Puesto[] = [];
  cordinaciones:Cordinacion[]=[]
maxDate: string;



constructor(private sharingData:SharingDataService, private route:ActivatedRoute, private userService:UserService){

  this.user= new User()
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = today.getFullYear();
  this.maxDate = `${year}-${month}-${day}`
  this.user = new User()


}
  ngOnInit(): void {

    this.loadCordinacion()
    this.loadPuestos()
    this.sharingData.selectUserEvenEmitter.subscribe(user=>this.user=user)

  this.route.paramMap.subscribe(params => {

    const id: number=+(params.get('id')|| '0')

    if(id>0){
      this.sharingData.findUserByIdEventEmitter.emit(id)
    }
  })
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
loadPuestos(): void {
  this.userService.findAllPuesto().subscribe(
    (data: Puesto[]) => {
      this.puestos = data;
    },
    (error) => {
      console.error('Error fetching puestos:', error);
    }
  );
}

loadCordinacion(): void {
  this.userService.findAllCordinacion().subscribe(
    (data: Cordinacion[]) => {
      this.cordinaciones = data;
    },
    (error) => {
      console.error('Error fetching puestos:', error);
    }
  );
}
}
