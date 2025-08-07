import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, Usuario } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Limpar cookies antes de cada teste
    document.cookie = 'AUTH_TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  });

  afterEach(() => {
    httpMock.verify();
    // Limpar cookies após cada teste
    document.cookie = 'AUTH_TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('deve retornar true para credenciais válidas', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(result => {
        expect(result).toBe(true);
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('deve retornar erro para credenciais inválidas', (done) => {
      service.login('usuario@teste.com', 'senhaerrada').subscribe({
        next: () => {
          fail('Deveria ter retornado erro');
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.error(new ErrorEvent('Error'), { status: 401, statusText: 'Unauthorized' });
    });

    it('deve salvar dados do usuário em cookies após login bem-sucedido', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(result => {
        expect(result).toBe(true);
        
        // Verificar se os cookies foram definidos
        const tokenCookie = document.cookie.includes('AUTH_TOKEN=');
        expect(tokenCookie).toBe(true);
        
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('deve limpar cookies e estado de autenticação', (done) => {
      // Primeiro fazer login para ter dados para limpar
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        // Verificar se está autenticado antes do logout
        expect(service.isAuthenticated()).toBe(true);
        
        service.logout();
        
        // Verificar se o estado foi limpo
        expect(service.isAuthenticated()).toBe(false);
        expect(service.getUsuarioAtual()).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });

  describe('isAuthenticated', () => {
    it('deve retornar false quando não há usuário autenticado', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('deve retornar true quando há usuário autenticado', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });

  describe('getUsuarioAtual', () => {
    it('deve retornar null quando não há usuário autenticado', () => {
      expect(service.getUsuarioAtual()).toBeNull();
    });

    it('deve retornar usuário quando autenticado', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        const usuario = service.getUsuarioAtual();
        expect(usuario).toBeTruthy();
        expect(usuario?.email).toBe('admin@teste.com');
        expect(usuario?.nome).toBe('Administrador');
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });

  describe('getAuthToken', () => {
    it('deve retornar null quando não há token', () => {
      // Garantir que não há cookies antes do teste
      document.cookie = 'AUTH_TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      expect(service.getAuthToken()).toBeNull();
    });

    it('deve retornar token quando usuário está autenticado', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          authToken: 'token_simulado_admin_123456',
          expiresIn: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        const token = service.getAuthToken();
        expect(token).toBeTruthy();
        expect(token).toBe('token_simulado_admin_123456');
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });
}); 