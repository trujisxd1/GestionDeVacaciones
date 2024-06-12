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

  user: User = new User();
  puestos: Puesto[] = [];
  cordinaciones: Cordinacion[] = [];
  maxDate: string;
  puiestoId!:number




  constructor(
    private sharingData: SharingDataService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

    // Inicializar user.puesto y user.cordinacion
    this.user.puesto = new Puesto();
    this.user.cordinacion = new Cordinacion();
  }

  ngOnInit(): void {
    this.loadCordinacion();
    this.loadPuestos();

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.userService.findById(id).subscribe(user => {
          this.user = user;


          
        });
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid ) {

      this.puiestoId=this.user.puesto.id
      this.sharingData.newUserEventEmitter.emit(this.user);

      console.log("id puesto ",this.puiestoId)
      console.log("usuario",this.user);

      userForm.reset();
      userForm.resetForm();
    }
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    this.user.puesto = new Puesto(); // Inicializar puesto
    this.user.cordinacion = new Cordinacion(); // Inicializar cordinacion
    userForm.reset();
    userForm.resetForm();
    Swal.fire({
      title: "Formulario limpio",
      text: "Formulario limpiado con éxito",
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
        console.error('Error fetching cordinaciones:', error);
      }
    );
  }
}
