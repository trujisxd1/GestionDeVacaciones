import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vacaciones } from '../../models/vacaciones';
import Swal from 'sweetalert2';
import { diasSolicitados, periodo, statusreport } from '../data/vacacionesData';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-vacation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-vacation.component.html',
  styleUrl: './form-vacation.component.css'
})
export class FormVacationComponent implements OnInit{

  vacaciones: Vacaciones= new Vacaciones()

  periodoV=periodo

  diasV=diasSolicitados

  estados=statusreport
  minDate: string;

  users:User[]=[]
  selectedUserEmail!: string;




  constructor(private userService:UserService, private vacacionesServices:VacacionesServicesService, private router: Router){
    const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
const year = today.getFullYear();
this.minDate = `${year}-${month}-${day}`;

  }
  ngOnInit(): void {

    this.loadpersonas()
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      if (!this.selectedUserEmail) {
        Swal.fire({
          title: "Error",
          text: "Por favor selecciona un usuario.",
          icon: "error"
        });
        return;
      }

      this.vacacionesServices.create(this.selectedUserEmail, this.vacaciones).subscribe(
        response => {
          Swal.fire({
            title: "Éxito",
            text: "Creado con exito", // Aquí puedes mostrar el mensaje desde la respuesta JSON
            icon: "success"
          });
          this.router.navigate(['/vacaciones']);
          userForm.reset();
          userForm.resetForm();
        },
        error => {
          console.error('Error al enviar la solicitud de vacaciones:', error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al enviar la solicitud",
            icon: "error"
          });
        }
      );
    }
  }
  onClear(userForm: NgForm): void {

    userForm.reset();
    userForm.resetForm();
    Swal.fire({
      title: "Formulario limpio",
      text: "Formulario limpiado con éxito",
      icon: "success"
    });
  }
  loadpersonas (): void {
    this.userService.findAll().subscribe(
      (data: User[]) => {
        this.users = data;

        console.log(data)
      },
      (error) => {
        console.error('Error fetching puestos:', error);
      }
    );
  }

}
