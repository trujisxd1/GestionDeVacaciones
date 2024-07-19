import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from './components/user-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserAppComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {
  title!:string;

////////////Tareas Por hacer
//QUitar los fines de semana
//agregar cantidad de vacaciones que les sobra
//cuando se les acabe las vacaciones mandar mensaje de que ya haz ocupado todas 
}
