/**
 * @Service InscricaoService
 * Este service gerencia o fluxo de dados e etapas do formulário de inscrição, além de simular requisições de inscrição.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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

  // BehaviorSubject para armazenar os dados da inscrição
  private dadosInscricaoSubject = new BehaviorSubject<any>({});
  dadosInscricao$ = this.dadosInscricaoSubject.asObservable();

  // BehaviorSubject para armazenar a etapa atual do formulário
  private etapaAtualSubject = new BehaviorSubject<number>(1);
  etapaAtual$ = this.etapaAtualSubject.asObservable();

  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  private http = inject(HttpClient);

  /**
   * Atualiza os dados da inscrição e a etapa atual, se informado.
   */
  atualizarDadosInscricao(novosDados: any, proximaEtapa?: number): void {
    const dadosAtuais = this.dadosInscricaoSubject.getValue();
    const dadosAtualizados = { ...dadosAtuais, ...novosDados };
    this.dadosInscricaoSubject.next(dadosAtualizados);

    if (proximaEtapa) {
      this.etapaAtualSubject.next(proximaEtapa);
    }
  }

  /**
   * Retorna os dados atuais da inscrição.
   */
  getDadosInscricao(): any {
    return this.dadosInscricaoSubject.getValue();
  }

  /**
   * Limpa os dados da inscrição.
   */
  limparDadosInscricao(): void {
    this.dadosInscricaoSubject.next({});
  }

  /**
   * Retorna a etapa atual do formulário.
   */
  getEtapaAtual(): number {
    return this.etapaAtualSubject.getValue();
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
    const dados = this.getDadosInscricao();
    return !!(dados.nome && dados.dataNasc && dados.sexo && dados.estadoCivil && dados.cpfCnpj);
  }

  /**
   * Verifica se todos os campos obrigatórios de contato estão preenchidos.
   */
  isContatoCompleto(): boolean {
    const dados = this.getDadosInscricao();
    return !!(dados.telefone && dados.email && dados.cep);
  }

  /**
   * Verifica se todos os campos obrigatórios de pagamento estão preenchidos.
   */
  isPagamentoCompleto(): boolean {
    const dados = this.getDadosInscricao();
    return !!(dados.formaPagamento && dados.valor);
  }

  /**
   * Verifica se a inscrição está completamente preenchida.
   */
  isInscricaoCompleta(): boolean {
    return this.isDadosPessoaisCompletos() && this.isContatoCompleto() && this.isPagamentoCompleto();
  }
}
