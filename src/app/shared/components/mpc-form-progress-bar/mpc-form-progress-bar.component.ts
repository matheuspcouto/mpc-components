/**
 * @Componente MpcFormProgressBarComponent
 * Este componente é responsável por exibir uma barra de progresso do formulário com etapas.
 *
 * etapa {number}: número da etapa atual.
 * totalEtapas {number}: total de etapas do formulário.
 *
 * Exemplo de utilização:
 * <mpc-form-progress-bar [etapaAtual]="1" [totalEtapas]="3"></mpc-form-progress-bar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, input } from '@angular/core';

@Component({
  selector: 'mpc-form-progress-bar',
  imports: [],
  templateUrl: './mpc-form-progress-bar.component.html',
  styleUrl: './mpc-form-progress-bar.component.css'
})
export class MpcFormProgressBarComponent {

  public etapaAtual = input<number>(1);
  public totalEtapas = input<number>(1);
}
