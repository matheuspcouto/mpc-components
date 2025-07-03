import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { InscricoesGuard } from './inscricoes.guard';
import { InscricaoService } from '../../pages/formulario/service/inscricao.service';

// Mock do ActivatedRouteSnapshot
function criarSnapshot(data: any = {}) {
  return { data } as ActivatedRouteSnapshot;
}

describe('InscricoesGuard', () => {
  let guard: InscricoesGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      listarInscricoes: jest.fn(),
      getEtapaAtual: jest.fn(),
      isDadosPessoaisCompletos: jest.fn(),
      isContatoCompleto: jest.fn(),
      isInscricaoCompleta: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };
    TestBed.configureTestingModule({
      providers: [
        InscricoesGuard,
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(InscricoesGuard);
    inscricaoService = TestBed.inject(InscricaoService) as jest.Mocked<InscricaoService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  describe('verificarInscricoesAbertas', () => {

    it('deve permitir acesso quando há vagas', done => {
      inscricaoService.listarInscricoes.mockReturnValue(of([]));
      guard.canActivate(criarSnapshot()).subscribe(result => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      });
    });

    it('deve bloquear acesso quando não há vagas', done => {
      inscricaoService.listarInscricoes.mockReturnValue(of([{ id: 1 } as any, { id: 2 } as any]));
      guard.canActivate(criarSnapshot()).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('verificarAcessoFormulario', () => {

    it('deve bloquear se etapaAtual for menor que etapaMinima', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(1);

      const snap = criarSnapshot({ etapaMinima: 2, checagem: 'dadosPessoais' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
      });
    });

    it('deve bloquear se dados pessoais não completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);

      const snap = criarSnapshot({ etapaMinima: 2, checagem: 'dadosPessoais' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
      });
    });

    it('deve permitir se dados pessoais completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(2);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);

      const snap = criarSnapshot({ etapaMinima: 2, checagem: 'dadosPessoais' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('deve bloquear se dados pessoais ou contato não completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(false);

      const snap = criarSnapshot({ etapaMinima: 3, checagem: 'dadosPessoaisEContato' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
      });
    });

    it('deve permitir se dados pessoais e contato completos', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(3);
      inscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      inscricaoService.isContatoCompleto.mockReturnValue(true);

      const snap = criarSnapshot({ etapaMinima: 3, checagem: 'dadosPessoaisEContato' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('deve bloquear se inscrição não completa', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(4);
      inscricaoService.isInscricaoCompleta.mockReturnValue(false);

      const snap = criarSnapshot({ etapaMinima: 4, checagem: 'inscricaoCompleta' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalled();
      });
    });

    it('deve permitir se inscrição completa', () => {
      inscricaoService.getEtapaAtual.mockReturnValue(4);
      inscricaoService.isInscricaoCompleta.mockReturnValue(true);

      const snap = criarSnapshot({ etapaMinima: 4, checagem: 'inscricaoCompleta' });

      guard.canActivate(snap).subscribe(result => {
        expect(result).toBe(true);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });
  });
});
