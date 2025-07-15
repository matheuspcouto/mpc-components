/**
 * @Componente MpcBtnFloatComponent
 *
 * Este componente exibe um botão flutuante fixo para rolar a página ao topo, permitindo personalização de ícone e cores.
 *
 * @Propriedades
 * @Input() id {string} - ID do botão (opcional)
 * @Input() icone {string} - Classes do ícone (ex: 'bi bi-arrow-up-short') (opcional)
 * @Input() disabled {boolean} - Indica se o botão está desabilitado (opcional)
 * @Input() tabIndex {number} - Índice de tabulação (opcional)
 * @Input() ariaLabel {string} - Label para acessibilidade (opcional)
 *
 * @Exemplo
 * ```html
 * <!-- Botão Flutuante Básico -->
 * <mpc-btn-float [icone]="'bi bi-arrow-up-short'" id="btn-float"></mpc-btn-float>
 * ```
 *
 * @Variáveis CSS
 * --mpc-btn-float-bg: Cor de fundo do botão (padrão: #007bff)
 * --mpc-btn-float-color: Cor do ícone (padrão: #fff)
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

@Component({
  selector: 'mpc-btn-float',
  templateUrl: './mpc-btn-float.component.html',
  styleUrls: ['./mpc-btn-float.component.scss']
})
export class MpcBtnFloatComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PÚBLICAS ===== //
  /** Classes do ícone, ex: 'bi bi-arrow-up-short' */
  @Input() icone: string = '';
  /** Indica se o botão está desabilitado */
  @Input() disabled: boolean = false;
} 