import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PaginaConfirmacaoGuard } from './pagina-confirmacao.guard';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

describe('PaginaConfirmacaoGuard', () => {
  let guard: PaginaConfirmacaoGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      getEtapaAtual: jest.fn(),
      isInscricaoCompleta: jest.fn()
    } as jest.Mocked<Partial<InscricaoService>>;

    const routerMock = {
      navigate: jest.fn()
    } as jest.Mocked<Partial<Router>>;

    TestBed.configureTestingModule({
      providers: [
        PaginaConfirmacaoGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(PaginaConfirmacaoGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve permitir acesso quando etapa atual é 4 e inscrição está completa', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(4);
      inscricaoService.isInscricaoCompleta.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando etapa atual é menor que 4', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando inscrição não está completa', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(4);
      inscricaoService.isInscricaoCompleta.mockReturnValue(false);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve permitir acesso quando etapa atual é maior que 4 e inscrição está completa', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(5);
      inscricaoService.isInscricaoCompleta.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
