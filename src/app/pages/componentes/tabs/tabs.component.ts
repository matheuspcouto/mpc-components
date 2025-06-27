import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcTabsComponent, Tab } from '../../../shared/components/mpc-tabs/mpc-tabs.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-tabs',
  imports: [ CommonModule, MpcNavbarComponent, MpcTabsComponent, MpcFooterComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

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
