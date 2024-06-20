import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paginador',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.css'
})
export class PaginadorComponent {


  @Input() url:string=''
  @Input() paginador:any={}

}
