import { ModalConfig } from './modal.directive';
import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

enum TamanhoModal {
  TELA_INTEIRA = 'tela-inteira',
  METADE_TELA = 'metade-tela'
}

export const TipoModal = {
  CONFIRMACAO: { tamanho: TamanhoModal.METADE_TELA },
  AVISO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'atencao.png' },
  ERRO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'error.png' },
  SUCESSO: { tamanho: TamanhoModal.TELA_INTEIRA, imagem: 'success.png' }
}
@Component({
  selector: 'modal',
  imports: [ CommonModule ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  exibirModal: boolean = false;
  modal: any;
  botao: () => void = () => { };
  segundoBotao: () => void = () => { };
  btnCopiarMensagemErro: any;
  isCopiado: boolean = false;
  isTelaInteira: boolean = false;

  constructor(private modalService: ModalService, private notificationService: ToastrService) { };

  fecharModal() { this.modalService.hide(); this.exibirModal = false; this.isCopiado = false; }

  abrirModal(modal: ModalConfig) {
    this.isTelaInteira = modal.tipoModal.tamanho === TamanhoModal.TELA_INTEIRA;

    if (!modal.imagem && modal.tipoModal.imagem) { modal.imagem = modal.tipoModal.imagem; }

    this.botao = modal.botao || this.fecharModal;
    this.btnCopiarMensagemErro = modal.tipoModal === TipoModal.ERRO;

    if (modal.textoSegundoBotao && modal.segundoBotao) {
      this.segundoBotao = modal.segundoBotao;
    }

    this.modal = modal;
    this.modalService.show();
    this.exibirModal = true;
  };

  copiarCodigo() {
    navigator.clipboard.writeText(this.modal.texto);
    this.isCopiado = true;
    this.notificationService.info('Copiado para área de transferência', '');
  }
}
