import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {


  user:User

  constructor(private sharindata:SharingDataService){

    this.user= new User()
  }

  onSumit(){
    if(!this.user.email || !this.user.password){

      Swal.fire(
        'Error de validacion',
        'Username y password requeridos',
        'error'
      )
    }else{
      this.sharindata.hanlerdEmitter.emit({email:this.user.email,password:this.user.password})
    }
  }
}
