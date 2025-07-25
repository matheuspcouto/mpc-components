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

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcCardMenuComponent, MpcButtonComponent, MpcSectionComponent, MpcPageDividerImgComponent, MpcPageHeaderHomeComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-home',
  imports: [MpcCardMenuComponent, MpcPageDividerImgComponent, MpcButtonComponent, MpcSectionComponent, MpcPageHeaderHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {

  private readonly router = inject(Router);

  /**
   * Abre a página da biblioteca no npm em uma nova aba.
   */
  irParaDocumentacao() {
    this.router.navigate([Rotas.LIB_DOC])
  }
}
