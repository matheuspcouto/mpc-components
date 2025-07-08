import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import PagamentoComponent from './pagamento.component';
import { InscricaoService } from '../service/inscricao.service';
import { ErrorService } from '../../../shared/error/error.service';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let mockInscricaoService: any;
  let mockFormBuilder: any;
  let mockErrorService: any;

  beforeEach(async () => {

    mockInscricaoService = { atualizarDadosInscricao: jest.fn(), getDadosInscricao: jest.fn(), isPagamentoCompleto: jest.fn() };

    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        formaPagamento: new FormControl(''),
        valor: new FormControl(0)
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    };

    mockErrorService = { construirErro: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [PagamentoComponent],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        { provide: ErrorService, useValue: mockErrorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário e formas de pagamento corretamente', () => {
    expect(component['form'].value).toEqual({ formaPagamento: '', valor: 0.00 });
    expect(component['formasPagamento'].length).toBeGreaterThan(0);
  });

  it('deve aplicar taxa de 5% quando forma de pagamento é Cartão', () => {
    component['form'].patchValue({ formaPagamento: 'Cartão' });
    (component as any).calcularValorTotal();
    component['form'].patchValue({ valor: component['valorInscricao'] });
    expect(component['form'].value.valor).toBe(105);
  });

  it('deve manter valor normal quando forma de pagamento não é Cartão', () => {
    component['form'].patchValue({ formaPagamento: 'Pix' });
    (component as any).calcularValorTotal();
    component['form'].patchValue({ valor: component['valorInscricao'] });
    expect(component['form'].value.valor).toBe(100);
  });

  it('deve formatar valor decimal em moeda brasileira', () => {
    expect((component as any).formatarValor(105.50).length).toBeGreaterThan(0);
  });

  it('deve avançar para próxima etapa se formulário for válido', () => {
    component['form'].patchValue({ formaPagamento: 'Pix', valor: 100 });
    (component as any).proximaEtapa();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve atualizar dados e navegar para etapa anterior', () => {
    const formValue = { formaPagamento: 'Cartão', valor: 105 };
    component['form'].patchValue(formValue);
    (component as any).etapaAnterior();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em ngOninit', () => {
    mockInscricaoService.getDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    mockInscricaoService.isPagamentoCompleto.mockReturnValue(true);
    component.ngOnInit();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em proximaEtapa', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ formaPagamento: 'Pix', valor: 100 });
    (component as any).proximaEtapa();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em etapaAnterior', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ formaPagamento: 'Pix', valor: 100 });
    (component as any).etapaAnterior();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve inicializar o formulário com dados de inscrição completos', () => {
    const dadosMock = { valor: 200, formaPagamento: 'Pix' };
    mockInscricaoService.isPagamentoCompleto.mockReturnValue(true);
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    (component as any).atualizarForm();
    component['form'].patchValue({ valor: component['valorInscricao'] });
    expect(component['form'].value.valor).toBe(200);
    expect(component['form'].value.formaPagamento).toBe('Pix');
  });

  it('deve chamar get valorFormatado', () => {
    expect((component as any).valorFormatado.length).toBeGreaterThan(0);
  });
});
