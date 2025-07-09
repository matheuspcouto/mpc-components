/**
 * @Componente MpcModalComponent
 * Este componente é responsável por exibir um modal com título, texto, imagem e botões.
 *
 * modal {MpcModalConfig}: Configuração do modal.
 *
 * Exemplo de utilização:
 * <mpc-modal #modalExemplo></mpc-modal>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 08/07/2025
 */

import { Component } from '@angular/core';
import { MpcButtonDirective } from '../../directives/mpc-button/mpc-button.directive';

export interface MpcModalConfig {
  titulo: string,
  texto: string,
  textoBotao: string,
  imagem?: string,
  tipoModal?: any,
  botao?: () => void,
  textoSegundoBotao?: string,
  segundoBotao?: () => void
}

enum TamanhoModal {
  TELA_INTEIRA = 'tela-inteira',
  METADE_TELA = 'metade-tela'
}

export const TipoModal = {
  CONFIRMACAO: { tamanho: TamanhoModal.METADE_TELA },
  ALERTA: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/atencao.png' },
  ERRO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/error.png' },
  SUCESSO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'assets/img/modal/success.png' }
}

@Component({
  selector: 'mpc-modal',
  imports: [MpcButtonDirective],
  templateUrl: './mpc-modal.component.html',
  styleUrls: ['./mpc-modal.component.css']
})
export class MpcModalComponent {

  // Variáveis
  protected exibirModal: boolean = false;
  protected botao: () => void = () => { };
  protected segundoBotao: () => void = () => { };
  protected btnCopiarMensagemErro: any;
  protected isCopiado: boolean = false;
  protected isTelaInteira: boolean = false;
  protected modal!: MpcModalConfig;

  /**
   * Fecha o modal e reseta os estados internos.
   */
  fecharModal() { this.exibirModal = false; this.isCopiado = false; }

  /**
   * Abre o modal com a configuração informada.
   * @param modalConfig Configuração do modal
   */
  abrirModal(modalConfig: MpcModalConfig) {
    this.modal = modalConfig;

    this.isTelaInteira = this.modal.tipoModal.tamanho === TamanhoModal.TELA_INTEIRA;

    if (!this.modal.imagem && this.modal.tipoModal.imagem) { this.modal.imagem = this.modal.tipoModal.imagem; }

    this.botao = this.modal.botao || this.fecharModal;
    this.btnCopiarMensagemErro = this.modal.tipoModal === TipoModal.ERRO;

    if (this.modal.textoSegundoBotao && this.modal.segundoBotao) {
      this.segundoBotao = this.modal.segundoBotao;
    }

    this.exibirModal = true;
  };

  /**
   * Copia o texto do modal para a área de transferência e exibe notificação.
   */
  copiarCodigo() {
    navigator.clipboard.writeText(this.modal.texto);
    this.isCopiado = true;
    setTimeout(() => { this.isCopiado = false; }, 3000);
  }
}
