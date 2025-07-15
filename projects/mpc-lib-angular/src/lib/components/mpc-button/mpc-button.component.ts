/**
 * @Componente MpcButtonComponent
 *
 * Este componente é responsável por exibir um botão estilizado, permitindo a inclusão de texto e/ou ícone,
 * personalização de cores e acessibilidade.
 *
 * @Propriedades
 * @Input() id {string} - ID do botão (opcional)
 * @Input() tabIndex {number} - Índice de tabulação (opcional)
 * @Input() ariaLabel {string} - Label para acessibilidade (opcional)
 * @Input() texto {string} - Texto exibido no botão (opcional)
 * @Input() icone {string} - Classes do ícone (ex: 'bi bi-check') (opcional)
 * @Input() posicaoIcone {'esquerda' | 'direita'} - Posição do ícone no botão (opcional, padrão: 'direita')
 * @Input() disabled {boolean} - Indica se o botão está desabilitado (opcional)
 *
 * @Exemplo
 * ```html
 * <!-- Botão Básico -->
 * <mpc-button texto="Salvar"></mpc-button>
 *
 * <!-- Botão com Ícone à Direita -->
 * <mpc-button
 *   [icone]="'bi bi-check'"
 *   [posicaoIcone]="'direita'"
 *   texto="Salvar">
 * </mpc-button>
 *
 * <!-- Botão com Ícone à Esquerda -->
 * <mpc-button
 *   [icone]="'bi bi-arrow-left'"
 *   [posicaoIcone]="'esquerda'"
 *   texto="Voltar">
 * </mpc-button>
 *
 * <!-- Botão Apenas com Ícone -->
 * <mpc-button [icone]="'bi bi-plus'"></mpc-button>
 * ```
 *
 * @Enum
 * PosicoesIcone: Enum para posições do ícone
 * - ESQUERDA: Ícone posicionado à esquerda do texto
 * - DIREITA: Ícone posicionado à direita do texto
 *
 * @Variáveis CSS
 * --mpc-bg-color-btn: Cor de fundo padrão do botão 
 * --mpc-text-color-btn: Cor do texto padrão do botão 
 * --mpc-bg-color-btn-hover: Cor de fundo do botão ao passar o mouse
 * --mpc-text-color-btn-hover: Cor do texto do botão ao passar o mouse
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

enum PosicoesIcone {
  ESQUERDA = 'esquerda',
  DIREITA = 'direita',
}

@Component({
  selector: 'mpc-button',
  imports: [],
  templateUrl: './mpc-button.component.html',
  styleUrls: ['./mpc-button.component.scss']
})
export class MpcButtonComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Texto exibido no botão */
  @Input() texto: string = '';
  /** Indica se o botão está desabilitado */
  @Input() disabled: boolean = false;
  /** Posição do ícone no botão */
  @Input() posicaoIcone: string = PosicoesIcone.DIREITA;
  /** Classes do ícone, ex: 'bi bi-check' */
  @Input() icone: string = '';
}