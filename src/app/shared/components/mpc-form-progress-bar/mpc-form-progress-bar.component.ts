/**
 * @Componente MpcFormProgressBarComponent
 * Este componente é responsável por exibir uma barra de progresso do formulário com etapas.
 *
 * etapa {number}: número da etapa atual.
 *
 * Exemplo de utilização:
 * <mpc-form-progress-bar [etapa]="etapa"></mpc-form-progress-bar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-form-progress-bar',
  imports: [],
  templateUrl: './mpc-form-progress-bar.component.html',
  styleUrl: './mpc-form-progress-bar.component.css'
})
export class MpcFormProgressBarComponent {

  @Input() etapa: number = 1;

  getIconeEtapa(etapa: number, passo: number) {
    let icon = `bi bi-${passo}-circle-fill`;
    if (etapa === passo) icon = 'bi bi-three-dots';
    if (etapa > passo) icon = 'bi bi-check-circle-fill completed';
    return icon;
  }
}
