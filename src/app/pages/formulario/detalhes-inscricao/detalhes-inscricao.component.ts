/**
 * @Componente DetalhesInscricaoComponent
 *
 * Este componente é responsável por exibir os detalhes da inscrição do usuário,
 * incluindo dados pessoais, dados da inscrição e informações de pagamento.
 *
 * @Propriedades
 * @protected dadosDetalhesInscricao {dadosDetalhesInscricao} - Dados organizados para exibição
 * @protected isCopiado {boolean} - Indica se o código foi copiado para a área de transferência
 *
 * @Exemplo
 * ```html
 * <detalhes-inscricao></detalhes-inscricao>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { InscricaoService } from '../service/inscricao.service';
import { Inscricao } from '../model/inscricao.model';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { Router } from '@angular/router';
import { MpcButtonComponent } from 'mpc-lib-angular';

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
  imports: [MpcButtonComponent],
  templateUrl: './detalhes-inscricao.component.html',
  styleUrls: ['./detalhes-inscricao.component.scss']
})
export class DetalhesInscricaoComponent implements OnInit {

  // Injeções
  private readonly inscricaoService = inject(InscricaoService);
  private readonly mpcErrorService = inject(MpcErrorService);
  private readonly notificationService = inject(ToastrService);
  private readonly router = inject(Router);

  /**
   * Dados organizados para exibição dos detalhes da inscrição.
   */
  protected dadosDetalhesInscricao!: dadosDetalhesInscricao;
  /**
   * Indica se o código foi copiado para a área de transferência.
   */
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
      this.mpcErrorService.construirErro(error);
    }
  }

  /**
   * Inicializa os dados da inscrição (código, data, status).
   * @param response Objeto de inscrição
   * @returns {codigoInscricao, dataInscricao, status}
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
   * @param response Objeto de inscrição
   * @returns {Array<{label: string, valor: string}>}
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
   * @param response Objeto de inscrição
   * @returns {formaPagamento, valor, statusPagamento, dataPagamento}
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
   * @param valor Código a ser copiado
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
   * @param status Status da inscrição
   * @returns {string} Classe CSS
   */
  protected getBadgeStatusInscricao(status: string | undefined): string {
    if (!status) return '';
    if (status === 'ATIVO') return 'text-bg-success';
    if (status === 'INATIVO') return 'text-bg-danger';
    return '';
  }

  /**
   * Retorna a classe do badge de status do pagamento.
   * @param status Status do pagamento
   * @returns {string} Classe CSS
   */
  protected getBadgeStatusPagamento(status: string | undefined): string {
    if (!status) return '';
    if (status === 'PAGO') return 'text-bg-success';
    if (status === 'A PAGAR') return 'text-bg-danger';
    return '';
  }

  /**
   * Retorna o texto do status do pagamento.
   * @param status Status do pagamento
   * @returns {string} Texto do status
   */
  protected getTextoStatusPagamento(status: string | undefined): string {
    if (!status) return '';
    if (status === 'PAGO') return 'Pagamento realizado';
    if (status === 'A PAGAR') return 'Aguardando pagamento';
    return '';
  }

  /**
   * Retorna o texto do status da inscrição.
   * @param status Status da inscrição
   * @returns {string} Texto do status
   */
  protected getTextoStatusInscricao(status: string | undefined): string {
    if (!status) return '';
    if (status === 'ATIVO') return 'Ativo';
    if (status === 'INATIVO') return 'Inativo';
    return '';
  }

  /**
   * Formata o valor para o padrão monetário brasileiro.
   * @param valor Valor a ser formatado
   * @returns {string} Valor formatado
   */
  protected formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Formata a data para o padrão brasileiro.
   * @param data Data a ser formatada
   * @returns {string} Data formatada
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
