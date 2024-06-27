import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { FormVacationComponent } from './components/form-vacation/form-vacation.component';

export const routes: Routes = [

  {

    path:'',
    pathMatch:'full',
    redirectTo:'/usuarios/page/0'
  },
  {
      path:'usuarios',
      component:UserComponent
    },
    {
      path:'usuarios/page/:page',
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
    },{
      path:'vacaciones/create',
      component:FormVacationComponent
    }
];
