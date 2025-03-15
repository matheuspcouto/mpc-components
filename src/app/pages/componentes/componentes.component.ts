import { Component, ViewChild } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { ToastrService } from 'ngx-toastr';
import { MpcModalComponent, TipoModal } from '../../shared/components/mpc-modal/mpc-modal.component';
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';
import { MpcModalConfig } from '../../shared/components/mpc-modal/mpc-modal.directive';
import { MpcComprovanteComponent } from '../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcComprovanteConfig } from '../../shared/components/mpc-comprovante/mpc-comprovante.directive';
import { MpcLoaderService } from '../../shared/components/mpc-loader/mpc-loader.service';
import { ActivatedRoute } from '@angular/router';
import { MpcCardComponent } from "../../shared/components/mpc-card/mpc-card.component";
import { MpcTabsComponent } from "../../shared/components/mpc-tabs/mpc-tabs.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componentes',
  imports: [
    MpcNavbarComponent, MpcModalComponent, MpcComprovanteComponent,
    MpcButtonComponent, MpcCardComponent, MpcTabsComponent, CommonModule
  ],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export default class ComponentesComponent {

  constructor(private activatedRoute: ActivatedRoute, private notificationService: ToastrService, private mpcLoaderService: MpcLoaderService) { }

  erro: any;
  @ViewChild('modalExemplo', { static: true }) modalExemplo!: MpcModalComponent;

  tabs = [
    { id: 'conteudoTab1', titulo: 'Tab 1' },
    { id: 'conteudoTab2', titulo: 'Tab 2' },
    { id: 'conteudoTab3', titulo: 'Tab 3' },
  ]
  tabSelecionada: string = 'conteudoTab1';

  selectTab(tab: string) {
    this.tabSelecionada = tab;
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }


  mostrarNotificacao() {
    this.notificationService.success('Notificação de sucesso', 'Título da notificação');
    this.notificationService.error('Notificação de erro', 'Título da notificação');
    this.notificationService.warning('Notificação de alerta', 'Título da notificação');
    this.notificationService.info('Notificação de informação', 'Título da notificação');
  }

  alert(texto: string) {
    alert(texto);
  }

}
