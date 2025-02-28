/**
 * @Componente MpcNavbarComponent
 * Este componente é responsável por exibir uma navbar na tela.
 *
 *
 * Exemplo de utilização:
 * <mpc-navbar></mpc-navbar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Rotas } from '../../enums/rotas-enum';
import { CommonModule } from '@angular/common';

interface SubMenuConfig {
  titulo: string,
  fragment?: string,
  rota?: string,
  ativo: boolean
}

interface NavbarConfig {
  titulo: string,
  rota: string,
  icone: string,
  ativo: boolean,
  focado: boolean,
  subMenus?: SubMenuConfig[]
}

@Component({
  selector: 'mpc-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.css']
})
export class MpcNavbarComponent {

  abas: NavbarConfig[] = [
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill', ativo: true, focado: false },
    { titulo: 'Documentação', rota: Rotas.DOCS, icone: 'bi bi-book-fill', ativo: true, focado: false },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-code-slash',
      ativo: true,
      focado: false,
      subMenus: [
        { titulo: 'McpButtons', fragment: Rotas.BUTTONS, ativo: true },
        { titulo: 'McpLoader', fragment: Rotas.LOADER, ativo: true },
        { titulo: 'McpModais', fragment: Rotas.MODAIS, ativo: true },
        { titulo: 'McpPageHeader', fragment: Rotas.PAGE_HEADER, ativo: false },
        { titulo: 'McpComprovante', fragment: Rotas.COMPROVANTE, ativo: true },
        { titulo: 'McpCards', fragment: Rotas.CARDS, ativo: false },
        { titulo: 'McpNavbar', fragment: Rotas.NAVBAR, ativo: false },
        { titulo: 'McpFooter', fragment: Rotas.FOOTER, ativo: true },
      ]
    },
    {
      titulo: 'Páginas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-file-earmark-text-fill',
      ativo: true,
      focado: false,
      subMenus: [
        { titulo: 'Formulário', rota: Rotas.FORMULARIO, ativo: true },
        { titulo: 'Aguarde', rota: Rotas.AGUARDE, ativo: true },
        { titulo: 'Login', rota: Rotas.LOGIN, ativo: false },
      ]
    },
  ];

  isClicado = false;

  constructor(private router: Router) { }

  navigate(rota: string, fragment?: string) {
    if (fragment) {
      this.router.navigate([rota], { fragment: fragment });
    } else {
      this.router.navigate([rota]);
    }
  }
}
