/**
 * @Componente MpcTabsComponent
 * 
 * Este componente é responsável por exibir abas de navegação com design limpo,
 * suportando múltiplas abas e navegação entre elas de forma intuitiva.
 * 
 * @Propriedades
 * @Input() id {string} - ID do campo (obrigatório)
 * @Input() tabIndex {number} - Índice do campo (opcional)
 * @Input() ariaLabel {string} - Label do campo (opcional)
 * @Input() tabs {Tab[]} - Configuração das abas (obrigatório)
 * 
 * @Eventos
 * @Output() tabSelected {EventEmitter<Tab>} - Emite a aba selecionada
 * 
 * @Exemplo
 * ```html
 * <!-- Tabs Básicas -->
 * <mpc-tabs
 *   [tabs]="configAbas"
 *   (tabSelected)="onTabSelected($event)"
 *   id="tabs-exemplo"
 *   [tabIndex]="0"
 *   ariaLabel="Abas de navegação" />
 * 
 * <!-- Configuração das Abas -->
 * const configAbas: Tab[] = [
 *   { id: 'tab1', titulo: 'Informações' },
 *   { id: 'tab2', titulo: 'Configurações' },
 *   { id: 'tab3', titulo: 'Relatórios' }
 * ];
 * ```
 * 
 * @Interfaces
 * Tab: Interface para configuração das abas
 * - id: string - Identificador único da aba
 * - titulo: string - Título da aba
 * 
 * @Variáveis CSS
 * --mpc-color-text-tabs: Cor do texto das abas (padrão: var(--mpc-color-tertiary))
 * --mpc-color-text-active-tabs: Cor do texto da aba ativa (padrão: var(--mpc-color-primary))
 * --mpc-color-border-tabs: Cor da borda das abas (padrão: var(--mpc-color-tertiary))
 * --mpc-color-border-active-tabs: Cor da borda da aba ativa (padrão: var(--mpc-color-primary))
 * --mpc-font-tabs: Fonte das abas (padrão: var(--mpc-font-subtitle))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccessibilityInputs } from '../../../shared/accessibility-inputs';

export interface Tab {
  /** Identificador único da aba */
  id: string;
  /** Título exibido na aba */
  titulo: string;
}

@Component({
  selector: 'mpc-tabs',
  imports: [],
  templateUrl: './mpc-tabs.component.html',
  styleUrls: ['./mpc-tabs.component.scss']
})
export class MpcTabsComponent extends AccessibilityInputs implements OnInit {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Lista de abas a serem exibidas */
  @Input() tabs: Tab[] = [];

  /** Evento emitido quando uma aba é selecionada */
  @Output() tabSelected = new EventEmitter<Tab>();

  // ===== PROPRIEDADES PROTEGIDAS =====
  /** Aba atualmente selecionada */
  protected tabSelecionada!: Tab;

  // ===== MÉTODOS DO CICLO DE VIDA =====

  /**
   * Inicializa o componente selecionando a primeira aba por padrão.
   */
  ngOnInit(): void {
    this.tabSelecionada = this.tabs.length > 0 ? this.tabs[0] : { id: '', titulo: '' };
    this.selecionarTab(this.tabSelecionada);
  }

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Seleciona uma aba e emite o evento de seleção.
   * @param tab Aba a ser selecionada
   */
  selecionarTab(tab: Tab): void {
    this.tabSelecionada = tab;
    this.tabSelected.emit(tab);
  }
}
