import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import inscricoes from '../../../../mock/inscricoes.json';

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
}
