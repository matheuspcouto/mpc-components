/**
 * @Guard InscricoesGuard
 * Responsável por controlar o acesso às rotas de inscrição, verificando vagas.
 *
 * - Checa se as inscrições estão abertas para homens e mulheres, controlando status de vagas.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 28/07/2025
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MpcErrorService } from '../../shared/components/mpc-error/mpc-error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

@Injectable({
  providedIn: 'root'
})
export class InscricoesGuard implements CanActivate {

  private readonly inscricaoService = inject(InscricaoService);
  private readonly router = inject(Router);
  private readonly errorService = inject(MpcErrorService);

  /**
 * Verifica se a navegação pode ser ativada, checando etapas e vagas.
 * @param route Rota ativada
 * @returns boolean Se o acesso é permitido
 */
  canActivate(): Observable<boolean> {
    const QTD_VAGAS = 3;

    return this.inscricaoService.listarInscricoes().pipe(
      take(1),
      map(response => {

        if (response.error) {
          throw new HttpErrorResponse({ error: response.error });
        }

        return (response.data || []).length < QTD_VAGAS;

      }),
      catchError((error) => {
        this.errorService.construirErro(error);
        return of(false);
      })
    );

  }
}
