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
 * @updated 04/07/2025
 */

import { MpcModalConfig } from './mpc-modal.directive';
import { Component, inject } from '@angular/core';
import { MpcModalService } from './mpc-modal.service';
import { ToastrService } from 'ngx-toastr';
import { MpcButtonComponent } from '../mpc-button/mpc-button.component';

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
  imports: [MpcButtonComponent],
  templateUrl: './mpc-modal.component.html',
  styleUrls: ['./mpc-modal.component.css']
})
export class MpcModalComponent {
  protected exibirModal: boolean = false;
  protected botao: () => void = () => { };
  protected segundoBotao: () => void = () => { };
  protected btnCopiarMensagemErro: any;
  protected isCopiado: boolean = false;
  protected isTelaInteira: boolean = false;
  protected modal!: MpcModalConfig;

 private readonly notificationService = inject(ToastrService);
 private readonly modalService = inject(MpcModalService);

  /**
   * Fecha o modal e reseta os estados internos.
   */
  fecharModal() { this.modalService.hide(); this.exibirModal = false; this.isCopiado = false; }

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

    this.modalService.show();
    this.exibirModal = true;
  };

  /**
   * Copia o texto do modal para a área de transferência e exibe notificação.
   */
  copiarCodigo() {
    navigator.clipboard.writeText(this.modal.texto);
    this.isCopiado = true;
    this.notificationService.info('Copiado para área de transferência', '');
    setTimeout(() => { this.isCopiado = false; }, 3000);
  }
}
