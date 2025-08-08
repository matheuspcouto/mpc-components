/**
 * @Service AuthService
 * Este serviço é responsável por gerenciar a autenticação do usuário na aplicação.
 * Controla login, logout, verificação de autenticação e armazenamento de tokens.
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 */
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id?: string;
  nome?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string,
  authToken?: string;
  expiresIn?: string;
  acessos?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN = 'AUTH_TOKEN';

  // Signals para gerenciar o estado de autenticação
  private _usuarioAutenticado = signal<Usuario | null>(null);
  private _isAuthenticatedSignal = signal<boolean>(false);

  // Computed signals para exposição pública
  public readonly usuarioAutenticado = this._usuarioAutenticado.asReadonly();
  public readonly isAuthenticatedSignal = this._isAuthenticatedSignal.asReadonly();

  // Headers padrão para requisições HTTP.
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  // Instância do HttpClient para requisições HTTP.
  constructor(
    private readonly http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  // URL base da API.
  private readonly baseUrl = environment.baseUrl;

  /**
   * Realiza o login do usuário
   * @param email Email do usuário
   * @param senha Senha do usuário
   * @returns Observable com o resultado da autenticação
   */
  login(email: string, senha: string): Observable<any> {
    const body = {
      email: encodeURIComponent(email),
      senha: encodeURIComponent(senha)
    }

    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers: this.headers })
      .pipe((take(1)),
        map((response) => {

          if (response.error) {
            throw new HttpErrorResponse({ error: response.error });
          }

          this.salvarUsuario(response.data);
          return true; // Login bem-sucedido
        }));
  }

  /**
 * Salva os dados do usuário em cookies
 * @param usuario Dados do usuário
 */
  private salvarUsuario(usuario: Usuario): void {
    if (usuario.authToken) {
      this.setCookie(this.AUTH_TOKEN, usuario.authToken, usuario.expiresIn);
    }
    this._usuarioAutenticado.set(usuario);
    this._isAuthenticatedSignal.set(true);
  }

  /**
   * Realiza o logout do usuário
   */
  logout(): void {
    this.document.cookie = '';
    this._usuarioAutenticado.set(null);
    this._isAuthenticatedSignal.set(false);
  }

  /**
   * Realiza o cadastro do usuário
   * @param usuario Usuario
   * @returns Observable com o resultado do cadastro
   */
  cadastrar(usuario: Usuario): Observable<any> {
    const body = {
      ...usuario,
      email: encodeURIComponent(usuario.email ?? ''),
      senha: encodeURIComponent(usuario.senha ?? '')
    }

    return this.http.post<any>(`${this.baseUrl}/criarUsuario`, body, { headers: this.headers })
      .pipe((take(1)),
        map((response) => {

          if (response.error) {
            throw new HttpErrorResponse({ error: response.error });
          }

          return true; // Login bem-sucedido
        }));
  }

  /**
   * Retorna o valor atual do usuário autenticado
   * @returns Usuário ou null
   */
  getUsuarioAtual(): Usuario | null {
    return this._usuarioAutenticado();
  }

  /**
   * Retorna o token de autenticação
   * @returns Token ou null
   */
  getAuthToken(): string | null {
    return this.getCookie(this.AUTH_TOKEN);
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns boolean indicando se está autenticado
   */
  isAuthenticated(): boolean {
    return this._isAuthenticatedSignal();
  }

  /**
   * Define um cookie
   * @param name Nome do cookie
   * @param value Valor do cookie
   * @param expiresIn Tempo para expiração
   * @param path Caminho do cookie
   */
  private setCookie(name: string, value: string, expiresIn?: string, path: string = '/'): void {
    let expiresString = '';
    if (expiresIn) {
      const expires = new Date(expiresIn);
      expiresString = `; expires=${expires.toUTCString()}`;
    }

    this.document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expiresString};path=${path};SameSite=Strict`;
  }

  /**
 * Converte uma string de cookie em um mapa de chaves e valores
 * @param cookie String de cookie
 * @returns Map com chaves e valores do cookie
 */
  private parseCookie(cookie: string): Map<string, string> {
    return cookie.split(';')
      .map(c => c.split('='))
      .reduce((acc: Map<string, string>, v) => {
        const key = (v[0] || '').trim();
        const value = (v[1] || '').trim();

        if (key) {
          acc.set(decodeURIComponent(key), decodeURIComponent(value));
        }
        return acc;
      }, new Map<string, string>());
  }

  /**
   * Obtém todos os cookies
   * @returns Map com todos os cookies
   */
  getAllCookies(): Map<string, string> {
    return this.parseCookie(this.document.cookie);
  }

  /**
   * Obtém um cookie
   * @param name Nome do cookie
   * @returns Valor do cookie ou null
   */
  private getCookie(name: string): string | null {
    return this.getAllCookies().get(name) ?? null;
  }
} 