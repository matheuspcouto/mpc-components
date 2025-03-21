import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  constructor(private http: HttpClient) { }

  atualizarDadosInscricao(novosDados: any, proximaEtapa: number): void {
    const dadosAtuais = this.dadosInscricaoSubject.getValue();
    const dadosAtualizados = { ...dadosAtuais, ...novosDados };
    this.dadosInscricaoSubject.next(dadosAtualizados);

    this.etapaAtualSubject.next(proximaEtapa);
  }

  getDadosInscricao(): any {
    return this.dadosInscricaoSubject.getValue();
  }

  getEtapaAtual(): number {
    return this.etapaAtualSubject.getValue();
  }

  listarCelulas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/celulas`, { headers: this.headers });
  }

  listarInscricoes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inscricoes`, { headers: this.headers });
  }

  inscrever(body: any, sexo: string): Observable<any> {
    const requestBody = JSON.stringify(body);
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.http.post<any>(`${this.apiUrl}/inscricao`, requestBody, { headers: headersWithSexo });
  }
}
