import { Component } from '@angular/core';
import { MpcTabsComponent, Tab } from '../../../../../projects/mpc-lib-angular/src/lib/components/mpc-tabs/mpc-tabs.component';

@Component({
  selector: 'app-tabs',
  imports: [MpcTabsComponent],
  templateUrl: './mpc-tabs-doc.component.html',
  styleUrl: './mpc-tabs-doc.component.css'
})
export class MpcTabsDocComponent {

  tabs: Tab[] = [
    { id: 'conteudoTab1', titulo: 'Tab 1' },
    { id: 'conteudoTab2', titulo: 'Tab 2' },
    { id: 'conteudoTab3', titulo: 'Tab 3' },
  ]

  tabSelecionada: Tab = this.tabs[0];

  selectTab(tab: Tab) {
    this.tabSelecionada = tab;
  }

}
