/**
 * @Componente MpcNavbarComponent
 * 
 * Este componente é responsável por exibir a barra de navegação principal,
 * suportando abas com sub-rotas e identificação automática de abas de login.
 * 
 * @Propriedades
 * _abas {NavbarConfig[]} - Configuração das abas da navbar
 * 
 * @Exemplo
 * ```html
 * <!-- Navbar Básica -->
 * <mpc-navbar id="navbar" />
 * 
 * <!-- Configuração das Abas -->
 * const abas: NavbarConfig[] = [
 *   {
 *     titulo: 'Home',
 *     rota: '/',
 *     icone: 'bi bi-house'
 *   },
 *   {
 *     titulo: 'Perfil',
 *     rota: '/perfil',
 *     icone: 'bi bi-person',
 *     subRotas: [
 *       { titulo: 'Dados Pessoais', rota: '/perfil/dados' },
 *       { titulo: 'Configurações', rota: '/perfil/config' }
 *     ]
 *   },
 *   {
 *     titulo: 'Login',
 *     rota: '/login',
 *     icone: 'bi bi-box-arrow-in-right'
 *   }
 * ];
 * ```
 * 
 * @Interfaces
 * SubRotaConfig: Interface para configuração de sub-rotas
 * - titulo: string - Título da sub-rota
 * - fragment?: string - Fragmento da URL (opcional)
 * - rota?: string - Rota da sub-aba (opcional)
 * 
 * NavbarConfig: Interface para configuração das abas da navbar
 * - titulo: string - Título da aba
 * - rota?: string - Rota da aba (opcional - se houver subRotas)
 * - icone: string - Classe do ícone (ex: 'bi bi-house')
 * - subRotas?: SubRotaConfig[] - Array de sub-rotas (opcional)
 * 
 * @Variáveis CSS
 * --mpc-color-bg-header: Cor de fundo da navbar
 * --mpc-color-text-disabled: Cor do texto desabilitado
 * --mpc-color-text-active: Cor do texto ativo
 * --mpc-color-text-hover: Cor do texto no hover
 * --mpc-color-border-active: Cor da borda ativa
 * --mpc-font-navbar: Fonte da navbar
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../enums/rotas-enum';

export interface SubRotaConfig {
  /** Título da sub-rota */
  titulo: string;
  /** Fragmento da URL (opcional) */
  fragment?: string;
  /** Rota da sub-aba (opcional) */
  rota?: string;
}

export interface NavbarConfig {
  /** Título da aba */
  titulo: string;
  /** Rota da aba */
  rota?: string;
  /** Classe do ícone (ex: 'bi bi-house') (opcional - se houver subRotas) */
  icone: string;
  /** Array de sub-rotas (opcional) */
  subRotas?: SubRotaConfig[];
}

@Component({
  selector: 'mpc-navbar',
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.css']
})
export class MpcNavbarComponent implements OnInit {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Configuração das abas da navbar */
  protected _abas: NavbarConfig[] = [
    /* { titulo: 'Login', rota: Rotas.LOGIN, icone: 'bi bi-person-fill' }, */
    { titulo: 'Home', rota: Rotas.HOME, icone: 'bi bi-house-fill' },
    { titulo: 'Documentação', rota: Rotas.LIB_DOC, icone: 'bi bi-book' },
    {
      titulo: 'Componentes',
      icone: 'bi bi-code-slash',
      subRotas: [
        { titulo: 'mpc-cards', rota: Rotas.CARDS },
        { titulo: 'mpc-button', rota: Rotas.BUTTONS },
        { titulo: 'mpc-btn-float', rota: Rotas.BTN_FLOAT },
        { titulo: 'mpc-modal', rota: Rotas.MODAIS },
        { titulo: 'mpc-loader', rota: Rotas.LOADERS },
        { titulo: 'mpc-tabs', rota: Rotas.TABS },
        { titulo: 'mpc-pagination', rota: Rotas.PAGINACAO },
        { titulo: 'mpc-inputs', rota: Rotas.INPUTS },
        { titulo: 'mpc-page-divider-img', rota: Rotas.PAGE_DIVIDER_IMG },
      ]
    },
    {
      titulo: 'Formulário',
      icone: 'bi bi-file-earmark-text-fill',
      subRotas: [
        { titulo: 'Realizar Inscrição (Fluxo)', rota: Rotas.DADOS_PESSOAIS },
        { titulo: 'Pesquisar Inscrição', rota: Rotas.PESQUISA },
        { titulo: 'Inscrições Encerradas', rota: Rotas.INSCRICOES_ENCERRADAS },
      ]
    },
    {
      titulo: 'Templates',
      icone: 'bi bi-filetype-html',
      subRotas: [
        { titulo: 'Aguarde', rota: Rotas.AGUARDE },
        /* { titulo: 'Login', rota: Rotas.LOGIN }, */
        { titulo: 'Erro', rota: Rotas.PAGINA_ERRO },
        { titulo: 'Navbar', rota: Rotas.NAVBAR },
        { titulo: 'Footer', rota: Rotas.FOOTER },
      ]
    },
  ];

  // ===== PROPRIEDADES PRIVADAS =====
  /** Array de abas filtradas (excluindo login) */
  protected abas: NavbarConfig[] = [];
  /** Aba de login identificada automaticamente */
  protected abaLogin!: NavbarConfig;
  /** Controla o estado de clique */
  protected isClicado = false;

  /** Serviço de roteamento injetado */
  private readonly router = inject(Router);

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Inicializa o componente, filtrando as abas e identificando a aba de login.
   */
  ngOnInit(): void {
    if (this._abas) {
      this.abas = this._abas.filter(aba => !this.isAbaLogin(aba)); // Filtra as abas para exibir apenas as que não são de login
      this.abaLogin = this._abas.find(aba => this.isAbaLogin(aba))!; // Encontra a aba de login
    }
  }

  /**
   * Verifica se uma aba está ativa baseado na URL atual.
   * @param aba Configuração da aba
   * @returns {boolean} true se a aba estiver ativa
   */
  protected isAbaAtiva(aba: NavbarConfig): boolean {
    const url = this.router.url;

    // Se alguma sub-aba estiver ativa, a principal deve ficar ativa
    if (aba.subRotas) {
      // Verifica se alguma sub-rota está ativa, mas ignora sub-rotas que apontam para home
      const subRotaAtiva = aba.subRotas.some(sub => {
        if (!sub.rota) return false;

        // Tratamento especial para rota home "/"
        if (sub.rota === '/') {
          // Se estamos na home, não ativa a aba pai para evitar conflitos
          return false;
        }

        return url.startsWith(sub.rota);
      });

      if (subRotaAtiva) {
        return true;
      }
    }

    // Tratamento especial para rota home "/"
    if (aba.rota === '/') {
      return url === '/' || url === '';
    }

    return url === aba.rota;
  }

  /**
   * Verifica se uma sub-aba está ativa baseado na URL atual.
   * @param sub Configuração da sub-rota
   * @returns {boolean} true se a sub-aba estiver ativa
   */
  protected isSubAbaAtiva(sub: SubRotaConfig): boolean {
    const url = this.router.url;

    // Tratamento especial para rota home "/"
    if (sub.rota === '/') {
      return url === '/' || url === '';
    }

    return !!sub.rota && url.startsWith(sub.rota);
  }

  /**
   * Identifica se uma aba é de login pelo título ou rota.
   * @param aba Configuração da aba
   * @returns {boolean} true se for uma aba de login
   */
  protected isAbaLogin(aba: NavbarConfig): boolean {
    // Identifica se a aba é de login pelo título ou rota
    const tituloEhLogin = typeof aba.titulo === 'string' && aba.titulo.toLowerCase().includes('login');
    const rotaEhLogin = typeof aba.rota === 'string' && aba.rota.toLowerCase().includes('login');
    return tituloEhLogin || rotaEhLogin;
  }

  /**
   * Navega para uma rota específica com verificação prévia.
   * @param rota Rota para navegar
   * @param fragment Fragmento da URL (opcional)
   */
  protected navegarPara(rota?: string, fragment?: string): void {
    if (!rota) return;

    // Verifica se a rota existe antes de navegar
    if (this.verificarRotaExiste(rota)) {
      if (fragment) {
        this.router.navigate([rota], { fragment: fragment });
      } else {
        this.router.navigate([rota]);
      }
    }
  };

  /**
   * Navega para uma aba específica.
   * @param aba Configuração da aba
   */
  protected navegarParaAba(aba: NavbarConfig): void {
    this.navegarPara(aba.rota);
  }

  /**
   * Navega para uma sub-rota específica.
   * @param sub Configuração da sub-rota
   * @param rotaPai Rota da aba pai (para fragmentos)
   */
  protected navegarParaSubRota(sub: SubRotaConfig, rotaPai?: string): void {
    if (sub.rota) {
      this.navegarPara(sub.rota);
    } else if (sub.fragment && rotaPai) {
      this.navegarPara(rotaPai, sub.fragment);
    } else {
      console.warn('MpcNavbar: Sub-rota sem rota ou fragmento válido');
    }
  }

  /**
   * Navega para a página inicial.
   */
  protected navegarParaHome(): void {
    this.navegarPara('/');
  }

  /**
   * Navega para a aba de login.
   */
  protected navegarParaLogin(): void {
    if (this.abaLogin) {
      this.navegarPara(this.abaLogin.rota);
    }
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se uma rota existe no sistema de roteamento.
   * @param rota Rota a ser verificada
   * @returns {boolean} true se a rota existir
   */
  private verificarRotaExiste(rota: string): boolean {
    try {
      // Tratamento especial para rota home
      if (rota === '/') {
        return true;
      }

      // Tenta navegar para a rota sem realmente navegar
      const urlTree = this.router.createUrlTree([rota]);
      const url = this.router.serializeUrl(urlTree);

      // Verifica se a URL foi criada corretamente
      return !!url;
    } catch (error) {
      console.error('MpcNavbar: Erro ao verificar rota:', error);
      return false;
    }
  }
}
