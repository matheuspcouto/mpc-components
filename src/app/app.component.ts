/**
 * @Componente AppComponent
 *
 * Este componente é o componente raiz da aplicação, responsável por configurar as abas da barra de navegação, 
 * exibir rodapé, botão flutuante e loader global. Também controla o comportamento
 * de rolagem da página e a visibilidade do botão de voltar ao topo.
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MpcBtnFloatComponent, MpcLoaderComponent, MpcNavbarComponent, NavbarConfig } from 'mpc-lib-angular';
import { environment } from '../environments/environment';
import { MpcFooterComponent } from './shared/components/mpc-footer/mpc-footer.component';
import { Rotas } from './shared/enums/rotas-enum';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MpcLoaderComponent, MpcNavbarComponent, MpcFooterComponent, MpcBtnFloatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  /**
   * Identificador da plataforma (browser/server) para controle de funcionalidades específicas.
   * @type {any}
   */
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  /**
   * Define visualização do botão de voltar ao topo.
   * @type {boolean}
   */
  protected showScrollTop: boolean = false;

  /**
   * Abas de navegação exibidas na barra superior.
   * @type {NavbarConfig[]}
   */
  protected abas: NavbarConfig[] = [
    { id: 'home', titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill' },
    { id: 'documentacao', titulo: 'Documentação', rota: Rotas.LIB_DOC, icone: 'bi bi-book' },
    {
      id: 'componentes',
      titulo: 'Componentes',
      icone: 'bi bi-code-slash',
      subRotas: [
        { id: 'mpc-cards', titulo: 'mpc-cards', rota: Rotas.CARDS },
        { id: 'mpc-button', titulo: 'mpc-button', rota: Rotas.BUTTONS },
        { id: 'mpc-btn-float', titulo: 'mpc-btn-float', rota: Rotas.BTN_FLOAT },
        { id: 'mpc-modal', titulo: 'mpc-modal', rota: Rotas.MODAIS },
        { id: 'mpc-loader', titulo: 'mpc-loader', rota: Rotas.LOADERS },
        { id: 'mpc-tabs', titulo: 'mpc-tabs', rota: Rotas.TABS },
        { id: 'mpc-pagination', titulo: 'mpc-pagination', rota: Rotas.PAGINACAO },
        { id: 'mpc-inputs', titulo: 'mpc-inputs', rota: Rotas.INPUTS },
        { id: 'mpc-page-divider-img', titulo: 'mpc-page-divider-img', rota: Rotas.PAGE_DIVIDER_IMG },
      ]
    },
    {
      id: 'formulario',
      titulo: 'Formulário',
      icone: 'bi bi-file-earmark-text-fill',
      subRotas: [
        { id: 'realizar-inscricao', titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS },
        { id: 'pesquisar-inscricao', titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA },
        { id: 'inscricoes-encerradas', titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS },
      ]
    },
    {
      id: 'templates',
      titulo: 'Templates',
      icone: 'bi bi-filetype-html',
      subRotas: [
        { id: 'aguarde', titulo: 'Aguarde', rota: Rotas.AGUARDE },
        { id: 'erro', titulo: 'Erro', rota: Rotas.PAGINA_ERRO },
        { id: 'navbar', titulo: 'Navbar', rota: Rotas.NAVBAR },
        { id: 'footer', titulo: 'Footer', rota: Rotas.FOOTER },
      ]
    },
  ];

  /**
   * Inicializa o componente e adiciona listener para controlar a visibilidade do botão de scroll para o topo.
   * @returns {void}
   */
  ngOnInit(): void {
    this.definirAbasLoginConta();

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        this.showScrollTop = scrollPosition > 300;
      });

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    console.log(`Server running on: '${environment.env}' mode.`);
  }

  protected definirAbasLoginConta(): void {
    if (this.authService.isAuthenticated()) {
      this.abas = this.abas.filter(aba => !aba.isAbaLogin);

      const abaConta: NavbarConfig = {
        id: 'conta',
        titulo: 'Conta',
        icone: 'bi bi-person-fill',
        subRotas: [
          { id: 'perfil', titulo: 'Perfil', rota: "" },
          { id: 'sair', titulo: 'Sair', acao: () => this.authService.logout() },
        ],
        isAbaConta: true,
      }

      this.abas.push(abaConta);
    } else {
      const abaLogin: NavbarConfig = {
        id: 'login',
        titulo: 'Login',
        icone: 'bi bi-person-fill',
        isAbaLogin: true,
        rota: Rotas.LOGIN
      }
      this.abas.push(abaLogin);
    }
  }

  /**
   * Realiza a rolagem suave para o topo da página.
   * @returns {void}
   */
  protected scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Rotas onde a navbar NÃO deve aparecer
   * @type {string[]}
   */
  protected esconderNavbar: string[] = [Rotas.AGUARDE, Rotas.LOGIN];

  /**
   * Verifica se a navbar deve ser exibida com base na URL atual.
   * @returns {boolean}
   */
  protected mostrarNavbar(): boolean {
    return !this.esconderNavbar.some(route => this.router.url.startsWith(route));
  }
}

// TODO: Tela de Cadastro
// TODO: Corrigir documentação (um de cada vez)
// TODO: Exemplos de arquivos de config/yml em templates ou aba configs
// TODO: Fluxo de Gerenciamento de Inscrições
// TODO: Ajustar navbar para login e logout