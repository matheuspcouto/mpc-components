import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../../pages/formulario/inscricao.service';
import { Rotas } from '../../shared/enums/rotas-enum';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricoesGuard implements CanActivate {

  private readonly qtdVagas = 4;

  private inscricaoService = inject(InscricaoService);
  private router = inject(Router);

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
      })
    );
  }
}
