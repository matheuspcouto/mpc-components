import { Component } from '@angular/core';
import { MpcCardComponent, MpcCardBackGroundImgComponent, MpcCardEventoComponent, MpcCardMenuComponent, MpcSectionComponent } from 'mpc-lib-angular';

/**
 * @Componente MpcCardsDocComponent
 *
 * Este componente exibe exemplos e documentação dos componentes de cards da biblioteca MPC,
 * incluindo cards verticais, horizontais, com menu e eventos.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-cards></app-cards>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-cards',
  imports: [MpcCardComponent, MpcCardBackGroundImgComponent, MpcCardMenuComponent, MpcCardEventoComponent, MpcSectionComponent],
  templateUrl: './mpc-cards-doc.component.html',
  styleUrl: './mpc-cards-doc.component.scss'
})
export class MpcCardsDocComponent {
  /**
   * Exemplo de ação ao clicar em um card de menu.
   */
  onMenuCardClick() {
    alert('Ação executada!');
  }
}
