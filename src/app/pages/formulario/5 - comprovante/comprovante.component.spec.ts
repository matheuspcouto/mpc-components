import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprovanteComponent } from './comprovante.component';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { ErrorService } from '../../../shared/error/error.service';

describe('ComprovanteComponent', () => {
  let component: ComprovanteComponent;
  let fixture: ComponentFixture<ComprovanteComponent>;
  let inscricaoService: any;
  let toastrService: any;
  let errorService: any;

  beforeEach(async () => {
    const inscricaoServiceMock = {
      getDadosInscricao: jest.fn().mockReturnValue({ id: '123' }),
      detalharInscricao: jest.fn().mockReturnValue({
        subscribe: ({ next, error }: any) => error({ mensagem: 'Erro ao detalhar' })
      }),
      isDadosPessoaisCompletos: jest.fn(),
      isContatoCompleto: jest.fn(),
      isPagamentoCompleto: jest.fn(),
      isInscricaoCompleta: jest.fn(),
      atualizarDadosInscricao: jest.fn(),
      getEtapaAtual: jest.fn(),
      listarInscricoes: jest.fn(),
      inscrever: jest.fn()
    };
    const toastrServiceMock = {
      info: jest.fn(),
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn()
    };
    const errorServiceMock = { construirErro: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [ComprovanteComponent, MpcButtonComponent],
      providers: [
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ErrorService, useValue: errorServiceMock }
      ]
    }).compileComponents();
    inscricaoService = TestBed.inject(InscricaoService);
    toastrService = TestBed.inject(ToastrService);
    errorService = TestBed.inject(ErrorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar router.navigate ao fechar comprovante', () => {
    const routerSpy = jest.spyOn((component as any).router, 'navigate').mockImplementation(() => Promise.resolve(true));
    (component as any).fecharComprovante();
    expect(routerSpy).toHaveBeenCalledWith([require('../../../shared/enums/rotas-enum').Rotas.HOME]);
    routerSpy.mockRestore();
  });

  it('deve copiar texto para área de transferência', () => {
    const mockClipboard = { writeText: jest.fn().mockResolvedValue(undefined) };
    Object.assign(navigator, { clipboard: mockClipboard });
    (component as any).copiarCodigo('codigo-teste');
    expect(mockClipboard.writeText).toHaveBeenCalledWith('codigo-teste');
    expect(toastrService.info).toHaveBeenCalledWith('Copiado para área de transferência', '');
  });

  it('não deve copiar se valor for undefined', () => {
    const mockClipboard = { writeText: jest.fn().mockResolvedValue(undefined) };
    Object.assign(navigator, { clipboard: mockClipboard });
    (component as any).copiarCodigo(undefined);
    expect(mockClipboard.writeText).not.toHaveBeenCalled();
    expect(toastrService.info).not.toHaveBeenCalled();
  });

  it('não deve abrir WhatsApp sem código de inscrição', () => {
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
    component['dadosComprovante'] = { dadosInscricao: {}, dadosPessoais: [], dadosPagamento: { formaPagamento: '', valor: 0 } } as any;
    component['pedirLinkPagamento']();
    expect(mockOpen).not.toHaveBeenCalled();
    mockOpen.mockRestore();
  });

  it('deve retornar classes e textos corretos para status', () => {
    expect((component as any).getBadgeStatusInscricao('ATIVO')).toBe('text-bg-success');
    expect((component as any).getBadgeStatusInscricao('INATIVO')).toBe('text-bg-danger');
    expect((component as any).getBadgeStatusInscricao('DESCONHECIDO')).toBe('');
    expect((component as any).getBadgeStatusInscricao(undefined)).toBe('');
    expect((component as any).getBadgeStatusPagamento('PAGO')).toBe('text-bg-success');
    expect((component as any).getBadgeStatusPagamento('A PAGAR')).toBe('text-bg-danger');
    expect((component as any).getBadgeStatusPagamento('.')).toBe('');
    expect((component as any).getBadgeStatusPagamento(undefined)).toBe('');
    expect((component as any).getTextoStatusPagamento('PAGO')).toBe('Pagamento realizado');
    expect((component as any).getTextoStatusPagamento('.')).toBe('');
    expect((component as any).getTextoStatusPagamento(undefined)).toBe('');
    expect((component as any).getTextoStatusPagamento('A PAGAR')).toBe('Aguardando pagamento');
    expect((component as any).getTextoStatusInscricao('ATIVO')).toBe('Ativo');
    expect((component as any).getTextoStatusInscricao('INATIVO')).toBe('Inativo');
    expect((component as any).getTextoStatusInscricao('.')).toBe('');
    expect((component as any).getTextoStatusInscricao(undefined)).toBe('');
  });

  it('deve formatar moeda e data corretamente', () => {
    expect((component as any).formatarValor(150.50)).toContain('R$');
    expect((component as any).formatarData('2025-02-27')).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect((component as any).formatarData('data-invalida')).toBe('data-inval');
    expect((component as any).formatarData(undefined)).toBe('');
  });

  it('deve chamar ErrorService.construirErro quando detalharInscricao retorna erro no ngOnInit', () => {
    const spyOn = jest.spyOn(component['errorService'], 'construirErro');
    component.ngOnInit();
    expect(spyOn).toHaveBeenCalled();
  });

  it('deve inicializar dados de inscrição corretamente', () => {
    const response = { id: '1', dataInscricao: '2024-01-01', status: 'ATIVO' };
    const result = (component as any).inicializarDadosInscricao(response);
    expect(result).toEqual({ codigoInscricao: '1', dataInscricao: '2024-01-01', status: 'ATIVO' });
  });

  it('deve inicializar dados de inscrição alternativos', () => {
    const response = {};
    const result = (component as any).inicializarDadosInscricao(response);
    expect(result).toEqual({ codigoInscricao: '-', dataInscricao: '-', status: '-' });
  });

  it('deve inicializar dados pessoais com todos os campos', () => {
    const response = {
      nome: 'João', cpfCnpj: '123', dataNasc: '2000-01-01', sexo: 'M', estadoCivil: 'Solteiro', idade: 30, telefone: '999', email: 'a@a.com', endereco: 'Rua X'
    };
    const result = (component as any).inicializarDadosPessoais(response);
    expect(result.length).toBe(9);
    expect(result.find((d: any) => d.label === 'Nome').valor).toBe('João');
    expect(result.find((d: any) => d.label === 'CPF/CNPJ').valor).toBe('123');
    expect(result.find((d: any) => d.label === 'Data de Nascimento')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'Sexo')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'Estado Civil')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'Idade')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'Telefone')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'E-mail')).toBeTruthy();
    expect(result.find((d: any) => d.label === 'Endereço')).toBeTruthy();
  });

  it('deve inicializar dados de pagamento corretamente', () => {
    const response = { formaPagamento: 'Pix', valor: 100, statusPagamento: 'PAGO', dataPagamento: '2024-01-01' };
    const result = (component as any).inicializarDadosPagamento(response);
    expect(result).toEqual({ formaPagamento: 'Pix', valor: 100, statusPagamento: 'PAGO', dataPagamento: '2024-01-01' });
  });

  it('deve inicializar dados de pagamento corretamente', () => {
    const response = {};
    const result = (component as any).inicializarDadosPagamento(response);
    expect(result).toEqual({ formaPagamento: '-', valor: 0, statusPagamento: 'A PAGAR', dataPagamento: undefined });
  });

  it('deve abrir WhatsApp com código de inscrição', () => {
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
    component['dadosComprovante'] = { dadosInscricao: { codigoInscricao: '123' }, dadosPessoais: [], dadosPagamento: { formaPagamento: '', valor: 0 } } as any;
    component['pedirLinkPagamento']();
    expect(mockOpen).toHaveBeenCalled();
    mockOpen.mockRestore();
  });

  it('deve setar isCopiado como true e depois false após timeout', async () => {
    jest.useFakeTimers();
    const mockClipboard = { writeText: jest.fn().mockResolvedValue(undefined) };
    Object.assign(navigator, { clipboard: mockClipboard });
    component['isCopiado'] = false;
    (component as any).copiarCodigo('codigo-teste');
    expect(component['isCopiado']).toBe(true);
    jest.advanceTimersByTime(3000);
    expect(component['isCopiado']).toBe(false);
    jest.useRealTimers();
  });

  it('deve detalharInscricao com fluxo de sucesso', () => {
    const response = {
      id: '1', dataInscricao: '2024-01-01', status: 'ATIVO',
      nome: 'João', cpfCnpj: '123', dataNasc: '2000-01-01', sexo: 'M', estadoCivil: 'Solteiro', idade: 30, telefone: '999', email: 'a@a.com', endereco: 'Rua X',
      formaPagamento: 'Pix', valor: 100, statusPagamento: 'PAGO', dataPagamento: '2024-01-01'
    };
    inscricaoService.detalharInscricao = jest.fn().mockReturnValue({
      subscribe: ({ next, error }: any) => next(response)
    });
    component['detalharInscricao']('1');
    expect(component['dadosComprovante']).toBeDefined();
    expect(component['dadosComprovante'].dadosInscricao.codigoInscricao).toBe('1');
    expect(component['dadosComprovante'].dadosPessoais.length).toBeGreaterThan(0);
    expect(component['dadosComprovante'].dadosPagamento.formaPagamento).toBe('Pix');
  });

  it('deve chamar ErrorService.construirErro quando detalharInscricao retorna erro', () => {
    const spyOn = jest.spyOn(component['errorService'], 'construirErro');
    inscricaoService.detalharInscricao = jest.fn().mockReturnValue({
      subscribe: ({ next, error }: any) => error({ mensagem: 'Erro ao detalhar' })
    });
    component['detalharInscricao']('1');

    inscricaoService.detalharInscricao = jest.fn().mockReturnValue({
      subscribe: ({ next, error }: any) => error({})
    });
    component['detalharInscricao']('1');
    expect(spyOn).toHaveBeenCalled();
  });
});
