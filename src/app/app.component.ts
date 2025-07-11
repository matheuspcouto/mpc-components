
/**
 * @Componente AppComponent
 *
 * Este componente é o componente raiz da aplicação, responsável por gerenciar a navegação principal,
 * exibir a barra de navegação, rodapé, botão flutuante e loader global. Também controla o comportamento
 * de rolagem da página e a visibilidade do botão de voltar ao topo.
 *
 * @Propriedades
 * @protected abas {NavbarConfig[]} - Configuração das abas e sub-rotas exibidas na navbar
 *
 * @Exemplo
 * ```html
 * <app-root></app-root>
 * ```
 *
 * @Interfaces
 * NavbarConfig: Interface para configuração das abas da navegação
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MpcFooterComponent } from "./shared/components/mpc-footer/mpc-footer.component";
import { Rotas } from './shared/enums/rotas-enum';
import { isPlatformBrowser } from '@angular/common';
import { MpcNavbarComponent, NavbarConfig, MpcBtnFloatComponent, MpcLoaderComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcNavbarComponent, MpcFooterComponent, MpcBtnFloatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  /**
   * Configuração das abas e sub-rotas exibidas na navbar principal.
   */
  protected abas: NavbarConfig[] = [
    /* { titulo: 'Login', rota: Rotas.LOGIN, icone: 'bi bi-person-fill' }, */
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill' },
    { titulo: 'Documentação', rota: Rotas.LIB_DOC, icone: 'bi bi-book' },
    {
      titulo: 'Componentes',
      rota: Rotas.COMPONENTES,
      icone: 'bi bi-code-slash',
      subRotas: [
        { titulo: 'mpc-cards', rota: Rotas.CARDS },
        { titulo: 'mpc-button', rota: Rotas.BUTTONS },
        { titulo: 'mpc-btn-float', rota: Rotas.BTN_FLOAT },
        { titulo: 'mpc-modal', rota: Rotas.MODAIS },
        { titulo: 'mpc-loader', rota: Rotas.LOADERS },
        { titulo: 'mpc-navbar', rota: Rotas.NAVBAR },
        /*  { titulo: 'mpc-footer', rota: Rotas.FOOTER }, */
        { titulo: 'mpc-tabs', rota: Rotas.TABS },
        { titulo: 'mpc-pagination', rota: Rotas.PAGINACAO },
        { titulo: 'mpc-inputs', rota: Rotas.INPUTS },
        { titulo: 'mpc-page-divider-img', rota: Rotas.PAGE_DIVIDER_IMG },
        { titulo: 'mpc-pipes', rota: Rotas.PIPES },
      ]
    },
    {
      titulo: 'Formulário',
      rota: Rotas.FORMULARIO,
      icone: 'bi bi-file-earmark-text-fill',
      subRotas: [
        { titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS },
        { titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA },
        { titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS },
      ]
    },
    {
      titulo: 'Páginas Avulsas',
      rota: Rotas.PAGINAS,
      icone: 'bi bi-filetype-html',
      subRotas: [
        { titulo: 'Home', rota: Rotas.HOME },
        { titulo: 'Aguarde', rota: Rotas.AGUARDE },
        /* { titulo: 'Login', rota: Rotas.LOGIN }, */
        { titulo: 'Erro', rota: Rotas.PAGINA_ERRO },
      ]
    },
  ];

  /**
   * Identificador da plataforma (browser/server) para controle de funcionalidades específicas.
   */
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Inicializa o componente e adiciona listener para controlar a visibilidade do botão de scroll para o topo.
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const btnScrollTop = document.getElementById('btn-scroll-top');

        if (btnScrollTop) {
          btnScrollTop.style.visibility = scrollPosition > 300 ? 'visible' : 'hidden';
        }
      });
    }

  }

  /**
   * Realiza a rolagem suave para o topo da página.
   */
  protected scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}

// TODO: Ajustar Tela de Login
// TODO: Tela de Login com guard e renderizar só o componente de login
// TODO: Tela de Cadastro
// TODO: Environment por ambiente e comandos