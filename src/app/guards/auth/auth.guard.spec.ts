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
      getAutenticado: jest.fn(),
      isAutenticado: jest.fn(),
      getUsuario: jest.fn(),
      getUsuarioAtual: jest.fn(),
      getToken: jest.fn(),
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
      authService.getAutenticado.mockReturnValue(true);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot());
      
      result.subscribe(permitido => {
        expect(permitido).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('deve bloquear acesso quando usuário não está autenticado', () => {
      authService.getAutenticado.mockReturnValue(false);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot('/pagina-protegida'));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN], {
          queryParams: { returnUrl: '/pagina-protegida' }
        });
      });
    });

    it('deve redirecionar para login com returnUrl quando não autenticado', () => {
      authService.getAutenticado.mockReturnValue(false);
      const urlAtual = '/formulario/dados-pessoais';
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot(urlAtual));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN], {
          queryParams: { returnUrl: urlAtual }
        });
      });
    });

    it('deve redirecionar para login sem returnUrl quando não autenticado e sem URL específica', () => {
      authService.getAutenticado.mockReturnValue(false);
      
      const result = guard.canActivate(criarSnapshot(), criarStateSnapshot(''));
      
      result.subscribe(permitido => {
        expect(permitido).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.LOGIN], {
          queryParams: { returnUrl: '' }
        });
      });
    });
  });
}); 