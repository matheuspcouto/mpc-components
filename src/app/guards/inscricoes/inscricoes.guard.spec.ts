import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InscricoesGuard } from './inscricoes.guard';
import { InscricaoService } from '../../pages/formulario/inscricao.service';

describe('InscricoesGuard', () => {
  let guard: InscricoesGuard;
  let inscricaoService: jest.Mocked<InscricaoService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const inscricaoServiceMock = {
      listarInscricoes: jest.fn()
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

  it('deve permitir acesso quando há vagas disponíveis', (done) => {
    const inscricoesMock = [{ id: 1 }, { id: 2 }, { id: 3 }]; // 3 inscrições < 4 vagas
    inscricaoService.listarInscricoes.mockReturnValue(of(inscricoesMock));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('deve bloquear acesso quando não há vagas disponíveis', (done) => {
    const inscricoesMock = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]; // 4 inscrições = 4 vagas
    inscricaoService.listarInscricoes.mockReturnValue(of(inscricoesMock));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
  });

  it('deve bloquear acesso quando excede o número de vagas', (done) => {
    const inscricoesMock = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]; // 5 inscrições > 4 vagas
    inscricaoService.listarInscricoes.mockReturnValue(of(inscricoesMock));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
  });

  it('deve permitir acesso quando não há inscrições', (done) => {
    inscricaoService.listarInscricoes.mockReturnValue(of([]));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });
});
