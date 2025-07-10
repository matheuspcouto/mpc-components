/**
 * @Componente MpcTabsComponent
 * Este componente exibe uma lista de abas (tabs) com títulos e conteúdos customizáveis, permitindo seleção e acessibilidade.
 *
 * @Propriedades
 * Input id {string} (opcional): Id do componente para acessibilidade.
 * Input tabIndex {number} (opcional): Índice de tabulação do componente.
 * Input ariaLabel {string} (opcional): Rótulo de acessibilidade das tabs.
 * Input tabs {Tab[]}: Lista de abas a serem exibidas.
 *
 * @Eventos
 * Output tabSelected: Emite o objeto Tab selecionado ao trocar de aba.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

export interface Tab {
  id: string;
  titulo: string;
}

@Component({
  selector: 'mpc-tabs',
  imports: [],
  templateUrl: './mpc-tabs.component.html',
  styleUrl: './mpc-tabs.component.css'
})
export class MpcTabsComponent extends AccessibilityInputs implements OnInit {

  @Input() tabs: Tab[] = [];

  @Output() tabSelected = new EventEmitter<Tab>();

  protected tabSelecionada!: Tab;

  ngOnInit(): void {
    this.tabSelecionada = this.tabs.length > 0 ? this.tabs[0] : { id: '', titulo: '' };
    this.selecionarTab(this.tabSelecionada);
  }

  selecionarTab(tab: Tab): void {
    this.tabSelecionada = tab;
    this.tabSelected.emit(tab);
  }
}
