import { Component, ViewChild } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';

@Component({
  selector: 'app-modais',
  imports: [MpcNavbarComponent, MpcModalComponent, MpcButtonComponent],
  templateUrl: './modais.component.html',
  styleUrl: './modais.component.css'
})
export class ModaisComponent {

  erro: any;
  @ViewChild('modalExemplo', { static: true }) modalExemplo!: MpcModalComponent;

  abrirModalConfirmacao() {
    const modalConfirmacao: MpcModalConfig = {
      titulo: 'Modal de Confirmação',
      texto: 'Este é um modal de confirmação',
      tipoModal: TipoModal.CONFIRMACAO,
      botao: () => { return true; },
      textoBotao: 'OK',
      segundoBotao: () => { this.modalExemplo?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalExemplo?.abrirModal(modalConfirmacao);
  }

  abrirModalSucesso() {
    const modalSucesso: MpcModalConfig = {
      titulo: 'Modal de Sucesso',
      texto: 'Este é um modal de sucesso',
      tipoModal: TipoModal.SUCESSO,
      botao: () => { return true; },
      textoBotao: 'OK',
      segundoBotao: () => { this.modalExemplo?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalExemplo?.abrirModal(modalSucesso);
  }

  abrirModalAlerta() {
    const modalAlerta: MpcModalConfig = {
      titulo: 'Modal de Alerta',
      texto: 'Este é um modal de alerta',
      tipoModal: TipoModal.ALERTA,
      botao: () => { return true; },
      textoBotao: 'OK',
      segundoBotao: () => { this.modalExemplo?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalExemplo?.abrirModal(modalAlerta);
  }

  abrirModalErro() {
    const modalErro: MpcModalConfig = {
      titulo: 'Modal de Erro',
      texto: 'Este é um modal de erro',
      tipoModal: TipoModal.ERRO,
      botao: () => this.modalExemplo?.fecharModal(),
      textoBotao: 'OK',
      // Não é necessário passar o segundo botão
      // O modal de erro já possui um botão de copiar o erro
    }

    this.modalExemplo?.abrirModal(modalErro);
  }

}
