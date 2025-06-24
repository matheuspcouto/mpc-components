import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PaginaPagamentoGuard } from './pagina-pagamento.guard';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

describe('PaginaPagamentoGuard', () => {
  let guard: PaginaPagamentoGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      getEtapaAtual: jest.fn(),
      isDadosPessoaisCompletos: jest.fn(),
      isContatoCompleto: jest.fn()
    } as any;

    const routerMock = {
      navigate: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        PaginaPagamentoGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(PaginaPagamentoGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve permitir acesso quando etapa atual é 3 e dados estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando etapa atual é menor que 3', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(2);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando dados pessoais não estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(1);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);
      inscricaoService.isContatoCompleto.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando dados de contato não estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);
      inscricaoService.isContatoCompleto.mockReturnValue(false);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve redirecionar para dados pessoais quando ambos os dados não estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(1);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);
      inscricaoService.isContatoCompleto.mockReturnValue(false);

      const resultado = guard.canActivate();

      expect(resultado).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
    });

    it('deve permitir acesso quando etapa atual é maior que 3 e dados estão completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(4);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(true);

      const resultado = guard.canActivate();

      expect(resultado).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
