import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';
import { Rotas } from '../../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class PaginaContatoGuard implements CanActivate {

  private inscricaoService = inject(InscricaoService);
  private router = inject(Router);

  canActivate(): boolean {
    return this.verificarAcessoContato();
  }

  private verificarAcessoContato(): boolean {
    const etapaAtual = this.inscricaoService.getEtapaAtual();

    // Verifica se a etapa atual é pelo menos 2
    if (etapaAtual < 2) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    // Verifica se os dados pessoais estão completos
    if (!this.inscricaoService.isDadosPessoaisCompletos()) {
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
      return false;
    }

    return true;
  }
}
