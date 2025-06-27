import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { Router } from '@angular/router';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcComprovanteComponent, MpcComprovanteConfig } from '../../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Inscricao } from '../model/inscricao.model';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-confirmacao',
  imports: [MpcButtonComponent, MpcNavbarComponent, MpcComprovanteComponent, MpcModalComponent, MpcFooterComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  private router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);

  @ViewChild('modalErro', { static: true }) private modalErro!: MpcModalComponent;
  @ViewChild('modalSucesso', { static: true }) private modalSucesso!: MpcModalComponent;

  @ViewChild('comprovanteExemplo', { static: true }) private comprovanteExemplo!: MpcComprovanteComponent;
  protected dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  protected dadosInscricao = new Inscricao();

  ngOnInit(): void {
    const dados = this.inscricaoService.getDadosInscricao();

    this.dadosInscricao.inicializarDadosPessoais(dados);
    this.dadosInscricao.inicializarContato(dados);
    this.dadosInscricao.inicializarPagamento(dados);
  }

  protected formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  protected getSexo(): string {
    return this.dadosInscricao.sexo === 'M' ? 'Masculino' : 'Feminino';
  }

  protected inscrever(): void {
    this.inscricaoService.inscrever(this.dadosInscricao, this.dadosInscricao.sexo as string).subscribe({
      next: (response: any) => {
        this.abrirModalSucesso();
        this.router.navigate([Rotas.HOME]);
      },
      error: (error: any) => {
        this.abrirModalErro('Não foi possível realizar a inscrição, tente novamente mais tarde.', error);
      }
    });
  }

  protected voltar(): void {
    this.router.navigate([Rotas.PAGAMENTO]);
  }

  private abrirModalSucesso(): void {
    const modalSucesso: MpcModalConfig = {
      titulo: 'Inscrição realizada com sucesso',
      texto: 'Sua inscrição foi realizada com sucesso, você pode acessar o comprovante de inscrição clicando no botão abaixo.',
      tipoModal: TipoModal.SUCESSO,
      botao: () => { this.abrirModalComprovante(); },
      textoBotao: 'Abrir comprovante',
      segundoBotao: () => { this.modalSucesso?.fecharModal(); },
      textoSegundoBotao: 'Fechar',
    }

    this.modalSucesso?.abrirModal(modalSucesso);
  }

  private abrirModalComprovante(): void {
    this.modalSucesso?.fecharModal();

    this.dadosComprovante = {
      titulo: 'Comprovante de inscrição',
      dados: {
        dadosInscricao: {
          codigoInscricao: '123456',
          dataInscricao: new Date().toLocaleDateString('pt-BR'),
          status: 'ATIVO',
        },
        dadosPessoais: [
          { label: 'Nome', valor: this.dadosInscricao.nome || '' },
          { label: 'Data de Nascimento', valor: this.dadosInscricao.dataNasc || '' },
          { label: 'Idade', valor: String(this.dadosInscricao.idade)},
          { label: 'CPF/CNPJ', valor: this.dadosInscricao.cpfCnpj || '' },
          { label: 'Sexo', valor: this.getSexo() },
          { label: 'Estado Civil', valor: this.dadosInscricao.estadoCivil || '' },
          { label: 'Telefone', valor: this.dadosInscricao.telefone || '' },
          { label: 'E-mail', valor: this.dadosInscricao.email || '' },
          { label: 'Endereço', valor: this.dadosInscricao.endereco || '' },
        ],
        dadosPagamento: {
          formaPagamento: this.dadosInscricao.formaPagamento || '',
          valor: this.dadosInscricao.valor || 0.00,
          statusPagamento: 'A PAGAR'
        },
      }
    };

    this.comprovanteExemplo?.abrirComprovante();
  }

  private abrirModalErro(titulo: string, texto: string): void {
    const modalErro: MpcModalConfig = {
      titulo: titulo,
      texto: texto,
      tipoModal: TipoModal.ERRO,
      botao: () => this.modalErro?.fecharModal(),
      textoBotao: 'OK'
    }

    this.modalErro?.abrirModal(modalErro);
  }
}
