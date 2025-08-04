/**
 * @Service AuthService
 * Este serviço é responsável por gerenciar a autenticação do usuário na aplicação.
 * Controla login, logout, verificação de autenticação e armazenamento de tokens.
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // Signals para gerenciar o estado de autenticação
  private _usuarioAutenticado = signal<Usuario | null>(null);
  private _isAuthenticated = signal<boolean>(false);

  // Computed signals para exposição pública
  public readonly usuarioAutenticado = this._usuarioAutenticado.asReadonly();
  public readonly isAuthenticated = this._isAuthenticated.asReadonly();

  // Headers padrão para requisições HTTP.
  private headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });

  // Instância do HttpClient para requisições HTTP.
  private http = inject(HttpClient);

  // URL base da API.
  private baseUrl = environment.baseUrl;

  constructor() {
    this.carregarUsuarioSalvo();
  }

  /**
   * Realiza o login do usuário
   * @param email Email do usuário
   * @param senha Senha do usuário
   * @returns Observable com o resultado da autenticação
   */
  login(email: string, senha: string): Observable<any> {
    // Simulação de autenticação - em produção, isso seria uma chamada HTTP
    const headersWithEmailAndSenha = this.headers.append('email', email).append('senha', senha);

    return this.http.post<any>(`${this.baseUrl}/login`, { headers: headersWithEmailAndSenha })
      .pipe((take(1)),
        map((response) => {

          if (response.error) {
            throw new HttpErrorResponse({ error: response.error });
          }

          if (response.data) {
            const usuario: Usuario = {
              id: response.data.id,
              nome: response.data.nome,
              email: response.data.email,
              token: response.data.token
            };

            this.salvarUsuario(usuario);
            return true; // Login bem-sucedido
          } else {
            throw new HttpErrorResponse({ error: 'Credenciais inválidas' });
          }

        }));
  }

  /**
 * Salva os dados do usuário em cookies
 * @param usuario Dados do usuário
 */
  private salvarUsuario(usuario: Usuario): void {
    if (usuario.token) {
      this.setCookie(this.TOKEN_KEY, usuario.token, 15); // Expira em 15 minutos
    }
    this.setCookie(this.USER_KEY, JSON.stringify(usuario), 15); // Expira em 15 minutos
    this._usuarioAutenticado.set(usuario);
    this._isAuthenticated.set(true);
  }

  /**
   * Carrega o usuário salvo nos cookies
   */
  private carregarUsuarioSalvo(): void {
    const token = this.getCookie(this.TOKEN_KEY);
    const usuarioStr = this.getCookie(this.USER_KEY);

    if (token && usuarioStr) {
      try {
        const usuario: Usuario = JSON.parse(usuarioStr);
        this._usuarioAutenticado.set(usuario);
        this._isAuthenticated.set(true);
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        this.logout();
      }
    }
  }

  /**
   * Realiza o logout do usuário
   */
  logout(): void {
    this.removerCookie(this.TOKEN_KEY);
    this.removerCookie(this.USER_KEY);
    this._usuarioAutenticado.set(null);
    this._isAuthenticated.set(false);
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns Observable com o status de autenticação
   */
  isAutenticado(): Observable<boolean> {
    return new Observable(observer => {
      observer.next(this._isAuthenticated());
      observer.complete();
    });
  }

  /**
   * Retorna o valor atual do status de autenticação
   * @returns boolean indicando se está autenticado
   */
  getAutenticado(): boolean {
    return this._isAuthenticated();
  }

  /**
   * Retorna o usuário autenticado atual
   * @returns Observable com o usuário ou null
   */
  getUsuario(): Observable<Usuario | null> {
    return new Observable(observer => {
      observer.next(this._usuarioAutenticado());
      observer.complete();
    });
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
  getToken(): string | null {
    return this.getCookie(this.TOKEN_KEY);
  }

  /**
   * Define um cookie
   * @param name Nome do cookie
   * @param value Valor do cookie
   * @param minutes Minutos para expiração
   */
  private setCookie(name: string, value: string, minutes: number): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    const expiresString = expires.toUTCString();

    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expiresString};path=/;SameSite=Strict`;
  }

  /**
   * Obtém um cookie
   * @param name Nome do cookie
   * @returns Valor do cookie ou null
   */
  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }

  /**
   * Remove um cookie
   * @param name Nome do cookie
   */
  private removerCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
} 