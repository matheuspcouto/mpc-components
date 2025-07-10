/**
 * @Componente MpcCardMenuComponent
 * 
 * Este componente é responsável por exibir cards de menu com ícone, título e descrição,
 * ideal para navegação e apresentação de funcionalidades com design atrativo.
 * 
 * @Propriedades
 * @Input() id {string} - ID do card (obrigatório)
 * @Input() tabIndex {number} - Índice do card (opcional)
 * @Input() ariaLabel {string} - Label do card (opcional)
 * @Input() titulo {string} - Título do card (obrigatório)
 * @Input() descricao {string} - Descrição do card (opcional)
 * @Input() icone {string} - Classe do ícone (obrigatório, ex: 'bi bi-house')
 * 
 * @Exemplo
 * ```html
 * <!-- Card de Menu Básico -->
 * <mpc-card-menu
 *   titulo="Início"
 *   descricao="Página inicial do sistema"
 *   icone="bi bi-house"
 *   id="card-inicio"
 *   [tabIndex]="0"
 *   ariaLabel="Card do menu Início" />
 * 
 * <!-- Card de Menu com Ação -->
 * <mpc-card-menu
 *   titulo="Configurações"
 *   descricao="Ajustar preferências"
 *   icone="bi bi-gear"
 *   (acao)="onMenuClick()"
 *   id="card-config"
 *   [tabIndex]="0"
 *   ariaLabel="Card do menu Configurações" />
 * ```
 * 
 * @Variáveis CSS
 * --mpc-color-bg-card-menu: Cor de fundo do card (padrão: white)
 * --mpc-color-title-card-menu: Cor do título do card (padrão: var(--mpc-color-primary))
 * --mpc-color-description-card-menu: Cor da descrição do card (padrão: var(--mpc-color-tertiary))
 * --mpc-color-bg-icone-card-menu: Cor de fundo do ícone (padrão: var(--mpc-color-primary))
 * --mpc-color-text-icone-card-menu: Cor do texto do ícone (padrão: white)
 * --mpc-font-title-card-menu: Fonte do título do card (padrão: var(--mpc-font-subtitle))
 * --mpc-font-description-card-menu: Fonte da descrição do card (padrão: var(--mpc-font-default))
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
