/**
 * @Componente MpcCardMenuComponent
 *
 * Este componente exibe um card de menu com ícone e conteúdo customizável via ng-content.
 * Ideal para navegação ou apresentação de funcionalidades com design atrativo.
 *
 * @Propriedades
 * @Input() icone {string} - Classe do ícone (opcional, ex: 'bi bi-house')
 *
 * O conteúdo do card (título, subtítulo, etc.) deve ser passado via ng-content:
 *
 * @Exemplo
 * ```html
 * <mpc-card-menu icone="bi bi-house">
 *   <span titulo>Início</span>
 *   <span subtitulo>Página inicial do sistema</span>
 * </mpc-card-menu>
 * ```
 *
 * @Variáveis CSS
 * --mpc-color-bg-card-menu: Cor de fundo do card (padrão: white)
 * --mpc-color-bg-icone-card-menu: Cor de fundo do ícone (padrão: var(--mpc-color-primary))
 * --mpc-color-text-icone-card-menu: Cor do texto do ícone (padrão: white)
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mpc-card-menu',
  imports: [],
  templateUrl: './mpc-card-menu.component.html',
  styleUrl: './mpc-card-menu.component.css'
})
export class MpcCardMenuComponent {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Classe do ícone (ex: 'bi bi-telephone') */
  @Input() icone: string = '';

  // ===== MÉTODOS PÚBLICOS =====
  /**
   * Verifica se o card possui ícone.
   * @returns {boolean} true se houver ícone
   */
  protected hasIcone(): boolean {
    return Boolean(this.icone && this.icone.trim().length > 0);
  }
}
