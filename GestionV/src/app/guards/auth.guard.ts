import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const service=inject(AuthService)
  const router=inject(Router)
  if(service.isAuth()){

      if(isTokenIspire()){
        service.logout()
        router.navigate(['/login'])
          return false
      }
      // if(!service.isAdmin()){

      //     router.navigate(['/forbiden'])
      //   return false
      // }
    return true
  }
router.navigate(['/login'])

  return true;
};

const isTokenIspire=()=>{
  const token=inject(AuthService).token
  const payload=inject(AuthService).getPayload(token)
  const exp=payload.exp
  const now=new Date().getTime()/1000

  return(now>exp)?true:false

}
