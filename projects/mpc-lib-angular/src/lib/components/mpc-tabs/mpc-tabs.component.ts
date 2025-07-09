/**
 * @Componente MpcTabsComponent
 * Este componente exibe uma lista de abas (tabs) com títulos e conteúdos customizáveis, permitindo seleção e acessibilidade.
 *
 * @Input id {string} (opcional): Id do componente para acessibilidade.
 * @Input tabIndex {number} (opcional): Índice de tabulação do componente.
 * @Input ariaLabel {string} (opcional): Rótulo de acessibilidade das tabs.
 * @Input tabs {Tab[]}: Lista de abas a serem exibidas.
 * @Input textColor {string} (opcional): Cor do texto das abas.
 *
 * @Output tabSelected: Emite o objeto Tab selecionado ao trocar de aba.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
export class MpcTabsComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() tabs: Tab[] = [];

  // Estilos
  @Input() textColor?: string = '';

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
