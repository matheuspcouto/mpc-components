import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ModalComprovanteService } from './modal-comprovante.service';
import { ModalComprovanteConfig } from './modal-comprovante.directive';

@Component({
  selector: 'comprovante',
  imports: [CommonModule],
  templateUrl: './modal-comprovante.component.html',
  styleUrls: ['./modal-comprovante.component.css']
})
export class ModalComprovanteComponent {
  exibir: boolean = false;
  modal: any;
  dados: any;
  sexo: string = 'M';
  botao: () => void = () => { };
  isCopiado: boolean = false;

  constructor(private modalComprovanteService: ModalComprovanteService, private notificationService: ToastrService) { };

  fecharComprovante() { this.modalComprovanteService.hide(); this.exibir = false; this.isCopiado = false; }

  abrirComprovante(modal: ModalComprovanteConfig, sexo: string) {
    this.dados = modal.dados;
    this.botao = modal.botao || this.fecharComprovante;
    this.sexo = sexo;
    this.modal = modal;
    this.modalComprovanteService.show();
    this.exibir = true;
  };

  copiarCodigo() {
    navigator.clipboard.writeText(this.dados.id);
    this.isCopiado = true;
    this.notificationService.info('Copiado para área de transferência', '');
  }

  pedirLinkPagamento() {
    return;
    const telefone = this.sexo === 'M' ? '' : ''; // telefone de quem vai cuidar do financeiro
    let messageText = `Olá, eu gostaria de obter o pix / link de pagamento da inscrição *${this.dados.id}* do AAAAA`;
    let url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${messageText}`;
    window.open(url);
  }

  formatarValor(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(data: string) {
    const date = new Date(data);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Date(date).toLocaleDateString('pt-BR');
    }

    return data.substring(0, 10);
  }
}
