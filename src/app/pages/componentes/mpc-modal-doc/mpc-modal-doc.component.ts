import { Component, ViewChild } from '@angular/core';
import { MpcModalComponent, MpcModalConfig, TipoModal, MpcButtonComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from 'mpc-lib-angular';

/**
 * @Componente MpcModalDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de modal da biblioteca MPC,
 * demonstrando como abrir diferentes tipos de modais programaticamente.
 *
 * @Propriedades
 * @protected erro {any} - Exemplo de variável de erro
 * @ViewChild modalExemplo {MpcModalComponent} - Referência ao modal de exemplo
 *
 * @Exemplo
 * ```html
 * <app-modais></app-modais>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-modais',
  imports: [MpcModalComponent, MpcSectionComponent, MpcButtonComponent],
  templateUrl: './mpc-modal-doc.component.html',
  styleUrl: './mpc-modal-doc.component.scss'
})
export class MpcModalDocComponent {

  /**
   * Exemplo de variável de erro.
   */
  erro: any;
  /**
   * Referência ao modal de exemplo.
   */
  @ViewChild('modalExemplo', { static: true }) modalExemplo!: MpcModalComponent;

  /**
   * Abre um modal de confirmação.
   */
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

  /**
   * Abre um modal de sucesso.
   */
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

  /**
   * Abre um modal de alerta.
   */
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

  /**
   * Abre um modal de erro.
   */
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
