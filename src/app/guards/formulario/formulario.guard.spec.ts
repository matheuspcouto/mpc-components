import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FormularioGuard } from './formulario.guard';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';
import { MpcErrorService } from '../../shared/components/mpc-error/mpc-error.service';
import { Rotas } from '../../shared/enums/rotas-enum';

describe('FormularioGuard', () => {
  let guard: FormularioGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;
  let errorService: jest.Mocked<MpcErrorService>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      getEtapaAtual: jest.fn(),
      isDadosPessoaisCompletos: jest.fn(),
      isContatoCompleto: jest.fn(),
      isInscricaoCompleta: jest.fn()
    };
    
    const routerMock = {
      navigate: jest.fn()
    };
    
    const errorServiceMock = {
      construirErro: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        FormularioGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MpcErrorService, useValue: errorServiceMock }
      ]
    });

    guard = TestBed.inject(FormularioGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    errorService = TestBed.inject(MpcErrorService) as jest.Mocked<MpcErrorService>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    let mockRoute: ActivatedRouteSnapshot;

    beforeEach(() => {
      mockRoute = {
        data: {}
      } as ActivatedRouteSnapshot;
    });

    it('deve retornar true quando não há etapaMinima nem checagem', (done) => {
      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve retornar true quando há apenas etapaMinima e etapa atual é maior ou igual', (done) => {
      mockRoute.data = { etapaMinima: 2 };
      inscricaoService.getEtapaAtual.mockReturnValue(3);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        expect(inscricaoService.getEtapaAtual).toHaveBeenCalled();
        done();
      });
    });

    it('deve redirecionar para dados pessoais quando etapa atual é menor que etapa mínima', (done) => {
      mockRoute.data = { etapaMinima: 3 };
      inscricaoService.getEtapaAtual.mockReturnValue(1);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.DADOS_PESSOAIS]);
        done();
      });
    });

    it('deve retornar true para checagem dadosPessoais quando dados estão completos', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'dadosPessoais' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        expect(inscricaoService.isDadosPessoaisCompletos).toHaveBeenCalled();
        done();
      });
    });

    it('deve redirecionar para dados pessoais quando checagem dadosPessoais e dados incompletos', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'dadosPessoais' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.DADOS_PESSOAIS]);
        done();
      });
    });

    it('deve retornar true para checagem dadosPessoaisEContato quando ambos estão completos', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'dadosPessoaisEContato' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(true);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        expect(inscricaoService.isDadosPessoaisCompletos).toHaveBeenCalled();
        expect(inscricaoService.isContatoCompleto).toHaveBeenCalled();
        done();
      });
    });

    it('deve redirecionar para dados pessoais quando checagem dadosPessoaisEContato e dados pessoais incompletos', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'dadosPessoaisEContato' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.DADOS_PESSOAIS]);
        expect(inscricaoService.isContatoCompleto).not.toHaveBeenCalled();
        done();
      });
    });

    it('deve redirecionar para dados pessoais quando checagem dadosPessoaisEContato e contato incompleto', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'dadosPessoaisEContato' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(false);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.DADOS_PESSOAIS]);
        done();
      });
    });

    it('deve retornar true para checagem inscricaoCompleta quando inscrição está completa', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'inscricaoCompleta' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isInscricaoCompleta.mockReturnValue(true);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        expect(inscricaoService.isInscricaoCompleta).toHaveBeenCalled();
        done();
      });
    });

    it('deve redirecionar para dados pessoais quando checagem inscricaoCompleta e inscrição incompleta', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'inscricaoCompleta' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isInscricaoCompleta.mockReturnValue(false);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith([Rotas.DADOS_PESSOAIS]);
        done();
      });
    });

    it('deve retornar true para checagem desconhecida', (done) => {
      mockRoute.data = { etapaMinima: 1, checagem: 'checagemDesconhecida' };
      inscricaoService.getEtapaAtual.mockReturnValue(2);

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve tratar erro e retornar false quando exceção é lançada', (done) => {
      mockRoute.data = { etapaMinima: 1 };
      inscricaoService.getEtapaAtual.mockImplementation(() => {
        throw new Error('Erro simulado');
      });

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(errorService.construirErro).toHaveBeenCalled();
        done();
      });
    });

    it('deve tratar erro quando route.data é undefined', (done) => {
      (mockRoute as any).data = undefined;

      guard.canActivate(mockRoute).subscribe(result => {
        expect(result).toBe(false);
        expect(errorService.construirErro).toHaveBeenCalled();
        done();
      });
    });
  });
}); 