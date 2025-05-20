/**
 * @Componente MpcTabsComponent
 * Este componente é responsável por exibir uma lista de tabs com títulos e conteúdos.
 *
 * tabs {Tab[]}: Lista de tabs.
 * tabIndex {number}: (opcional) Índice da tab selecionada.
 * ariaLabel {string}: (opcional) Rótulo de acessibilidade das tabs.
 * tabSelected {EventEmitter<string>}: Evento emitido ao selecionar uma tab.
 *
 * Exemplo de utilização:
 * <mpc-tabs [tabs]="tabs" [tabIndex]="0" ariaLabel="Tabs" (tabSelected)="selecionarTab($event)"></mpc-tabs>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessibilityInputs } from '../../core/accessibility-inputs';

export interface Tab {
  id: string;
  titulo: string;
}

@Component({
  selector: 'mpc-tabs',
  imports: [CommonModule],
  templateUrl: './mpc-tabs.component.html',
  styleUrl: './mpc-tabs.component.css'
})
export class MpcTabsComponent extends AccessibilityInputs implements OnInit {

  @Input() tabs: Tab[] = [];

  @Output() tabSelected = new EventEmitter<Tab>();

  protected tabSelecionada!: Tab;

  ngOnInit(): void {
    this.tabSelecionada = this.tabs.length > 0 ? this.tabs[0] : { id: '', titulo: '' };
  }

  selecionarTab(tab: Tab): void {
    this.tabSelecionada = tab;
    this.tabSelected.emit(tab);
  }
}
