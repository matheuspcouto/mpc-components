import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcComprovanteComponent, MpcComprovanteConfig } from './mpc-comprovante.component';
import { MpcComprovanteService } from './mpc-comprovante.service';
import { ToastrService } from 'ngx-toastr';

describe('MpcComprovanteComponent', () => {
  let component: MpcComprovanteComponent;
  let fixture: ComponentFixture<MpcComprovanteComponent>;
  let mockMpcComprovanteService: jest.Mocked<MpcComprovanteService>;
  let mockToastrService: jest.Mocked<ToastrService>;

  const mockComprovante: MpcComprovanteConfig = {
    titulo: 'Comprovante de Inscrição',
    dados: {
      dadosInscricao: {
        codigoInscricao: '123456',
        dataInscricao: '2023-01-01',
        status: 'ATIVO',
      },
      dadosPessoais: [
        { label: 'Nome', valor: 'João da Silva' },
        { label: 'CPF', valor: '123.456.789-00' },
        { label: 'E-mail', valor: 'joao@example.com' },
      ],
      dadosPagamento: {
        formaPagamento: 'PIX',
        valor: 100.00,
        statusPagamento: 'A PAGAR',
        dataPagamento: '2023-01-01'
      }
    }
  }

  beforeEach(async () => {
    const mpcComprovanteServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
      action$: { next: jest.fn() },
      lastFocusElement: null
    } as any;

    const toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [MpcComprovanteComponent],
      providers: [
        { provide: MpcComprovanteService, useValue: mpcComprovanteServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
      .compileComponents();

    mockMpcComprovanteService = TestBed.inject(MpcComprovanteService) as jest.Mocked<MpcComprovanteService>;
    mockToastrService = TestBed.inject(ToastrService) as jest.Mocked<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.comprovante = mockComprovante;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal de comprovante', () => {
    component.abrirComprovante();
    expect(component['exibir']).toBe(true);
    expect(mockMpcComprovanteService.show).toHaveBeenCalled();
  });

  it('deve fechar o modal de comprovante', () => {
    component.fecharComprovante();
    expect(component['exibir']).toBe(false);
  });

  it('deve chamar comprovanteService.show() ao abrir comprovante', () => {
    component.abrirComprovante();

    expect(mockMpcComprovanteService.show).toHaveBeenCalled();
  });

  it('deve chamar comprovanteService.hide() ao fechar comprovante', () => {
    component.fecharComprovante();

    expect(mockMpcComprovanteService.hide).toHaveBeenCalled();
  });

  it('deve resetar isCopiado ao fechar comprovante', () => {
    component['isCopiado'] = true;

    component.fecharComprovante();

    expect(component['isCopiado']).toBe(false);
  });

  it('deve definir exibir como false ao fechar comprovante', () => {
    component['exibir'] = true;

    component.fecharComprovante();

    expect(component['exibir']).toBe(false);
  });

  it('não deve abrir comprovante se não houver dados', () => {
    component.comprovante = { titulo: 'Teste', dados: null } as any;

    component.abrirComprovante();

    expect(mockMpcComprovanteService.show).not.toHaveBeenCalled();
    expect(component['exibir']).toBe(false);
  });

  it('deve definir dadosInscricao corretamente ao abrir comprovante', () => {
    component.abrirComprovante();

    expect(component['dadosInscricao']).toEqual(mockComprovante.dados.dadosInscricao);
  });

  it('deve definir dadosPessoais corretamente ao abrir comprovante', () => {
    component.abrirComprovante();

    expect(component['dadosPessoais']).toEqual(mockComprovante.dados.dadosPessoais);
  });

  it('deve definir dadosPagamento corretamente ao abrir comprovante', () => {
    component.abrirComprovante();

    expect(component['dadosPagamento']).toEqual(mockComprovante.dados.dadosPagamento);
  });

  it('deve definir dados como undefined quando não existirem', () => {
    component.comprovante = {
      titulo: 'Teste',
      dados: {}
    } as any;

    component.abrirComprovante();

    expect(component['dadosInscricao']).toBeUndefined();
    expect(component['dadosPessoais']).toBeUndefined();
    expect(component['dadosPagamento']).toBeUndefined();
  });

  it('deve copiar o código de inscrição para a área de transferência', () => {
    const codigoInscricao = '123456';
    const writeTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true
    });

    component.copiarCodigo(codigoInscricao);
    expect(writeTextMock).toHaveBeenCalledWith(codigoInscricao);
    expect(component['isCopiado']).toBe(true);
  });

  it('deve retornar undefined ao copiar código de inscrição quando não houver código', () => {
    const codigoInscricao = undefined;
    const writeTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true
    });
    component.copiarCodigo(codigoInscricao);
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(component['isCopiado']).toBe(false);
  });

  it('deve pedir o link de pagamento', () => {
    component['dadosInscricao'] = { codigoInscricao: '123456' };
    component.pedirLinkPagamento();
  });

  it('getBadgeStatusInscricao deve retornar a classe correta com base no status da inscrição', () => {
    let statusInscricao = 'ATIVO';
    expect(component.getBadgeStatusInscricao(statusInscricao)).toBe('text-bg-success');
    statusInscricao = 'INATIVO';
    expect(component.getBadgeStatusInscricao(statusInscricao)).toBe('text-bg-danger');
    statusInscricao = 'PENDENTE';
    expect(component.getBadgeStatusInscricao(statusInscricao)).toBeUndefined();
  });

  it('getBadgeStatusPagamento deve retornar a classe correta com base no status do pagamento', () => {
    let statusPagamento = 'A PAGAR';
    expect(component.getBadgeStatusPagamento(statusPagamento)).toBe('text-bg-danger');
    statusPagamento = 'PAGO';
    expect(component.getBadgeStatusPagamento(statusPagamento)).toBe('text-bg-success');
    statusPagamento = 'PENDENTE';
    expect(component.getBadgeStatusPagamento(statusPagamento)).toBeUndefined();
  });

  it('getTextoStatusPagamento deve retornar a mensagem correta com base no status do pagamento', () => {
    let statusPagamento = 'A PAGAR';
    expect(component.getTextoStatusPagamento(statusPagamento)).toBe('Aguardando pagamento');
    statusPagamento = 'PAGO';
    expect(component.getTextoStatusPagamento(statusPagamento)).toBe('Pagamento realizado');
    statusPagamento = 'PENDENTE';
    expect(component.getTextoStatusPagamento(statusPagamento)).toBeUndefined();
  });

  it('getTextoStatusInscricao deve retornar a mensagem correta com base no status da inscrição', () => {
    let statusInscricao = 'ATIVO';
    expect(component.getTextoStatusInscricao(statusInscricao)).toBe('Ativo');
    statusInscricao = 'INATIVO';
    expect(component.getTextoStatusInscricao(statusInscricao)).toBe('Inativo');
    statusInscricao = 'PENDENTE';
    expect(component.getTextoStatusInscricao(statusInscricao)).toBeUndefined();
  });

  it('deve formatar valor corretamente', () => {
    const valor = 100.00;
    const valorFormatado = component.formatarValor(valor);
    expect(valorFormatado).toContain("100,00");
  });

  it('deve formatar data corretamente', () => {
    const data = '2023/01/01';
    const dataFormatada = component.formatarData(data);
    expect(dataFormatada).toBe('01/01/2023');
  });

  it('deve formatar data inválida', () => {
    const data = 'data inválida';
    const dataFormatada = component.formatarData(data);
    expect(dataFormatada.length).toBeGreaterThan(0);
  });
});
