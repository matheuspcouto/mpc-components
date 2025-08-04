import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesInscricaoComponent } from './detalhes-inscricao.component';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { Router } from '@angular/router';
import { Inscricao } from '../model/inscricao.model';

describe('DetalhesInscricaoComponent', () => {
  let component: DetalhesInscricaoComponent;
  let fixture: ComponentFixture<DetalhesInscricaoComponent>;
  let mockInscricaoService: any;
  let mockToastr: any;
  let mockMpcErrorService: any;
  let mockRouter: any;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      limparDadosInscricao: jest.fn()
    };

    mockToastr = { info: jest.fn() };

    mockMpcErrorService = { construirErro: jest.fn() };

    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [DetalhesInscricaoComponent],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: MpcErrorService, useValue: mockMpcErrorService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DetalhesInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve detalharInscricao com sucesso', () => {
    mockInscricaoService.getDadosInscricao.mockReturnValue({ id: 1 });
    component['detalharInscricao']();
    expect(component['dadosDetalhesInscricao']).toBeTruthy();
  });

  it('deve tratar erro em detalharInscricao', () => {
    mockInscricaoService.getDadosInscricao.mockImplementation(() => { throw new Error('erro'); });
    component['detalharInscricao']();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve inicializar dados pessoais', () => {
    const insc = new Inscricao();
    insc.nome = 'A';
    insc.cpfCnpj = 'B';
    insc.dataNasc = '2000-01-01';
    insc.sexo = 'M';
    insc.estadoCivil = 'Solteiro';
    insc.idade = 10;
    insc.telefone = '1';
    insc.email = 'a';
    insc.endereco = 'b';
    const result = component['inicializarDadosPessoais'](insc);
    expect(result.length).toBeGreaterThan(0);
  });

  it('deve inicializar dados pessoais vazios', () => {
    const insc = new Inscricao();
    const result = component['inicializarDadosPessoais'](insc);
    expect(result.length).toBe(0);
  });

  it('deve inicializar dados de inscrição', () => {
    const insc = new Inscricao();
    insc.id = 1;
    insc.dataInscricao = '2024-01-01';
    insc.status = 'ATIVO';
    const result = component['inicializarDadosInscricao'](insc);
    expect(result.codigoInscricao).toBe('1');
  });

  it('deve inicializar dados de inscrição alternativos', () => {
    const insc = new Inscricao();
    const result = component['inicializarDadosInscricao'](insc);
    expect(result.codigoInscricao).toBe('-');
  });

  it('deve inicializar dados de pagamento', () => {
    const insc = new Inscricao();
    insc.formaPagamento = 'Pix';
    insc.valor = 100;
    insc.statusPagamento = 'PAGO';
    insc.dataPagamento = '2024-01-01';
    const result = component['inicializarDadosPagamento'](insc);
    expect(result.formaPagamento).toBe('Pix');
  });

  it('deve inicializar dados de pagamento padrão', () => {
    const insc = new Inscricao();
    const result = component['inicializarDadosPagamento'](insc);
    expect(result.formaPagamento).toBe('-');
  });

  it('deve copiar código', () => {
    Object.assign(navigator, { clipboard: { writeText: jest.fn() } });
    component['copiarCodigo']('abc');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('abc');
    expect(mockToastr.info).toHaveBeenCalled();
  });

  it('não deve copiar código se valor indefinido', () => {
    Object.assign(navigator, { clipboard: { writeText: jest.fn() } });
    component['copiarCodigo'](undefined);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  it('deve pedir link pagamento se código existir', () => {
    window.open = jest.fn();
    component['dadosDetalhesInscricao'] = { dadosInscricao: { codigoInscricao: '1' } } as any;
    component['pedirLinkPagamento']();
    expect(window.open).toHaveBeenCalled();
  });

  it('não deve pedir link pagamento se código não existir', () => {
    window.open = jest.fn();
    component['dadosDetalhesInscricao'] = { dadosInscricao: { codigoInscricao: undefined } } as any;
    component['pedirLinkPagamento']();
    expect(window.open).not.toHaveBeenCalled();
  });

  it('deve retornar badge e texto de status', () => {
    // getBadgeStatusInscricao
    expect(component['getBadgeStatusInscricao']('ATIVO')).toBe('text-bg-success');
    expect(component['getBadgeStatusInscricao']('INATIVO')).toBe('text-bg-danger');
    expect(component['getBadgeStatusInscricao']('X')).toBe('');
    expect(component['getBadgeStatusInscricao'](undefined)).toBe('');

    // getTextoStatusInscricao
    expect(component['getTextoStatusInscricao']('ATIVO')).toBe('Ativo');
    expect(component['getTextoStatusInscricao']('INATIVO')).toBe('Inativo');
    expect(component['getTextoStatusInscricao']('X')).toBe('');
    expect(component['getTextoStatusInscricao'](undefined)).toBe('');

    // getBadgeStatusPagamento
    expect(component['getBadgeStatusPagamento']('PAGO')).toBe('text-bg-success');
    expect(component['getBadgeStatusPagamento']('A PAGAR')).toBe('text-bg-danger');
    expect(component['getBadgeStatusPagamento']('X')).toBe('');
    expect(component['getBadgeStatusPagamento'](undefined)).toBe('');

    // getTextoStatusPagamento
    expect(component['getTextoStatusPagamento']('PAGO')).toBe('Pagamento realizado');
    expect(component['getTextoStatusPagamento']('A PAGAR')).toBe('Aguardando pagamento');
    expect(component['getTextoStatusPagamento']('X')).toBe('');
    expect(component['getTextoStatusPagamento'](undefined)).toBe('');
  });

  it('deve formatar valor e data', () => {
    expect(component['formatarValor'](10)).toContain('R$');
    expect(component['formatarData']('data-invalida')).toBe('');
    expect(component['formatarData']('')).toBe('');
  });

  it('deve navegar para home', () => {
    component['irParaHome']();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('deve setar isCopiado como true e depois false após timeout', () => {
    jest.useFakeTimers();
    Object.assign(navigator, { clipboard: { writeText: jest.fn() } });
    component['isCopiado'] = false;
    component['copiarCodigo']('codigo-teste');
    expect(component['isCopiado']).toBe(true);
    jest.advanceTimersByTime(3000);
    expect(component['isCopiado']).toBe(false);
    jest.useRealTimers();
  });
});
