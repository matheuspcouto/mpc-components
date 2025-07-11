/**
 * @Service InscricaoService
 *
 * Este service gerencia o fluxo de dados e etapas do formulário de inscrição, além de simular requisições de inscrição.
 * Utiliza Signals para armazenar dados e etapas, e métodos para manipulação e simulação de requisições.
 *
 * @Propriedades
 * @private apiUrl {string} - URL base da API
 * @private dadosInscricaoSignal {Signal<any>} - Signal para os dados da inscrição
 * @public dadosInscricao {Signal<any>} - Signal somente leitura dos dados da inscrição
 * @private etapaAtualSignal {Signal<number>} - Signal para a etapa atual do formulário
 * @public etapaAtual {Signal<number>} - Signal somente leitura da etapa atual
 * @private headers {HttpHeaders} - Headers padrão para requisições
 *
 * @Exemplo
 * ```typescript
 * private inscricaoService = inject(InscricaoService);
 * inscricaoService.atualizarDadosInscricao({ novosDados: { nome: 'João' }, proximaEtapa: 2 });
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import inscricoes from '../../../../../mock/inscricoes.json';
import detalhesInscricao from '../../../../../mock/detalhes-inscricao.json';
import { Inscricao } from '../model/inscricao.model';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {
  /**
   * URL base da API.
   */
  private apiUrl = environment.apiUrl;

  /**
   * Signal para armazenar os dados da inscrição.
   */
  private dadosInscricaoSignal = signal<any>({});
  /**
   * Signal somente leitura dos dados da inscrição.
   */
  dadosInscricao = this.dadosInscricaoSignal.asReadonly();

  /**
   * Signal para armazenar a etapa atual do formulário.
   */
  private etapaAtualSignal = signal<number>(1);
  /**
   * Signal somente leitura da etapa atual.
   */
  etapaAtual = this.etapaAtualSignal.asReadonly();

  /**
   * Headers padrão para requisições HTTP.
   */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  /**
   * Instância do HttpClient para requisições HTTP.
   */
  private http = inject(HttpClient);

  /**
   * Atualiza os dados da inscrição e a etapa atual, se informado.
   * @param novosDados Novos dados a serem mesclados
   * @param proximaEtapa (Opcional) Nova etapa do formulário
   * @example
   *   inscricaoService.atualizarDadosInscricao({ novosDados: { nome: 'João' }, proximaEtapa: 2 });
   */
  atualizarDadosInscricao({ novosDados, proximaEtapa }: { novosDados: any, proximaEtapa?: number }): void {
    const dadosAtuais = this.dadosInscricao();
    const dadosAtualizados = { ...dadosAtuais, ...novosDados };
    this.dadosInscricaoSignal.set(dadosAtualizados);

    if (proximaEtapa) {
      this.etapaAtualSignal.set(proximaEtapa);
    }
  }

  /**
   * Retorna os dados atuais da inscrição.
   * @returns Dados da inscrição
   */
  getDadosInscricao(): any {
    return this.dadosInscricao();
  }

  /**
   * Limpa os dados da inscrição.
   * @example
   *   inscricaoService.limparDadosInscricao();
   */
  limparDadosInscricao(): void {
    this.dadosInscricaoSignal.set({});
  }

  /**
   * Retorna a etapa atual do formulário.
   * @returns Etapa atual
   */
  getEtapaAtual(): number {
    return this.etapaAtual();
  }

  /**
   * Detalha uma inscrição pelo id (mock).
   * @param id ID da inscrição
   * @returns Observable<Inscricao>
   * @example
   *   inscricaoService.detalharInscricao('123').subscribe(...)
   */
  detalharInscricao(id: string): Observable<Inscricao> {
    // MOCK - Retorna o objeto mock do arquivo JSON
    return Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(detalhesInscricao);
        observer.complete();
      }, 3000);
    });
    // Implementação Real:
    // return this.http.get<any>(`${this.apiUrl}/inscricoes/${codigoInscricao}/detalhes`, { headers: this.headers });
  }

  /**
   * Lista todas as inscrições (mock).
   * @returns Observable<Inscricao[]>
   * @example
   *   inscricaoService.listarInscricoes().subscribe(...)
   */
  listarInscricoes(): Observable<Inscricao[]> {
    // MOCK
    return Observable.create((observer: any) => {
      observer.next(inscricoes);
      observer.complete();
    });
    // Implementação Real:
    // return this.http.get<any>(`${this.apiUrl}/inscricoes`, { headers: this.headers });
  }

  /**
   * Realiza a inscrição (mock).
   * @param body Dados da inscrição
   * @returns Observable<Inscricao>
   * @example
   *   inscricaoService.inscrever({ ... }).subscribe(...)
   */
  inscrever(body: Inscricao): Observable<Inscricao> {
    // MOCK
    return Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(detalhesInscricao);
        observer.complete();
      }, 3000)
    });
    // Implementação Real:
    /* const requestBody = JSON.stringify(body);
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.http.post<any>(`${this.apiUrl}/inscricao`, requestBody, { headers: headersWithSexo }); */
  }

  /**
   * Verifica se todos os campos obrigatórios de dados pessoais estão preenchidos.
   * @returns boolean
   */
  isDadosPessoaisCompletos(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.nome && dadosInscricao.dataNasc && dadosInscricao.sexo && dadosInscricao.estadoCivil && dadosInscricao.cpfCnpj);
  }

  /**
   * Verifica se todos os campos obrigatórios de contato estão preenchidos.
   * @returns boolean
   */
  isContatoCompleto(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.telefone && dadosInscricao.email && dadosInscricao.cep);
  }

  /**
   * Verifica se todos os campos obrigatórios de pagamento estão preenchidos.
   * @returns boolean
   */
  isPagamentoCompleto(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.formaPagamento && dadosInscricao.valor);
  }

  /**
   * Verifica se a inscrição está completamente preenchida.
   * @returns boolean
   */
  isInscricaoCompleta(): boolean {
    return this.isDadosPessoaisCompletos() && this.isContatoCompleto() && this.isPagamentoCompleto();
  }
}
