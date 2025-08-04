/**
 * @Guard AuthGuard
 * Este guard é responsável por controlar o acesso às rotas protegidas da aplicação.
 * Verifica se o usuário está autenticado e redireciona para login caso não esteja.
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 */
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Rotas } from '../../shared/enums/rotas-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Verifica se a navegação pode ser ativada, checando se o usuário está autenticado.
   * @param route Rota ativada
   * @param state Estado da rota
   * @returns Observable<boolean> indicando se pode ativar a rota
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Verifica se o usuário está autenticado
    if (this.authService.getAutenticado()) {
      return of(true);
    }

    // Se não estiver autenticado, redireciona para login
    this.router.navigate([Rotas.LOGIN], {
      queryParams: { returnUrl: state.url }
    });
    return of(false);
  }
} 