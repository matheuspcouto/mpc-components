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

  dadosInscricao: any;

  ngOnInit(): void {
    this.dadosInscricao = this.inscricaoService.getDadosInscricao();
  }

  formatarNomeCompleto(): string {
    return `${this.dadosInscricao.nome.trim()} ${this.dadosInscricao.sobrenome.trim()}`;
  }

  formatarEndereco(): string {
    let endereco: string = '';

    if (this.dadosInscricao.rua)
      endereco = `${this.dadosInscricao.rua.trim()}`;
    if (this.dadosInscricao.numero)
      endereco += `, ${this.dadosInscricao.numero.trim()}`;
    if (this.dadosInscricao.complemento)
      endereco += `, ${this.dadosInscricao.complemento.trim()}`;
    if (this.dadosInscricao.bairro)
      endereco += `, ${this.dadosInscricao.bairro.trim()}`;
    if (this.dadosInscricao.cidade)
      endereco += `, ${this.dadosInscricao.cidade.trim()}`;
    if (this.dadosInscricao.estado)
      endereco += `, ${this.dadosInscricao.estado.trim()}`;
    if (this.dadosInscricao.cep)
      endereco += ` - CEP: ${this.dadosInscricao.cep.trim()}`;

    return endereco;
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(data: string): string {
    console.log(data);

    const date = new Date(data);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Date(date).toLocaleDateString('pt-BR');
    }

    return data.substring(0, 10);
  }

  formatarTelefone(): string {
    const telefone = this.dadosInscricao.telefone.replace(/\D/g, '');
    if (telefone.length === 11) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
    } else if (telefone.length === 10) {
      return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6)}`;
    }
    return telefone;
  }

  formatarCpfCnpj(): string {
    const cpfCnpj = this.dadosInscricao.cpfCnpj.replace(/\D/g, '');
    if (cpfCnpj.length === 11) {
      return `${cpfCnpj.substring(0, 3)}.${cpfCnpj.substring(3, 6)}.${cpfCnpj.substring(6, 9)}-${cpfCnpj.substring(9)}`;
    } else if (cpfCnpj.length === 14) {
      return `${cpfCnpj.substring(0, 2)}.${cpfCnpj.substring(2, 5)}.${cpfCnpj.substring(5, 8)}/${cpfCnpj.substring(8, 12)}-${cpfCnpj.substring(12)}`;
    }
    return cpfCnpj;
  }

  getSexo(): string {
    return this.dadosInscricao.sexo === 'M' ? 'Masculino' : 'Feminino';
  }

  inscrever() {
    const inscricao: Inscricao = {
      nome: this.formatarNomeCompleto(),
      dataNasc: this.formatarData(this.dadosInscricao.dataNasc),
      sexo: this.dadosInscricao.sexo,
      idade: this.dadosInscricao.idade,
      cpfCnpj: this.formatarCpfCnpj(),
      telefone: this.formatarTelefone(),
      email: this.dadosInscricao.email,
      estadoCivil: this.dadosInscricao.estadoCivil,
      endereco: this.formatarEndereco(),
      valor: this.dadosInscricao.valor,
      formaPagamento: this.dadosInscricao.formaPagamento,
      dataInscricao: new Date().toISOString(),
      status: 'ATIVO'
    }

    // MOCK
    this.abrirModalSucesso();
    //
    return;

    this.inscricaoService.inscrever(inscricao, this.dadosInscricao.sexo).subscribe({
      next: (response) => {
        this.abrirModalSucesso();
      },
      error: () => {
        this.abrirModalErro('Erro', 'Não foi possível concluir a inscrição');
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
          { label: 'Nome', valor: this.formatarNomeCompleto() },
          { label: 'Data de Nascimento', valor: this.formatarData(this.dadosInscricao.dataNasc) },
          { label: 'Idade', valor: this.dadosInscricao.idade },
          { label: 'CPF/CNPJ', valor: this.formatarCpfCnpj() },
          { label: 'Sexo', valor: this.getSexo() },
          { label: 'Estado Civil', valor: this.dadosInscricao.estadoCivil },
          { label: 'Telefone', valor: this.formatarTelefone() },
          { label: 'E-mail', valor: this.dadosInscricao.email },
          { label: 'Endereço', valor: this.formatarEndereco() },
        ],
        dadosPagamento: {
          formaPagamento: this.dadosInscricao.formaPagamento,
          valor: this.dadosInscricao.valor,
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
