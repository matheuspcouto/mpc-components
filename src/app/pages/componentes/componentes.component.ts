import { Component, ViewChild } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { ToastrService } from 'ngx-toastr';
import { MpcModalComponent, TipoModal } from '../../shared/components/mpc-modal/mpc-modal.component';
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';
import { MpcModalConfig } from '../../shared/components/mpc-modal/mpc-modal.directive';
import { MpcComprovanteComponent } from '../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcComprovanteConfig } from '../../shared/components/mpc-comprovante/mpc-comprovante.directive';
import { MpcLoaderService } from '../../shared/components/mpc-loader/mpc-loader.service';

@Component({
  selector: 'app-componentes',
  imports: [MpcNavbarComponent, MpcModalComponent, MpcComprovanteComponent, MpcButtonComponent],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent {

  constructor(private notificationService: ToastrService, private mpcLoaderService: MpcLoaderService) { }

  erro: any;
  @ViewChild('modalExemplo', { static: true }) modalExemplo!: MpcModalComponent;
  @ViewChild('comprovanteExemplo', { static: true }) comprovanteExemplo!: MpcComprovanteComponent;
  dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  abrirModalComprovante() {
    this.dadosComprovante = {
      titulo: 'Comprovante de inscrição',
      dados: {
        dadosInscricao: {
          codigoInscricao: '123456',
          dataInscricao: new Date().toLocaleDateString('pt-BR'),
          status: 'ATIVO',
        },
        dadosPessoais: [
          { label: 'Nome', valor: 'Fulano de Tal' },
          { label: 'CPF', valor: '123.456.789-00' },
          { label: 'E-mail', valor: 'fulano@example.com' },
        ],
        dadosPagamento: {
          formaPagamento: 'Cartão de Crédito',
          valor: 100.00,
          statusPagamento: 'A PAGAR'
        },
      }
    };

    this.comprovanteExemplo?.abrirComprovante();
  }

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

    this.modalExemplo.modal = modalConfirmacao;
    this.modalExemplo?.abrirModal();
  }

  abrirModalSucesso() {
    const modalSucesso: MpcModalConfig = {
      titulo: 'Modal de Sucesso',
      texto: 'Parabéns',
      tipoModal: TipoModal.SUCESSO,
      botao: () => { return true; },
      textoBotao: 'OK',
      segundoBotao: () => { this.modalExemplo?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalExemplo.modal = modalSucesso;
    this.modalExemplo?.abrirModal();
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

    this.modalExemplo.modal = modalAlerta;
    this.modalExemplo?.abrirModal();
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

    this.modalExemplo.modal = modalErro;
    this.modalExemplo?.abrirModal();
  }

  abrirLoading() {
    this.mpcLoaderService.show();
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
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
