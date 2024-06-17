import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';

export const routes: Routes = [

  {

    path:'',
    pathMatch:'full',
    redirectTo:'/usuarios'
  },
  {
      path:'usuarios',
      component:UserComponent
    },
    {
      path:'usuarios/create',
      component:FormUserComponent
    },
    {
      path:'usuarios/edit/:id',
      component:FormUserComponent
    },
    {
      path:'vacaciones',
      component:VacacionesComponent
    }
];
