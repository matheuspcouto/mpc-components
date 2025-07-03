import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';
import { Rotas } from '../../shared/enums/rotas-enum';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricoesGuard implements CanActivate {

  private qtdVagas = 4;

  private inscricaoService = inject(InscricaoService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Se for rota de formulário, faz checagem extra
    const etapaMinima = route.data['etapaMinima'];
    const checagem = route.data['checagem'];
    if (etapaMinima || checagem) {
      return of(this.verificarAcessoFormulario(etapaMinima, checagem));
    }
    // Checagem padrão de inscrições abertas
    return this.verificarInscricoesAbertas();
  }

  private verificarInscricoesAbertas(): Observable<boolean> {
    return this.inscricaoService.listarInscricoes().pipe(
      map((response: any) => {
        const inscricoesAbertas = this.qtdVagas > response.length;

        if (!inscricoesAbertas) {
          this.router.navigate([Rotas.INSCRICOES_ENCERRADAS]);
          return false;
        }

        return true;
      })
    );
  }

  private verificarAcessoFormulario(etapaMinima: number, checagem: string): boolean {
    const etapaAtual = this.inscricaoService.getEtapaAtual();
    if (etapaAtual < etapaMinima) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }
    // Checagens específicas
    switch (checagem) {
      case 'dadosPessoais':
        if (!this.inscricaoService.isDadosPessoaisCompletos()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return false;
        }
        break;
      case 'dadosPessoaisEContato':
        if (!this.inscricaoService.isDadosPessoaisCompletos() || !this.inscricaoService.isContatoCompleto()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return false;
        }
        break;
      case 'inscricaoCompleta':
        if (!this.inscricaoService.isInscricaoCompleta()) {
          this.router.navigate([Rotas.DADOS_PESSOAIS]);
          return false;
        }
        break;
    }
    return true;
  }
}
