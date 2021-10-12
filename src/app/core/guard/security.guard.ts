import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/feature/usuario/shared/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let usuario:Usuario = JSON.parse(localStorage.getItem("user"));
    if(usuario){
      return true;
    }
    this.router.navigate(['/home'])
    return false
  }

}
