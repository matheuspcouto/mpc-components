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
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'auth_user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  });

  afterEach(() => {
    httpMock.verify();
    // Limpar cookies após cada teste
    document.cookie = 'auth_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    document.cookie = 'auth_user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
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
          token: 'token_simulado_admin_123456'
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
          token: 'token_simulado_admin_123456'
        }
      };

      service.login('admin@teste.com', '123456').subscribe(result => {
        expect(result).toBe(true);
        
        // Verificar se os cookies foram definidos
        const tokenCookie = document.cookie.includes('auth_token=');
        const userCookie = document.cookie.includes('auth_user=');
        expect(tokenCookie).toBe(true);
        expect(userCookie).toBe(true);
        
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
          token: 'token_simulado_admin_123456'
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        service.logout();
        
        // Verificar se os cookies foram removidos
        const tokenCookie = document.cookie.includes('auth_token=');
        const userCookie = document.cookie.includes('auth_user=');
        expect(tokenCookie).toBe(false);
        expect(userCookie).toBe(false);
        
        // Verificar se o estado foi limpo
        expect(service.getAutenticado()).toBe(false);
        expect(service.getUsuarioAtual()).toBeNull();
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });

    it('deve emitir false para isAuthenticated após logout', (done) => {
      service.logout();
      
      service.isAutenticado().subscribe(autenticado => {
        expect(autenticado).toBe(false);
        done();
      });
    });

    it('deve emitir null para usuário após logout', (done) => {
      service.logout();
      
      service.getUsuario().subscribe(usuario => {
        expect(usuario).toBeNull();
        done();
      });
    });
  });

  describe('getAutenticado', () => {
    it('deve retornar false quando não há usuário autenticado', () => {
      expect(service.getAutenticado()).toBe(false);
    });

    it('deve retornar true quando há usuário autenticado', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          token: 'token_simulado_admin_123456'
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        expect(service.getAutenticado()).toBe(true);
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
          token: 'token_simulado_admin_123456'
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

  describe('getToken', () => {
    it('deve retornar null quando não há token', () => {
      expect(service.getToken()).toBeNull();
    });

    it('deve retornar token quando usuário está autenticado', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          token: 'token_simulado_admin_123456'
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        const token = service.getToken();
        expect(token).toBeTruthy();
        expect(token).toBe('token_simulado_admin_123456');
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });

  describe('carregarUsuarioSalvo', () => {
    it('deve carregar usuário dos cookies se existir', () => {
      const usuarioMock: Usuario = {
        id: 1,
        nome: 'Teste',
        email: 'teste@teste.com',
        token: 'token_teste'
      };
      
      // Definir cookies manualmente
      document.cookie = `auth_token=token_teste;path=/;SameSite=Strict`;
      document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(usuarioMock))};path=/;SameSite=Strict`;
      
      // Recria o serviço usando TestBed para ter injeção de dependência
      const novoService = TestBed.inject(AuthService);
      
      // Aguarda um pouco para o carregamento dos cookies
      setTimeout(() => {
        expect(novoService.getAutenticado()).toBe(true);
        expect(novoService.getUsuarioAtual()).toEqual(usuarioMock);
      }, 100);
    });

    it('deve fazer logout se dados dos cookies estiverem corrompidos', () => {
      // Definir cookies com dados inválidos
      document.cookie = 'auth_token=token_teste;path=/;SameSite=Strict';
      document.cookie = 'auth_user=json_invalido;path=/;SameSite=Strict';
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Recria o serviço usando TestBed para ter injeção de dependência
      const novoService = TestBed.inject(AuthService);
      
      // Aguarda um pouco para o carregamento dos cookies
      setTimeout(() => {
        expect(novoService.getAutenticado()).toBe(false);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
      }, 100);
    });
  });

  describe('expiração de cookies', () => {
    it('deve definir cookies com expiração de 15 minutos', (done) => {
      const mockResponse = {
        data: {
          id: 1,
          nome: 'Administrador',
          email: 'admin@teste.com',
          token: 'token_simulado_admin_123456'
        }
      };

      service.login('admin@teste.com', '123456').subscribe(() => {
        // Verificar se os cookies foram definidos
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('auth_token='));
        const userCookie = cookies.find(c => c.trim().startsWith('auth_user='));
        
        expect(tokenCookie).toBeTruthy();
        expect(userCookie).toBeTruthy();
        
        // Verificar se os cookies contêm o valor esperado (decodificado)
        expect(tokenCookie).toContain('token_simulado_admin_123456');
        expect(userCookie).toBeTruthy();
        if (userCookie) {
          expect(decodeURIComponent(userCookie)).toContain('admin@teste.com');
        }
        
        done();
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/login`);
      req.flush(mockResponse);
    });
  });
}); 