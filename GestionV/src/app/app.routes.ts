import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { FormVacationComponent } from './components/form-vacation/form-vacation.component';
import { MisVacacionesComponent } from './components/mis-vacaciones/mis-vacaciones.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

export const routes: Routes = [

  {

    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
      path:'usuarios',
      component:UserComponent,
      canActivate:[authGuard]
    },
    {
      path:'usuarios/page/:page',
      component:UserComponent,
      canActivate:[authGuard]
    },
    {
      path:'usuarios/create',
      component:FormUserComponent,
      canActivate:[authGuard]
    },
    {
      path:'usuarios/edit/:id',
      component:FormUserComponent,
      canActivate:[authGuard]
    },
    {
      path:'vacaciones',
      component:VacacionesComponent,
      canActivate:[authGuard]
    },{
      path:'vacaciones/create',
      component:FormVacationComponent,
      canActivate:[authGuard]
    },
    {
      path:'vacaciones/edit/:id',
      component:FormVacationComponent,
      canActivate:[authGuard]
    },
    {
      path:'vacaciones/misVacaciones',
      component:MisVacacionesComponent,
      canActivate:[authGuard]

    },
    {
      path:'login',
      component:AuthComponent
    },
    {
      path:'forbiden',
      component:ForbiddenComponent
    }
];
