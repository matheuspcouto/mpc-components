import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { InscricoesGuard } from './inscricoes.guard';
import { Rotas } from '../../shared/enums/rotas-enum';
import { Router } from '@angular/router';
import { MpcErrorService } from '../../shared/components/mpc-error/mpc-error.service';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

describe('InscricoesGuard', () => {
  let guard: InscricoesGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;
  let errorService: jest.Mocked<MpcErrorService>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      listarInscricoes: jest.fn(),
    } as any;
    const routerMock = {
      navigate: jest.fn()
    } as any;
    const errorServiceMock = {
      construirErro: jest.fn()
    } as any;
    TestBed.configureTestingModule({
      providers: [
        InscricoesGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MpcErrorService, useValue: errorServiceMock }
      ]
    });
    guard = TestBed.inject(InscricoesGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    errorService = TestBed.inject(MpcErrorService) as jest.Mocked<MpcErrorService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('deve retornar true quando há menos de 3 inscrições', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ 
        data: Array(2).fill(null).map(() => ({ id: 1, nome: 'Teste' })) 
      }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve retornar false quando há 3 ou mais inscrições', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ 
        data: Array(3).fill(null).map(() => ({ id: 1, nome: 'Teste' })) 
      }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        done();
      });
    });

    it('deve retornar true quando data é undefined', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ data: undefined }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve retornar true quando data é null', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ data: null }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve retornar true quando data é array vazio', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ data: [] }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('deve retornar false quando response contém error', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ error: 'Erro no servidor' }));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        expect(errorService.construirErro).toHaveBeenCalled();
        done();
      });
    });

    it('deve retornar false quando há erro na requisição', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(throwError(() => new Error('Erro de rede')));

      guard.canActivate().subscribe(result => {
        expect(result).toBe(false);
        expect(errorService.construirErro).toHaveBeenCalled();
        done();
      });
    });

    it('deve usar QTD_VAGAS = 3 como limite', (done) => {
      // Teste com exatamente 3 inscrições (limite)
      inscricaoService.listarInscricoes.mockReturnValue(of({ 
        data: Array(3).fill(null).map(() => ({ id: 1, nome: 'Teste' })) 
      }));

      guard.canActivate().subscribe(result => {
        // 3 >= 3, então deve retornar false
        expect(result).toBe(false);
        done();
      });
    });

    it('deve retornar true quando há exatamente 2 inscrições', (done) => {
      inscricaoService.listarInscricoes.mockReturnValue(of({ 
        data: Array(2).fill(null).map(() => ({ id: 1, nome: 'Teste' })) 
      }));

      guard.canActivate().subscribe(result => {
        // 2 < 3, então deve retornar true
        expect(result).toBe(true);
        done();
      });
    });
  });
});
