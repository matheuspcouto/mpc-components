/**
 * @Componente MpcFormProgressBarComponent
 * Este componente é responsável por exibir uma barra de progresso de formulário.
 *
 * etapa {number}: número da etapa atual.
 * totalEtapas {number}: total de etapas do formulário.
 *
 * Exemplo de utilização:
 * <mpc-form-progress-bar [etapaAtual]="1" [totalEtapas]="3"></mpc-form-progress-bar>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, Input } from '@angular/core';

// TODO: Cores de fundo e texto
@Component({
  selector: 'mpc-form-progress-bar',
  imports: [],
  templateUrl: './mpc-form-progress-bar.component.html',
  styleUrl: './mpc-form-progress-bar.component.css'
})
export class MpcFormProgressBarComponent {

  @Input() etapaAtual: number = 1;
  @Input() totalEtapas: number = 1;
}
