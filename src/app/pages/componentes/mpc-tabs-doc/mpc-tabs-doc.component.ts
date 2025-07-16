/**
 * @Componente MpcTabsDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de abas (tabs) da biblioteca MPC,
 * demonstrando como criar e selecionar abas dinamicamente.
 *
 * @Propriedades
 * @protected tabs {Tab[]} - Lista de abas disponíveis
 * @protected tabSelecionada {Tab} - Aba atualmente selecionada
 *
 * @Exemplo
 * ```html
 * <app-tabs></app-tabs>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { Component } from '@angular/core';
import { MpcTabsComponent, Tab, MpcSectionComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-tabs',
  imports: [MpcTabsComponent, MpcSectionComponent],
  templateUrl: './mpc-tabs-doc.component.html',
  styleUrl: './mpc-tabs-doc.component.scss'
})
export class MpcTabsDocComponent {

  /**
   * Lista de abas disponíveis.
   */
  tabs: Tab[] = [
    { id: 'conteudoTab1', titulo: 'Tab 1' },
    { id: 'conteudoTab2', titulo: 'Tab 2' },
    { id: 'conteudoTab3', titulo: 'Tab 3' },
  ];

  /**
   * Aba atualmente selecionada.
   */
  tabSelecionada: Tab = this.tabs[0];

  /**
   * Seleciona a aba informada.
   * @param tab Aba a ser selecionada
   */
  selectTab(tab: Tab) {
    this.tabSelecionada = tab;
  }

}
