/**
 * @Componente MpcBtnFloatDocComponent
 *
 * Este componente exibe exemplos e documentação do botão flutuante da biblioteca MPC,
 * demonstrando como utilizar o botão para rolar a página para o topo.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-btn-float-doc></app-btn-float-doc>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { Component } from '@angular/core';
import { MpcBtnFloatComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-btn-float-doc',
  imports: [MpcBtnFloatComponent, MpcSectionComponent],
  templateUrl: './mpc-btn-float-doc.component.html',
  styleUrl: './mpc-btn-float-doc.component.css'
})
export class MpcBtnFloatDocComponent {
  /**
   * Realiza a rolagem suave para o topo da página.
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 