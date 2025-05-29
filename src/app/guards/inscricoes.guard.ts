import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../pages/formulario/inscricao.service';
import { Rotas } from '../shared/enums/rotas-enum';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricoesGuard implements CanActivate {

  private readonly qtdVagas = 4;

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
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

        // Verifica se a etapa atual está correta
        //return this.verificarEtapaCorreta();
      })
    );
  }

  private verificarEtapaCorreta(): boolean {
    const etapaAtual = this.inscricaoService.getEtapaAtual();

    console.log('Etapa atual:', etapaAtual);
    console.log('Dados pessoais completos:', this.inscricaoService.isDadosPessoaisCompletos());
    console.log('Contato completo:', this.inscricaoService.isContatoCompleto());
    console.log('Pagamento completo:', this.inscricaoService.isPagamentoCompleto());

    if (etapaAtual > 1 && !this.inscricaoService.isDadosPessoaisCompletos()) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    if (etapaAtual > 2 && !this.inscricaoService.isContatoCompleto()) {
      this.router.navigate([Rotas.CONTATO]);
      return false;
    }

    if (etapaAtual > 3 && !this.inscricaoService.isPagamentoCompleto()) {
      this.router.navigate([Rotas.PAGAMENTO]);
      return false;
    }




    return true;
  }
}
