import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninService } from './signin.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private signInService:SigninService, private router : Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.signInService.isLoggedIn() && this.signInService.getUserRole() == 'Admin'){
        return true;
      }
  
      Swal.fire({
        title : 'Ha ocurrido un error!',
        text : 'Usted no tiene permisos para acceder a la ruta solicitada.',
        icon : 'warning',
        confirmButtonText: 'Aceptar'
      })

      this.signInService.logout();
      this.router.navigate(['signin']);
      
      return false;
  }
  
}
