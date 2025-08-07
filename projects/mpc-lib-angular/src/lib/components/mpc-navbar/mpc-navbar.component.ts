/**
 * @Componente MpcNavbarComponent
 * 
 * Este componente exibe a barra de navegação principal do sistema, permitindo configuração dinâmica das abas e sub-abas, além de exibir um logo personalizado.
 *
 * @Propriedades
 * @Input abas {NavbarConfig[]} - Lista de abas e sub-abas a serem exibidas na navbar
 * @Input logo {string} - Caminho da imagem do logo a ser exibido na navbar (opcional)
 *
 * @Exemplo de uso
 * ```html
 * <!-- Exemplo de uso em app.component.html -->
 * <mpc-navbar id="navbar" [abas]="abas" logo="/assets/img/logo-preta.png" />
 * ```
 *
 * @Exemplo de configuração das abas no componente pai (app.component.ts):
 * ```typescript
 * abas: NavbarConfig[] = [
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
 *     icone: 'bi bi-box-arrow-in-right',
 *     isAbaLogin: true
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
 * - isAbaLogin?: boolean - Indica se é a aba de login (opcional)
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

import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface SubRotaConfig {
  /** Identificador da sub-rota */
  id: string;
  /** Título da sub-rota */
  titulo: string;
  /** Fragmento da URL (opcional) */
  fragment?: string;
  /** Rota da sub-aba (opcional) */
  rota?: string;
  /** Ação a ser executada ao clicar na aba (opcional) */
  acao?: () => void;
}

export interface NavbarConfig {
  /** Identificador da aba */
  id: string;
  /** Título da aba */
  titulo: string;
  /** Rota da aba */
  rota?: string;
  /** Ação a ser executada ao clicar na aba (opcional) */
  acao?: () => void;
  /** Classe do ícone (ex: 'bi bi-house') (opcional - se houver subRotas) */
  icone: string;
  /** Array de sub-rotas (opcional) */
  subRotas?: SubRotaConfig[];
  /** Flag de aba de login */
  isAbaLogin?: boolean;
  /** Flag de aba de conta */
  isAbaConta?: boolean;
}

@Component({
  selector: 'mpc-navbar',
  templateUrl: './mpc-navbar.component.html',
  styleUrls: ['./mpc-navbar.component.scss']
})
export class MpcNavbarComponent implements OnInit {

  // ===== PROPRIEDADE =====
  /** Configuração das abas da navbar */
  @Input() abas: NavbarConfig[] = [];
  /** Logo da aplicação da navbar */
  @Input() logo?: string;
  /** Aba de login identificada automaticamente */
  protected abaLogin?: NavbarConfig;
  /** Aba de conta identificada automaticamente */
  protected abaConta?: NavbarConfig;
  /** Controla o estado de clique */
  protected isClicado = false;

  /** Serviço de roteamento injetado */
  private readonly router = inject(Router);

  // ===== MÉTODOS PÚBLICOS =====

  ngOnInit(): void {
    this.abaLogin = this.abas.find(aba => aba.isAbaLogin);
    this.abaConta = this.abas.find(aba => aba.isAbaConta);
    this.abas = this.abas.filter(aba => !aba.isAbaLogin && !aba.isAbaConta);

    console.log(this.abaLogin, this.abaConta, this.abas);
    
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
      console.log(this.abaLogin);
      
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
