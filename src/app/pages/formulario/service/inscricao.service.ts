import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import inscricoes from '../../../../../mock/inscricoes.json';

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

  atualizarDadosInscricao(novosDados: any, proximaEtapa: number): void {
    const dadosAtuais = this.dadosInscricaoSubject.getValue();
    const dadosAtualizados = { ...dadosAtuais, ...novosDados };
    this.dadosInscricaoSubject.next(dadosAtualizados);

    this.etapaAtualSubject.next(proximaEtapa);
    console.log(this.dadosInscricaoSubject.getValue());
  }

  getDadosInscricao(): any {
    return this.dadosInscricaoSubject.getValue();
  }

  getEtapaAtual(): number {
    return this.etapaAtualSubject.getValue();
  }

  listarInscricoes(): Observable<any> {
    // MOCK
    return Observable.create((observer: any) => {
      observer.next(inscricoes);
      observer.complete();
    });
    //

    return this.http.get<any>(`${this.apiUrl}/inscricoes`, { headers: this.headers });
  }

  inscrever(body: any, sexo: string): Observable<any> {
    // MOCK
    return Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next({ status: "OK", message: "Inscrição realizada com sucesso!" });
        observer.complete();
      }, 2000)
    });
    //


    const requestBody = JSON.stringify(body);
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.http.post<any>(`${this.apiUrl}/inscricao`, requestBody, { headers: headersWithSexo });
  }

  /**
 * @description Verifica se todos os campos obrigatórios de dados pessoais estão preenchidos
 * @returns {boolean} true se todos os dados pessoais estão completos, false caso contrário
 */
  isDadosPessoaisCompletos(): boolean {
    const dados = this.getDadosInscricao();
    return !!(dados.nome && dados.dataNasc && dados.sexo && dados.estadoCivil && dados.cpfCnpj);
  }

  /**
   * @description Verifica se todos os campos obrigatórios de contato estão preenchidos
   * @returns {boolean} true se todos os dados de contato estão completos, false caso contrário
   */
  isContatoCompleto(): boolean {
    const dados = this.getDadosInscricao();
    return !!(dados.telefone && dados.email && dados.cep);
  }

  /**
   * @description Verifica se todos os campos obrigatórios de pagamento estão preenchidos
   * @returns {boolean} true se todos os dados de pagamento estão completos, false caso contrário
   */
  isPagamentoCompleto(): boolean {
    const dados = this.getDadosInscricao();
    return !!(dados.formaPagamento && dados.valor);
  }

  /**
   * @description Verifica se a inscrição está completamente preenchida (todos os dados obrigatórios)
   * @returns {boolean} true se a inscrição está completa, false caso contrário
   * @example
   * const inscricao = new Inscricao();
   * inscricao.inicializarDadosPessoais('João', 'Silva', '1990-01-01', 'M', 'Solteiro', 33, '12345678901')
   *         .inicializarContato('11999999999', 'joao@email.com', 'Rua das Flores, 123')
   *         .inicializarPagamento('Cartão de Crédito', 150.00);
   * const completa = inscricao.isInscricaoCompleta(); // Retorna: true
   */
  isInscricaoCompleta(): boolean {
    return this.isDadosPessoaisCompletos() && this.isContatoCompleto() && this.isPagamentoCompleto();
  }
}
