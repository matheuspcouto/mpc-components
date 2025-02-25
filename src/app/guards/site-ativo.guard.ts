import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { Rotas } from '../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class SiteAtivoGuard implements CanActivate {

  constructor(private router: Router){};

  siteAtivo = true;

  canActivate() {

    if (this.siteAtivo){
       return true;
    }
    else {
      this.router.navigate([Rotas.AGUARDE]);
      return false;
    }
  }

}
