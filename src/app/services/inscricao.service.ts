import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// TODO: Mock server
@Injectable({ providedIn: 'root' })
export class InscricaoService {

  constructor(private httpClient: HttpClient) { }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  listarCelulas(): Observable<any> {
    return this.httpClient.get<any>(`${environment.host_bff}/celulas/listar`, { headers: this.headers });
  }

  listarInscricoes(sexo: string): Observable<any> {
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.httpClient.get<any>(`${environment.host_bff}/evento/inscricao/listar`, { headers: headersWithSexo });
  }

  detalharinscricao(id: string, sexo: string): Observable<any> {
    const headersWithSexo = this.headers.append('sexo', sexo);
    const headerWithIdSexo = headersWithSexo.append('id', id);
    return this.httpClient.get<any>(`${environment.host_bff}/evento/inscricao/detalhar`, { headers: headerWithIdSexo });
  }

  inscrever(body: any, sexo: string): Observable<any> {
    const requestBody = JSON.stringify(body);
    const headersWithSexo = this.headers.append('sexo', sexo);
    return this.httpClient.post<any>(`${environment.host_bff}/evento/inscricao/inscrever`, requestBody, { headers: headersWithSexo });
  }
}
