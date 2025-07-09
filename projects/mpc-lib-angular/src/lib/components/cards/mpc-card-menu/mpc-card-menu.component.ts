/**
 * @Componente MpcCardMenuComponent
 * 
 * Este componente é responsável por exibir cards de menu interativos com ícone, título,
 * descrição e ação de clique. Ideal para navegação rápida e ações de menu.
 * O card possui design limpo com ícone circular e layout flexível.
 * 
 * @Propriedades
 * Input id {string} - ID único do card para acessibilidade
 * Input tabIndex {number} - Índice de tabulação para navegação por teclado
 * Input ariaLabel {string} - Rótulo para leitores de tela
 * Input titulo {string} - Título principal do card (obrigatório)
 * Input descricao {string} - Descrição do card (opcional)
 * Input icone {string} - Classe do ícone (obrigatório, ex: 'bi bi-telephone')
 * Input estilos {CardMenuEstilos} - Objeto com estilos personalizados (opcional)
 * Output acao {EventEmitter<void>} - Evento emitido ao clicar no card (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Card de Menu com Estilos Personalizados -->
 * <mpc-card-menu
 *   icone="bi bi-linkedin"
 *   titulo="LinkedIn"
 *   descricao="Conecte-se conosco"
 *   [estilos]="{
 *     background: '#0077b5',
 *     textColor: '#ffffff',
 *     iconeBackground: '#ffffff',
 *     iconeColor: '#0077b5'
 *   }"
 *   (acao)="onLinkedInClick()">
 * </mpc-card-menu>
 * ```
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 09/07/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface CardMenuEstilos {
  /** Cor de fundo do card */
  background?: string;
  /** Cor do texto do card */
  textColor?: string;
  /** Cor de fundo do ícone */
  iconeBackground?: string;
  /** Cor do ícone */
  iconeColor?: string;
}

@Component({
  selector: 'mpc-card-menu',
  imports: [],
  templateUrl: './mpc-card-menu.component.html',
  styleUrl: './mpc-card-menu.component.css'
})
export class MpcCardMenuComponent {

  // ===== PROPRIEDADES DE ACESSIBILIDADE =====
  /** ID único do card para acessibilidade */
  @Input() id?: string = '';
  /** Índice de tabulação para navegação por teclado */
  @Input() tabIndex?: number = 0;
  /** Rótulo para leitores de tela */
  @Input() ariaLabel?: string = '';

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() titulo: string = '';
  /** Descrição do card */
  @Input() descricao?: string;
  /** Classe do ícone (ex: 'bi bi-telephone') */
  @Input() icone: string = '';

  // ===== PROPRIEDADES DE ESTILO =====
  /** Objeto com estilos personalizados */
  @Input() estilos: CardMenuEstilos = {
    background: 'white',
    textColor: '#0E2749',
    iconeBackground: '#0E2749',
    iconeColor: 'white',
  };

  // ===== EVENTOS =====
  /** Evento emitido ao clicar no card */
  @Output() acao = new EventEmitter<void>();

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Emite o evento de clique do card.
   */
  protected clique(): void {
    this.acao.emit();
  }

  /**
   * Verifica se o card possui título.
   * @returns {boolean} true se houver título
   */
  protected hasTitulo(): boolean {
    return Boolean(this.titulo && this.titulo.trim().length > 0);
  }

  /**
   * Verifica se o card possui descrição.
   * @returns {boolean} true se houver descrição
   */
  protected hasDescricao(): boolean {
    return Boolean(this.descricao && this.descricao.trim().length > 0);
  }

  /**
   * Verifica se o card possui ícone.
   * @returns {boolean} true se houver ícone
   */
  protected hasIcone(): boolean {
    return Boolean(this.icone && this.icone.trim().length > 0);
  }

  /**
   * Verifica se o card possui ação de clique.
   * @returns {boolean} true se houver ação
   */
  protected hasAcao(): boolean {
    return Boolean(this.acao.observed);
  }

  /**
   * Retorna o aria-label do card ou um fallback baseado no título.
   * @returns {string} aria-label do card
   */
  protected getAriaLabel(): string {
    return this.ariaLabel || this.titulo || 'Card de menu';
  }

  /**
   * Retorna o cursor apropriado baseado na presença de ação.
   * @returns {string} cursor CSS
   */
  protected getCursor(): string {
    return this.hasAcao() ? 'pointer' : 'default';
  }
}
