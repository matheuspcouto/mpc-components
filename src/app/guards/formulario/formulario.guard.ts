import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Rotas } from '../../shared/enums/rotas-enum';
import { Observable, of } from 'rxjs';
import { MpcErrorService } from '../../shared/components/mpc-error/mpc-error.service';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioGuard implements CanActivate {
  
  private readonly inscricaoService = inject(InscricaoService);
  private readonly router = inject(Router);
  private readonly errorService = inject(MpcErrorService);

  /**
   * Verifica se a navegação pode ser ativada, checando etapas e validações do formulário.
   * @param route Rota ativada
   * @returns boolean Se o acesso é permitido
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    try {
      const etapaMinima = route.data['etapaMinima'];
      const checagem = route.data['checagem'];
      if (etapaMinima || checagem) {
        return this.verificarAcessoFormularioObservable(etapaMinima, checagem);
      }
      return of(true);
    } catch (error) {
      this.errorService.construirErro(error);
      return of(false);
    }
  }

  /**
   * Versão Observable da verificação de acesso ao formulário.
   */
  private verificarAcessoFormularioObservable(etapaMinima: number, checagem: string): Observable<boolean> {
    const etapaAtual = this.inscricaoService.getEtapaAtual();
    if (etapaAtual < etapaMinima) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return of(false);
    }
    // Checagens específicas
    switch (checagem) {
      case 'dadosPessoais':
        if (!this.inscricaoService.isDadosPessoaisCompletos()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return of(false);
        }
        break;
      case 'dadosPessoaisEContato':
        if (!this.inscricaoService.isDadosPessoaisCompletos() || !this.inscricaoService.isContatoCompleto()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return of(false);
        }
        break;
      case 'inscricaoCompleta':
        if (!this.inscricaoService.isInscricaoCompleta()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return of(false);
        }
        break;
    }
    return of(true);
  }
} 