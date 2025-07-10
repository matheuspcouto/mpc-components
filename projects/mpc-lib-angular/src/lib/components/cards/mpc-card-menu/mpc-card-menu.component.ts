/**
 * @Componente MpcCardMenuComponent
 * 
 * Este componente é responsável por exibir cards de menu interativos com ícone, título,
 * descrição e ação de clique. Ideal para navegação rápida e ações de menu.
 * O card possui design limpo com ícone circular e layout flexível.
 * 
 * @Propriedades
 * Input titulo {string} - Título principal do card (obrigatório)
 * Input descricao {string} - Descrição do card (opcional)
 * Input icone {string} - Classe do ícone (obrigatório, ex: 'bi bi-telephone')
 * Output acao {EventEmitter<void>} - Evento emitido ao clicar no card (opcional)
 * 
 * @Exemplo
 * ```html
 * <mpc-card-menu
 *   icone="bi bi-linkedin"
 *   titulo="LinkedIn"
 *   descricao="Conecte-se conosco"
 *   (acao)="onLinkedInClick()" />
 * ```
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

@Component({
  selector: 'mpc-card-menu',
  imports: [],
  templateUrl: './mpc-card-menu.component.html',
  styleUrl: './mpc-card-menu.component.css'
})
export class MpcCardMenuComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() titulo: string = '';
  /** Descrição do card */
  @Input() descricao?: string;
  /** Classe do ícone (ex: 'bi bi-telephone') */
  @Input() icone: string = '';

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
