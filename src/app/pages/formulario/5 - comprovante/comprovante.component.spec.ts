import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprovanteComponent } from './comprovante.component';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { of } from 'rxjs';
import { ErrorService } from '../../../shared/error/error.service';

describe('ComprovanteComponent', () => {
  let component: ComprovanteComponent;
  let fixture: ComponentFixture<ComprovanteComponent>;
  let inscricaoService: Partial<InscricaoService>;
  let toastrService: Partial<ToastrService>;
  let errorService: Partial<ErrorService>;

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

    const errorService = {
      construirErro: jest.fn()
    };


    await TestBed.configureTestingModule({
      imports: [ComprovanteComponent, MpcButtonComponent],
      providers: [
        { provide: InscricaoService, useValue: inscricaoServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ErrorService, useValue: errorService }
      ]
    })
      .compileComponents();

    inscricaoService = TestBed.inject(InscricaoService);
    toastrService = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar window.history.back quando fecharComprovante for chamado', () => {
    const spy = jest.spyOn(window.history, 'back').mockImplementation(() => { });

    // Acessando método protegido através de (component as any)
    (component as any).fecharComprovante();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('deve copiar texto para área de transferência quando copiarCodigo for chamado', () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    const valorTeste = 'codigo-teste';

    (component as any).copiarCodigo(valorTeste);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(valorTeste);
    expect(toastrService.info).toHaveBeenCalledWith('Copiado para área de transferência', '');
  });

  it('não deve copiar quando copiarCodigo for chamado com valor undefined', () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    (component as any).copiarCodigo(undefined);

    expect(mockClipboard.writeText).not.toHaveBeenCalled();
    expect(toastrService.info).not.toHaveBeenCalled();
  });

  it('não deve abrir WhatsApp quando pedirLinkPagamento for chamado sem codigoInscricao', () => {
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
    (component as any).dadosComprovante = { dadosInscricao: { } };
    (component as any).pedirLinkPagamento();
    expect(mockOpen).not.toHaveBeenCalled();
    mockOpen.mockRestore();
  });

  it('deve retornar classe correta para status ATIVO', () => {
    const resultado = (component as any).getBadgeStatusInscricao('ATIVO');
    expect(resultado).toBe('text-bg-success');
  });

  it('deve retornar classe correta para status INATIVO', () => {
    const resultado = (component as any).getBadgeStatusInscricao('INATIVO');
    expect(resultado).toBe('text-bg-danger');
  });

  it('deve retornar string vazia para status desconhecido', () => {
    const resultado = (component as any).getBadgeStatusInscricao('DESCONHECIDO');
    expect(resultado).toBe('');
  });

  it('deve retornar classe correta para status PAGO', () => {
    const resultado = (component as any).getBadgeStatusPagamento('PAGO');
    expect(resultado).toBe('text-bg-success');
  });

  it('deve retornar classe correta para status A PAGAR', () => {
    const resultado = (component as any).getBadgeStatusPagamento('A PAGAR');
    expect(resultado).toBe('text-bg-danger');
  });

  it('deve retornar texto correto para status PAGO', () => {
    const resultado = (component as any).getTextoStatusPagamento('PAGO');
    expect(resultado).toBe('Pagamento realizado');
  });

  it('deve retornar texto correto para status A PAGAR', () => {
    const resultado = (component as any).getTextoStatusPagamento('A PAGAR');
    expect(resultado).toBe('Aguardando pagamento');
  });

  it('deve retornar texto correto para status ATIVO', () => {
    const resultado = (component as any).getTextoStatusInscricao('ATIVO');
    expect(resultado).toBe('Ativo');
  });

  it('deve retornar texto correto para status INATIVO', () => {
    const resultado = (component as any).getTextoStatusInscricao('INATIVO');
    expect(resultado).toBe('Inativo');
  });

  it('deve formatar moeda corretamente', () => {
    const resultado = (component as any).formatarValor(150.50);
    expect(resultado).toContain('R$');
    expect(resultado).toContain('150,50');
  });

  it('deve formatar data corretamente', () => {
    const resultado = (component as any).formatarData('2025-02-27');
    expect(resultado).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  it('deve lidar com data inválida graciosamente', () => {
    const resultado = (component as any).formatarData('data-invalida');
    expect(resultado).toBe('data-inval');
  });

  it('deve retornar string vazia para data undefined', () => {
    const resultado = (component as any).formatarData(undefined);
    expect(resultado).toBe('');
  });

  it('deve retornar string vazia para status undefined', () => {
    const resultado = (component as any).getBadgeStatusInscricao(undefined);
    expect(resultado).toBe('');
  });

  it('deve retornar string vazia para texto de status undefined', () => {
    const resultado = (component as any).getTextoStatusInscricao(undefined);
    expect(resultado).toBe('');
  });

  it('deve chamar ErrorService.construirErro quando detalharInscricao retorna erro no ngOnInit', () => {
    const spyOn = jest.spyOn(component['errorService'], 'construirErro');
    component.ngOnInit();
    expect(spyOn).toHaveBeenCalled();
  });
});
