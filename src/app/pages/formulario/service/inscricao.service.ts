/**
 * @Service InscricaoService
 * Este service gerencia o fluxo de dados e etapas do formulário de inscrição, além de simular requisições de inscrição.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
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
  // URL base da API
  private apiUrl = environment.apiUrl;

  // Signal para armazenar os dados da inscrição
  private dadosInscricaoSignal = signal<any>({});
  dadosInscricao = this.dadosInscricaoSignal.asReadonly();

  // Signal para armazenar a etapa atual do formulário
  private etapaAtualSignal = signal<number>(1);
  etapaAtual = this.etapaAtualSignal.asReadonly();

  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  private http = inject(HttpClient);

  /**
   * Atualiza os dados da inscrição e a etapa atual, se informado.
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
   */
  getDadosInscricao(): any {
    return this.dadosInscricao();
  }

  /**
   * Limpa os dados da inscrição.
   */
  limparDadosInscricao(): void {
    this.dadosInscricaoSignal.set({});
  }

  /**
   * Retorna a etapa atual do formulário.
   */
  getEtapaAtual(): number {
    return this.etapaAtual();
  }

  /**
   * Detalha uma inscrição pelo id (mock).
   */
  detalharInscricao(id: string): Observable<Inscricao> {
    // MOCK - Retorna o objeto mock do arquivo JSON
    return Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(detalhesInscricao);
        observer.complete();
      }, 3000);
    });

    // Implementação Real
    // return this.http.get<any>(`${this.apiUrl}/inscricoes/${codigoInscricao}/detalhes`, { headers: this.headers });
  }

  /**
   * Lista todas as inscrições (mock).
   */
  listarInscricoes(): Observable<Inscricao[]> {
    // MOCK
    return Observable.create((observer: any) => {
      observer.next(inscricoes);
      observer.complete();
    });
    //

    // Implementação Real
    // return this.http.get<any>(`${this.apiUrl}/inscricoes`, { headers: this.headers });
  }

  /**
   * Realiza a inscrição (mock).
   */
  inscrever(body: Inscricao): Observable<Inscricao> {
    // MOCK
    return Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next(detalhesInscricao);
        observer.complete();
      }, 3000)
    });
    //

    // Implementação Real
    /* const requestBody = JSON.stringify(body);
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.http.post<any>(`${this.apiUrl}/inscricao`, requestBody, { headers: headersWithSexo }); */
  }

  /**
   * Verifica se todos os campos obrigatórios de dados pessoais estão preenchidos.
   */
  isDadosPessoaisCompletos(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.nome && dadosInscricao.dataNasc && dadosInscricao.sexo && dadosInscricao.estadoCivil && dadosInscricao.cpfCnpj);
  }

  /**
   * Verifica se todos os campos obrigatórios de contato estão preenchidos.
   */
  isContatoCompleto(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.telefone && dadosInscricao.email && dadosInscricao.cep);
  }

  /**
   * Verifica se todos os campos obrigatórios de pagamento estão preenchidos.
   */
  isPagamentoCompleto(): boolean {
    const dadosInscricao = this.dadosInscricao();
    return !!(dadosInscricao.formaPagamento && dadosInscricao.valor);
  }

  /**
   * Verifica se a inscrição está completamente preenchida.
   */
  isInscricaoCompleta(): boolean {
    return this.isDadosPessoaisCompletos() && this.isContatoCompleto() && this.isPagamentoCompleto();
  }
}
