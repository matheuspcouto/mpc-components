import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { MpcButtonDirective } from "../../../shared/directives/mpc-button/mpc-button.directive";
import { Inscricao } from '../model/inscricao.model';
import { ErrorService } from '../../../shared/error/error.service';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Router } from '@angular/router';

/**
 * @Componente DetalhesInscricaoComponent
 * Este componente é responsável por exibir os detalhes da inscrição.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */

export interface dadosDetalhesInscricao {
  dadosInscricao: {
    codigoInscricao: string,
    dataInscricao: string,
    status: string,
  },
  dadosPessoais: { label: string, valor: string }[]
  dadosPagamento: {
    formaPagamento: string,
    valor: number,
    statusPagamento?: string,
    dataPagamento?: string,
  }
}

@Component({
  selector: 'detalhes-inscricao',
  imports: [MpcButtonDirective],
  templateUrl: './detalhes-inscricao.component.html',
  styleUrls: ['./detalhes-inscricao.component.css']
})
export class DetalhesInscricaoComponent implements OnInit {
  private readonly inscricaoService = inject(InscricaoService);
  private readonly errorService = inject(ErrorService);
  private readonly notificationService = inject(ToastrService);
  private readonly router = inject(Router);

  protected dadosDetalhesInscricao!: dadosDetalhesInscricao;

  protected isCopiado: boolean = false;

  /**
   * Inicializa os detalhes da inscrição ao carregar o componente.
   */
  ngOnInit(): void {
    this.detalharInscricao();
  }

  /**
   * Busca e organiza os dados da inscrição.
   */
  private detalharInscricao(): void {
    try {
      const inscricao = this.inscricaoService.getDadosInscricao();
      if (!inscricao) { throw new Error('Inscrição não encontrada'); }

      this.dadosDetalhesInscricao = {
        dadosPessoais: this.inicializarDadosPessoais(inscricao),
        dadosInscricao: this.inicializarDadosInscricao(inscricao),
        dadosPagamento: this.inicializarDadosPagamento(inscricao)
      };
    } catch (error: any) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Inicializa os dados da inscrição (código, data, status).
   */
  private inicializarDadosInscricao(response: Inscricao): { codigoInscricao: string, dataInscricao: string, status: string } {
    return {
      codigoInscricao: response.id?.toString() || '-',
      dataInscricao: response.dataInscricao || '-',
      status: response.status || '-'
    };
  }

  /**
   * Inicializa os dados pessoais da inscrição.
   */
  private inicializarDadosPessoais(response: Inscricao): { label: string, valor: string }[] {
    const dadosPessoais: { label: string, valor: string }[] = [];

    if (response.nome) {
      dadosPessoais.push({ label: 'Nome', valor: response.nome });
    }

    if (response.cpfCnpj) {
      dadosPessoais.push({ label: 'CPF/CNPJ', valor: response.cpfCnpj });
    }

    if (response.dataNasc) {
      dadosPessoais.push({ label: 'Data de Nascimento', valor: this.formatarData(response.dataNasc) });
    }

    if (response.sexo) {
      dadosPessoais.push({ label: 'Sexo', valor: response.sexo });
    }

    if (response.estadoCivil) {
      dadosPessoais.push({ label: 'Estado Civil', valor: response.estadoCivil });
    }

    if (response.idade) {
      dadosPessoais.push({ label: 'Idade', valor: response.idade.toString() });
    }

    if (response.telefone) {
      dadosPessoais.push({ label: 'Telefone', valor: response.telefone });
    }

    if (response.email) {
      dadosPessoais.push({ label: 'E-mail', valor: response.email });
    }

    if (response.endereco) {
      dadosPessoais.push({ label: 'Endereço', valor: response.endereco });
    }

    return dadosPessoais;
  }

  /**
   * Inicializa os dados de pagamento da inscrição.
   */
  private inicializarDadosPagamento(response: Inscricao): { formaPagamento: string, valor: number, statusPagamento?: string, dataPagamento?: string } {
    return {
      formaPagamento: response.formaPagamento || '-',
      valor: response.valor || 0,
      statusPagamento: response.statusPagamento || 'A PAGAR',
      dataPagamento: response.dataPagamento || undefined
    };
  }

  /**
   * Copia o código da inscrição para a área de transferência.
   */
  protected copiarCodigo(valor: string | undefined): void {
    if (!valor) return;
    navigator.clipboard.writeText(valor);
    this.isCopiado = true;
    this.notificationService.info('Copiado para área de transferência', '');
    setTimeout(() => {
      this.isCopiado = false;
    }, 3000);
  }

  /**
   * Abre o WhatsApp para solicitar link de pagamento.
   */
  protected pedirLinkPagamento(): void {
    const codigoInscricao = this.dadosDetalhesInscricao.dadosInscricao.codigoInscricao;
    if (codigoInscricao) {
      const telefone = ''; // telefone do responsável pelo pagamento
      let messageText = `Olá, eu gostaria de obter o pix / link de pagamento da inscrição *${codigoInscricao}* do AAAAA`;
      let url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${messageText}`;
      window.open(url);
    }
  }

  /**
   * Retorna a classe do badge de status da inscrição.
   */
  protected getBadgeStatusInscricao(status: string | undefined): string {
    if (!status) return '';
    if (status === 'ATIVO') return 'text-bg-success';
    if (status === 'INATIVO') return 'text-bg-danger';
    return '';
  }

  /**
   * Retorna a classe do badge de status do pagamento.
   */
  protected getBadgeStatusPagamento(status: string | undefined): string {
    if (!status) return '';
    if (status === 'PAGO') return 'text-bg-success';
    if (status === 'A PAGAR') return 'text-bg-danger';
    return '';
  }

  /**
   * Retorna o texto do status do pagamento.
   */
  protected getTextoStatusPagamento(status: string | undefined): string {
    if (!status) return '';
    if (status === 'PAGO') return 'Pagamento realizado';
    if (status === 'A PAGAR') return 'Aguardando pagamento';
    return '';
  }

  /**
   * Retorna o texto do status da inscrição.
   */
  protected getTextoStatusInscricao(status: string | undefined): string {
    if (!status) return '';
    if (status === 'ATIVO') return 'Ativo';
    if (status === 'INATIVO') return 'Inativo';
    return '';
  }

  /**
   * Formata o valor para o padrão monetário brasileiro.
   */
  protected formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Formata a data para o padrão brasileiro.
   */
  protected formatarData(data: string | undefined): string {
    if (!data) return '';
    const date = new Date(data);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Date(date).toLocaleDateString('pt-BR');
    }

    return data.substring(0, 10);
  }

  /**
   * Redireciona para a página inicial.
   */
  protected irParaHome(): void {
    this.inscricaoService.limparDadosInscricao();
    this.router.navigate([Rotas.HOME]);
  }
}
