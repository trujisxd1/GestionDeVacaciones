import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vacaciones } from '../../models/vacaciones';
import Swal from 'sweetalert2';
import { diasSolicitados, periodo, statusreport } from '../data/vacacionesData';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { VacacionesServicesService } from '../../services/vacaciones.services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-vacation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-vacation.component.html',
  styleUrls: ['./form-vacation.component.css']
})
export class FormVacationComponent implements OnInit {

  vacaciones: Vacaciones = new Vacaciones();
  periodoV = periodo;
  diasV = diasSolicitados;
  estados = statusreport;
  minDate: string;
  users: User[] = [];
  selectedUserEmail!: any ;
  isEdit: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private vacacionesServices: VacacionesServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private auth: AuthService
  ) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }
  get admin(){
    return this.auth.isAdmin()
  }

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    this.loadPersonas();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.vacacionesServices.findById(Number(id)).subscribe(vacaciones => {
        this.vacaciones = vacaciones;
      });
    } else if (!this.isAdmin) {
      // Set the current user's email if not an admin
      this.selectedUserEmail = this.auth.getUserEmail();
    }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      if (this.isEdit) {
        this.vacacionesServices.update(this.vacaciones).subscribe(response => {
          Swal.fire({
            title: "Éxito",
            text: "Actualizado con éxito",
            icon: "success"
          });
          this.router.navigate(['/vacaciones/misVacaciones']);
        });
      } else {
        if (!this.selectedUserEmail) {
          Swal.fire({
            title: "Error",
            text: "Por favor selecciona un usuario.",
            icon: "error"
          });
          return;
        }
        this.vacacionesServices.create(this.selectedUserEmail, this.vacaciones).subscribe(response => {
          Swal.fire({
            title: "Éxito",
            text: "Creado con éxito",
            icon: "success"
          });
          this.router.navigate(['/vacaciones/misVacaciones']);
          userForm.reset();
          userForm.resetForm();
        });
      }
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

  loadPersonas(): void {
    if (this.isAdmin) {
      this.userService.findAll().subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => {
          console.error('Error fetching usuarios:', error);
        }
      );
    }
  }
}
