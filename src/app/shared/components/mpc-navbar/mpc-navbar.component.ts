/**
 * @Componente MpcNavbarComponent
 * Este componente é responsável por exibir uma navbar na tela.
 *
 * abas: NavbarConfig[]: Configuração das abas da navbar.
 *
 * Exemplo de utilização:
 * <mpc-navbar></mpc-navbar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Rotas } from '../../enums/rotas-enum';

interface SubRotaConfig {
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
  subRotas?: SubRotaConfig[]
}

@Component({
  selector: 'mpc-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.css']
})
export class MpcNavbarComponent {

  protected abas: NavbarConfig[] = [
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill', ativo: true },
    { titulo: 'Documentação', rota: Rotas.DOCS, icone: 'bi bi-book-fill', ativo: true },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-code-slash',
      ativo: true,
      subRotas: [
        { titulo: 'Buttons', rota: Rotas.BUTTONS, ativo: true },
        { titulo: 'Cards', rota: Rotas.CARDS, ativo: true },
        { titulo: 'Modais', rota: Rotas.MODAIS, ativo: true },
        { titulo: 'Loaders', rota: Rotas.LOADERS, ativo: true },
        { titulo: 'Navbar', rota: Rotas.NAVBAR, ativo: true },
        { titulo: 'Footer', rota: Rotas.FOOTER, ativo: true },
        { titulo: 'Tabs', rota: Rotas.TABS, ativo: true },
        { titulo: 'ScrollTopButton', rota: Rotas.SCROLLTOP, ativo: true },
        { titulo: 'Comprovante', rota: Rotas.COMPROVANTE, ativo: true },
      ]
    },
    {
      titulo: 'Páginas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-file-earmark-text-fill',
      ativo: true,
      subRotas: [
        { titulo: 'Formulário', rota: Rotas.DADOS_PESSOAIS, ativo: true },
        { titulo: 'Aguarde', rota: Rotas.AGUARDE, ativo: true },
        { titulo: 'Login', rota: Rotas.LOGIN, ativo: true },
      ]
    },
  ];

  isClicado = false;
}
