import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../pages/formulario/inscricao.service';
import { Rotas } from '../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class PaginaPagamentoGuard implements CanActivate {

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.verificaAcessoPagamento();
  }

  private verificaAcessoPagamento(): boolean {
    const etapaAtual = this.inscricaoService.getEtapaAtual();

    // Verifica se a etapa atual é pelo menos 3
    if (etapaAtual < 3) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    // Verifica se os dados pessoais  e os dados de contato estão completos
    if (!this.inscricaoService.isDadosPessoaisCompletos() && !this.inscricaoService.isContatoCompleto()) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    return true;
  }
}
