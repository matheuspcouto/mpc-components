/**
 * @Componente MpcFormProgressBarComponent
 * 
 * Este componente é responsável por exibir uma barra de progresso para formulários,
 * mostrando o progresso atual e total de etapas de forma visual e intuitiva.
 * 
 * @Propriedades
 * @Input() etapaAtual {number} - Etapa atual do formulário (obrigatório)
 * @Input() totalEtapas {number} - Total de etapas do formulário (obrigatório)
 * 
 * @Exemplo
 * ```html
 * <!-- Barra de Progresso com Controle -->
 * <mpc-form-progress-bar
 *   [etapaAtual]="etapaAtual"
 *   [totalEtapas]="totalEtapas"
 *   id="barra-progresso"
 *   [tabIndex]="0"
 *   ariaLabel="Barra de progresso do formulário" />
 * ```
 * 
 * @Variáveis CSS
 * --mpc-color-bar: Cor da barra de progresso (padrão: var(--mpc-color-primary))
 * --mpc-color-text: Cor do texto (padrão: var(--mpc-color-primary))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-form-progress-bar',
  imports: [],
  templateUrl: './mpc-form-progress-bar.component.html',
  styleUrls: ['./mpc-form-progress-bar.component.scss']
})
export class MpcFormProgressBarComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Número da etapa atual */
  @Input() etapaAtual: number = 1;
  /** Total de etapas do formulário */
  @Input() totalEtapas: number = 1;
}
