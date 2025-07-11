
/**
 * @Componente HomeComponent
 *
 * Este componente é responsável por exibir a página inicial da aplicação, apresentando cards de menu,
 * divisores de página com imagem e botões de navegação. Permite acesso rápido à documentação da biblioteca.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-home></app-home>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
 */

import { Component } from '@angular/core';
import { MpcPageDividerImgComponent, MpcCardMenuComponent, MpcButtonComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcPageDividerImgComponent, MpcButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  /**
   * Abre a página da biblioteca no npm em uma nova aba.
   */
  irParaLib() {
    window.open('https://www.npmjs.com/package/mpc-lib-angular?activeTab=readme', '_blank');
  }
}
