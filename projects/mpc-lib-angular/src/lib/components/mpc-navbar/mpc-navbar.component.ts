/**
 * @Componente MpcNavbarComponent
 * Este componente é responsável por exibir a barra de navegação principal.
 *
 * abas: NavbarConfig[]: Configuração das abas da navbar.
 *
 * Exemplo de utilização:
 * <mpc-navbar [abas]="abas"></mpc-navbar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface SubRotaConfig {
  titulo: string,
  fragment?: string,
  rota?: string
}

export interface NavbarConfig {
  titulo: string,
  rota: string,
  icone: string,
  subRotas?: SubRotaConfig[]
}

@Component({
  selector: 'mpc-navbar',
  imports: [RouterLink],
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.css']
})
export class MpcNavbarComponent implements OnInit {

  @Input() abasInput: NavbarConfig[] = [];

  abas: NavbarConfig[] = [];

  abaLogin!: NavbarConfig;

  isClicado = false;

  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.abasInput) {
      this.abas = this.abasInput.filter(aba => !this.isAbaLogin(aba)); // Filtra as abas para exibir apenas as que não são de login
      this.abaLogin = this.abasInput.find(aba => this.isAbaLogin(aba))!; // Encontra a aba de login
    }
  }

  isAbaAtiva(aba: NavbarConfig): boolean {
    const url = this.router.url;

    if (aba.subRotas) {
      return aba.subRotas.some(sub => url.startsWith(sub.rota || ''));
    }

    // Tratamento especial para rota home "/"
    if (aba.rota === '/') {
      return url === '/' || url === '';
    }

    return url.startsWith(aba.rota);
  }

  isSubAbaAtiva(sub: SubRotaConfig): boolean {
    const url = this.router.url;
    return !!sub.rota && url.startsWith(sub.rota);
  }

  isAbaLogin(aba: NavbarConfig): boolean {
    // Identifica se a aba é de login pelo título ou rota
    const tituloEhLogin = typeof aba.titulo === 'string' && aba.titulo.toLowerCase().includes('login');
    const rotaEhLogin = typeof aba.rota === 'string' && aba.rota.toLowerCase().includes('login');
    return tituloEhLogin || rotaEhLogin;
  }
}
