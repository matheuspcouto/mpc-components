/**
 * @Componente MpcFormProgressBarComponent
 * Este componente é responsável por exibir uma barra de progresso de formulário.
 *
 * etapa {number}: número da etapa atual.
 * totalEtapas {number}: total de etapas do formulário.
 * barColor {string}: cor da barra de progresso.
 * color {string}: cor do texto.
 *
 * Exemplo de utilização:
 * <mpc-form-progress-bar barColor="var(--color-secondary)" color="var(--color-tertiary)" [etapaAtual]="1" [totalEtapas]="3"></mpc-form-progress-bar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-form-progress-bar',
  imports: [],
  templateUrl: './mpc-form-progress-bar.component.html',
  styleUrl: './mpc-form-progress-bar.component.css'
})
export class MpcFormProgressBarComponent {

  @Input() etapaAtual: number = 1;
  @Input() totalEtapas: number = 1;

  @Input() barColor: string = '';
  @Input() color: string = '';
}
