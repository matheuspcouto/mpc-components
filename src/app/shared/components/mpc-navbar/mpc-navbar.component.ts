/**
 * @Componente MpcNavbarComponent
 * 
 * Este componente é responsável por exibir a barra de navegação principal,
 * suportando abas com sub-rotas e identificação automática de abas de login.
 * 
 * @Propriedades
 * @Input() abasInput {NavbarConfig[]} - Configuração das abas da navbar
 * 
 * @Exemplo
 * ```html
 * <!-- Navbar Básica -->
 * <mpc-navbar [abasInput]="abas"></mpc-navbar>
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
 * --mpc-color-bg-header: Cor de fundo da navbar (padrão: white)
 * --mpc-color-text-disabled: Cor do texto desabilitado (padrão: #7f7f90)
 * --mpc-color-text-active: Cor do texto ativo (padrão: var(--mpc-color-primary))
 * --mpc-color-text-hover: Cor do texto no hover (padrão: var(--mpc-color-primary))
 * --mpc-color-border-active: Cor da borda ativa (padrão: var(--mpc-color-secondary))
 * --mpc-font-navbar: Fonte da navbar (padrão: var(--mpc-font-subtitle))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() abasInput: NavbarConfig[] = [];

  // ===== PROPRIEDADES PRIVADAS =====
  /** Array de abas filtradas (excluindo login) */
  abas: NavbarConfig[] = [];
  /** Aba de login identificada automaticamente */
  abaLogin!: NavbarConfig;
  /** Controla o estado de clique */
  isClicado = false;

  /** Serviço de roteamento injetado */
  private readonly router = inject(Router);

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Inicializa o componente, filtrando as abas e identificando a aba de login.
   */
  ngOnInit(): void {
    if (this.abasInput) {
      this.abas = this.abasInput.filter(aba => !this.isAbaLogin(aba)); // Filtra as abas para exibir apenas as que não são de login
      this.abaLogin = this.abasInput.find(aba => this.isAbaLogin(aba))!; // Encontra a aba de login
    }
  }

  /**
   * Verifica se uma aba está ativa baseado na URL atual.
   * @param aba Configuração da aba
   * @returns {boolean} true se a aba estiver ativa
   */
  isAbaAtiva(aba: NavbarConfig): boolean {
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
  isSubAbaAtiva(sub: SubRotaConfig): boolean {
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
  isAbaLogin(aba: NavbarConfig): boolean {
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
  navegarPara(rota?: string, fragment?: string): void {
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
  navegarParaAba(aba: NavbarConfig): void {
    this.navegarPara(aba.rota);
  }

  /**
   * Navega para uma sub-rota específica.
   * @param sub Configuração da sub-rota
   * @param rotaPai Rota da aba pai (para fragmentos)
   */
  navegarParaSubRota(sub: SubRotaConfig, rotaPai?: string): void {
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
  navegarParaHome(): void {
    this.navegarPara('/');
  }

  /**
   * Navega para a aba de login.
   */
  navegarParaLogin(): void {
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
