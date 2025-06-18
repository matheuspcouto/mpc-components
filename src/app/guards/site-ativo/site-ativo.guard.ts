import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { Rotas } from '../../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class SiteAtivoGuard implements CanActivate {

  private router = inject(Router);

  siteAtivo = true;

  canActivate(): boolean {

    if (this.siteAtivo){
       return true;
    }
    else {
      this.router.navigate([Rotas.AGUARDE]);
      return false;
    }
  }

}
