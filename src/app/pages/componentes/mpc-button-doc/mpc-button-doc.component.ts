import { Component } from '@angular/core';
import { MpcButtonComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from 'mpc-lib-angular';

/**
 * @Componente MpcButtonDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de botão (button) da biblioteca MPC,
 * demonstrando como utilizar o botão e tratar eventos de clique.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-buttons></app-buttons>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-buttons',
  imports: [MpcButtonComponent, MpcSectionComponent],
  templateUrl: './mpc-button-doc.component.html',
  styleUrl: './mpc-button-doc.component.scss'
})
export class MpcButtonDocComponent {
  /**
   * Exibe um alerta com o texto informado.
   * @param texto Texto a ser exibido no alerta
   */
  alert(texto: string) {
    alert(texto);
  }
}
