import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-paginador',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {


  @Input() url:string=''
  @Input() paginador:any={}

  back=faAnglesLeft
  next=faAnglesRight
  nextTo=faAngleRight
  backTo=faAngleLeft

}
