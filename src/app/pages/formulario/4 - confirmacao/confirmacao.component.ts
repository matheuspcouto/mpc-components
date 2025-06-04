import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InscricaoService } from '../inscricao.service';
import { Router } from '@angular/router';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcComprovanteComponent, MpcComprovanteConfig } from '../../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Inscricao } from '../inscricao.model';

@Component({
  selector: 'app-confirmacao',
  imports: [MpcButtonComponent, MpcNavbarComponent, MpcComprovanteComponent, MpcModalComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  private router = inject(Router);
  private inscricaoService = inject(InscricaoService);

  @ViewChild('modalErro', { static: true }) modalErro!: MpcModalComponent;
  @ViewChild('modalSucesso', { static: true }) modalSucesso!: MpcModalComponent;

  @ViewChild('comprovanteExemplo', { static: true }) comprovanteExemplo!: MpcComprovanteComponent;
  dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  dadosInscricao = new Inscricao();

  ngOnInit(): void {
    const dados = this.inscricaoService.getDadosInscricao();

    this.dadosInscricao.inicializarDadosPessoais(dados);
    this.dadosInscricao.inicializarContato(dados);
    this.dadosInscricao.inicializarPagamento(dados);
  }

  formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(data: string): string {
    if (!data || data.trim() === '') {
      return '';
    }

    const date = new Date(data);

    if (isNaN(date.getTime())) {
      const dataLimpa = data.substring(0, 10);
      if (dataLimpa.includes('-') && dataLimpa.length === 10) {
        const [ano, mes, dia] = dataLimpa.split('-');
        return `${dia}/${mes}/${ano}`;
      }
      return data; // Retorna original se não conseguir formatar
    }

    return date.toLocaleDateString('pt-BR');
  }


  getSexo(): string {
    return this.dadosInscricao.sexo === 'M' ? 'Masculino' : 'Feminino';
  }

  inscrever() {
    this.inscricaoService.inscrever(this.dadosInscricao, this.dadosInscricao.sexo as string).subscribe({
      next: (response: any) => {
        this.abrirModalSucesso();
      },
      error: (error: any) => {
        this.abrirModalErro('Não foi possível realizar a inscrição, tente novamente mais tarde.', error);
      }
    });
  }

  voltar() {
    this.router.navigate([Rotas.PAGAMENTO]);
  }

  abrirModalSucesso() {
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

  abrirModalComprovante() {
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
          { label: 'Idade', valor: String(this.dadosInscricao.idade) || '' },
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

  abrirModalErro(titulo: string, texto: string): void {
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
