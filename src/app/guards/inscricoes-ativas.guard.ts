import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InscricaoService } from '../pages/formulario/inscricao.service';
import { Rotas } from '../shared/enums/rotas-enum';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricoesEncerradasGuard implements CanActivate {

  qtdVagas = 4;

  constructor(
    private inscricaoService: InscricaoService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.inscricoesAbertas();
  }

  inscricoesAbertas(): Observable<boolean> {
    return this.inscricaoService.listarInscricoes().pipe(
      map((response: any) => {
        const inscricoesAbertas = this.qtdVagas > response.length;

        if (!inscricoesAbertas) {
          this.router.navigate([Rotas.INSCRICOES_ENCERRADAS]);
        }

        return inscricoesAbertas;
      })
    );
  }

  etapaCorreta(): boolean {
    return true;
  }
}
