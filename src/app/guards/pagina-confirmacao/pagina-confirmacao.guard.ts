import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../../pages/formulario/inscricao.service';
import { Rotas } from '../../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class PaginaConfirmacaoGuard implements CanActivate {

  private inscricaoService = inject(InscricaoService);
  private router = inject(Router);

  canActivate(): boolean {
    return this.verificaAcessoConfirmacao();
  }

  private verificaAcessoConfirmacao(): boolean {
    const etapaAtual = this.inscricaoService.getEtapaAtual();

    // Verifica se a etapa atual é pelo menos 4
    if (etapaAtual < 4) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    // Verifica se a inscricao está completa
    if (!this.inscricaoService.isInscricaoCompleta()) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    return true;
  }
}
