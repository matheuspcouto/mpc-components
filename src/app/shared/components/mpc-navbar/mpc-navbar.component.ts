/**
 * @Componente MpcNavbarComponent
 * Este componente é responsável por exibir uma navbar na tela.
 *
 * abas: NavbarConfig[]: Configuração das abas da navbar.
 *
 * Exemplo de utilização:
 * <mpc-navbar abaLogin="/paginas/login"></mpc-navbar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.css']
})
export class MpcNavbarComponent {

  @Input() abaLogin?: string;

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
        { titulo: 'Paginação', rota: Rotas.PAGINACAO, ativo: true },
        { titulo: 'Inputs', rota: Rotas.INPUTS, ativo: true },
        { titulo: 'Page Header', rota: Rotas.PAGE_HEADER, ativo: true },
      ]
    },
    {
      titulo: 'Formulário',
      rota: Rotas.FORMULARIO,
      icone: 'bi bi-file-earmark-text-fill',
      ativo: true,
      subRotas: [
        { titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS, ativo: true },
        { titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA, ativo: true },
        { titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS, ativo: true },
      ]
    },
    {
      titulo: 'Páginas Avulsas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-filetype-html',
      ativo: true,
      subRotas: [
        { titulo: 'Aguarde', rota: Rotas.AGUARDE, ativo: true },
        { titulo: 'Login', rota: Rotas.LOGIN, ativo: true },
        { titulo: 'Erro', rota: Rotas.PAGINA_ERRO, ativo: true },
      ]
    },
  ];

  isClicado = false;
}
