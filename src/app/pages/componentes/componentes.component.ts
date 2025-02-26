import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../shared/components/loader/loader.service';
import { ModalComprovanteComponent } from '../../shared/components/modal-comprovante/modal-comprovante.component';
import { ModalComprovanteConfig } from '../../shared/components/modal-comprovante/modal-comprovante.directive';
import { ModalComponent, TipoModal } from '../../shared/components/modal/modal.component';
import { Rotas } from '../../shared/enums/rotas-enum';
import { FluxoErro } from '../../shared/fluxo-erro';

@Component({
  selector: 'app-componentes',
  imports: [NavbarComponent, ModalComponent, ModalComprovanteComponent],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent {
  erro: any;

  @ViewChild('modal', { static: true }) modal!: ModalComponent;
  @ViewChild('comprovante', { static: true }) comprovante!: ModalComprovanteComponent;

  constructor(private notificationService: ToastrService, private loaderService: LoaderService) { }

  abrirModalConfirmacao() {
    const MODAL = {
      titulo: 'Modal de Confirmação',
      tipoModal: TipoModal.CONFIRMACAO,
      texto: 'Este é um modal de confirmação',
      textoBotao: 'OK',
      botao: () => { return true; },
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { this.modal?.fecharModal(); },
    }

    this.modal?.abrirModal(MODAL);
  }

  abrirModalSucesso() {
    const MODAL = {
      titulo: 'Modal de Sucesso',
      tipoModal: TipoModal.SUCESSO,
      texto: 'Parabéns, você conseguiu realizar uma ação com sucesso',
      textoBotao: 'OK',
      botao: () => { return true; },
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { this.modal?.fecharModal(); },
    }

    this.modal?.abrirModal(MODAL);
  }

  abrirModalAviso() {
    const MODAL = {
      titulo: 'Modal de Alerta',
      tipoModal: TipoModal.AVISO,
      texto: 'Este é um modal de alerta',
      textoBotao: 'OK',
      botao: () => { return true; },
      textoSegundoBotao: 'Fechar',
      segundoBotao: () => { this.modal?.fecharModal(); },
    }
    this.modal?.abrirModal(MODAL);
  }

  abrirModalComprovante() {
    const MODAL = {
      dados: {
        id: '123456',
        nome: 'Fulano de Tal',
        telefone: '11999999999',
        dataCriacao: '2021-10-10',
        formaPagamento: 'Pix',
        valor: 100,
        status: 'A PAGAR'
      },
      titulo: 'Comprovante de Inscrição',
    } as ModalComprovanteConfig;

    this.comprovante?.abrirComprovante(MODAL, 'M');
  }

  abrirModalErro() {
    this.erro = new FluxoErro().construirErro({}, Rotas.HOME);

    const MODAL = {
      titulo: this.erro.titulo,
      tipoModal: TipoModal.ERRO,
      texto: this.erro.mensagem,
      textoBotao: 'OK',
      botao: () => this.modal?.fecharModal(),
    }

    this.modal?.abrirModal(MODAL);
  }

  abrirLoading() {
    this.loaderService.showLoader();
    setTimeout(() => this.loaderService.hideLoader(), 5000);
  }

  mostrarNotificacao() {
    this.notificationService.success('Notificação de sucesso', 'Título da notificação');
    this.notificationService.error('Notificação de erro', 'Título da notificação');
    this.notificationService.warning('Notificação de alerta', 'Título da notificação');
    this.notificationService.info('Notificação de informação', 'Título da notificação');
  }

}
