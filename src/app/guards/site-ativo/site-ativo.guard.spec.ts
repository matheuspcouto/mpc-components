import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SiteAtivoGuard } from './site-ativo.guard';

describe('SiteAtivoGuard', () => {
  let guard: SiteAtivoGuard;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    const routerSpy = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        SiteAtivoGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(SiteAtivoGuard);
    mockRouter = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve retornar true quando siteAtivo for true', () => {
      // Arrange
      guard.siteAtivo = true;

      // Act
      const resultado = guard.canActivate();

      // Assert
      expect(resultado).toBe(true);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('deve retornar false e navegar para rota AGUARDE quando siteAtivo for false', () => {
      // Arrange
      guard.siteAtivo = false;

      // Act
      const resultado = guard.canActivate();

      // Assert
      expect(resultado).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('propriedades', () => {
    it('deve ter siteAtivo como true por padrão', () => {
      expect(guard.siteAtivo).toBe(true);
    });

    it('deve permitir alterar o valor de siteAtivo', () => {
      // Arrange & Act
      guard.siteAtivo = false;

      // Assert
      expect(guard.siteAtivo).toBe(false);
    });
  });

  describe('injeção de dependências', () => {
    it('deve injetar Router corretamente', () => {
      expect(guard['router']).toBeDefined();
      expect(guard['router']).toBe(mockRouter);
    });
  });
});
