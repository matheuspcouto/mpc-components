/**
 * @Guard SiteAtivoGuard
 * Este guard é responsável por controlar o acesso às rotas da aplicação,
 * verificando se o site está ativo ou redirecionando para a página de aguarde.
 *
 * @Exemplo de utilização:
 * canActivate: [SiteAtivoGuard]
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { Rotas } from '../../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class SiteAtivoGuard implements CanActivate {

  /**
   * @Router Router
   * Instância do Router do Angular para navegação entre rotas.
   */
  private router = inject(Router);

  /**
   * @boolean siteAtivo
   * Flag que controla se o site está ativo ou não.
   * true: site ativo, permite acesso às rotas
   * false: site inativo, redireciona para página de aguarde
   */
  siteAtivo = true;

  /**
   * @method canActivate
   * Método que implementa a interface CanActivate do Angular.
   * Verifica se o site está ativo e permite ou nega o acesso à rota.
   *
   * @returns {boolean} true se o site estiver ativo, false caso contrário
   */
  canActivate(): boolean {

    if (this.siteAtivo) {
      return true;
    }
    else {
      this.router.navigate([Rotas.AGUARDE]);
      return false;
    }
  }

}
