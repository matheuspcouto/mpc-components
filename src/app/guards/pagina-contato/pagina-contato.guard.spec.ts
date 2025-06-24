import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PaginaContatoGuard } from './pagina-contato.guard';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

describe('PaginaContatoGuard', () => {
  let guard: PaginaContatoGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      getEtapaAtual: jest.fn(),
      isDadosPessoaisCompletos: jest.fn()
    } as jest.Mocked<Partial<InscricaoService>>;

    const routerMock = {
      navigate: jest.fn()
    } as jest.Mocked<Partial<Router>>;

    TestBed.configureTestingModule({
      providers: [
        PaginaContatoGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(PaginaContatoGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve permitir acesso quando etapa atual é 2 e dados pessoais estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando etapa atual é menor que 2', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(1);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando dados pessoais não estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve permitir acesso quando etapa atual é maior que 2 e dados pessoais estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando etapa atual é 0', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(0);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
