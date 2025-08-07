import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../shared/services/auth.service';
import { Rotas } from '../../shared/enums/rotas-enum';

// Mock do ActivatedRouteSnapshot
function criarSnapshot(data: any = {}) {
  return { data } as ActivatedRouteSnapshot;
}

// Mock do RouterStateSnapshot
function criarStateSnapshot(url: string = '/teste') {
  return { url } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      getUsuarioAtual: jest.fn(),
      getAuthToken: jest.fn(),
      login: jest.fn(),
      logout: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve permitir acesso quando usuário está autenticado', () => {
      authService.isAuthenticated.mockReturnValue(true);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot());
      
      result.subscribe(permitido => {
        expect(permitido).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('deve bloquear acesso quando usuário não está autenticado', () => {
      authService.isAuthenticated.mockReturnValue(false);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot('/pagina-protegida'));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN]);
      });
    });

    it('deve redirecionar para login quando não autenticado', () => {
      authService.isAuthenticated.mockReturnValue(false);
      const urlAtual = '/formulario/dados-pessoais';
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot(urlAtual));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN]);
      });
    });

    it('deve redirecionar para login sem returnUrl quando não autenticado e sem URL específica', () => {
      authService.isAuthenticated.mockReturnValue(false);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot(''));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN]);
      });
    });
  });
}); 