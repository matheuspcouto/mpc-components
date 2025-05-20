/**
 * @Componente MpcFooterComponent
 * Este componente é responsável por exibir um footer na tela.
 *
 *
 * Exemplo de utilização:
 * <mpc-footer></mpc-footer>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component } from '@angular/core';

@Component({
  selector: 'mpc-footer',
  templateUrl: './mpc-footer.component.html',
  styleUrls: ['./mpc-footer.component.css']
})
export class MpcFooterComponent {

  protected anoAtual = new Date().getFullYear();
}
