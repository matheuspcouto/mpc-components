import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import PagamentoComponent from './pagamento.component';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../shared/error/error.service';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let mockInscricaoService: any;
  let mockFormBuilder: any;
  let mockToastrService: any;
  let mockErrorService: any;

  beforeEach(async () => {
    mockInscricaoService = { atualizarDadosInscricao: jest.fn(), getDadosInscricao: jest.fn(), isPagamentoCompleto: jest.fn() };
    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        formaPagamento: new FormControl('', Validators.required),
        valor: new FormControl(100, Validators.required)
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    };
    mockToastrService = { error: jest.fn() };
    mockErrorService = { construirErro: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [PagamentoComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        { provide: ToastrService, useValue: mockToastrService },
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
    expect(component['form'].value).toEqual({ formaPagamento: '', valor: 100 });
    expect(component['formasPagamento'].length).toBeGreaterThan(0);
  });

  it('deve aplicar taxa de 5% quando forma de pagamento é Cartão', () => {
    component['form'].patchValue({ formaPagamento: 'Cartão' });
    component['calcularValorTotal']();
    expect(component['form'].value.valor).toBe(105);
  });

  it('deve manter valor normal quando forma de pagamento não é Cartão', () => {
    component['form'].patchValue({ formaPagamento: 'Pix' });
    component['calcularValorTotal']();
    expect(component['form'].value.valor).toBe(100);
  });

  it('deve atualizar forma de pagamento e calcular valor', () => {
    const spy = jest.spyOn(component as any, 'calcularValorTotal');
    component['atualizarFormaPagamento']('Pix');
    expect(component['form'].value.formaPagamento).toBe('Pix');
    expect(spy).toHaveBeenCalled();
  });

  it('deve formatar valor decimal em moeda brasileira', () => {
    expect(component['formatarValor'](105.50).length).toBeGreaterThan(0);
  });

  it('deve mostrar erro se tentar avançar com formulário inválido', () => {
    component['form'].patchValue({ formaPagamento: '' });
    component['proximaEtapa']();
    expect(mockInscricaoService.atualizarDadosInscricao).not.toHaveBeenCalled();
  });

  it('deve avançar para próxima etapa se formulário for válido', () => {
    component['form'].patchValue({ formaPagamento: 'Pix', valor: 100 });
    component['proximaEtapa']();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve atualizar dados e navegar para etapa anterior', () => {
    const formValue = { formaPagamento: 'Cartão', valor: 105 };
    component['form'].patchValue(formValue);
    component['etapaAnterior']();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalledWith(formValue, 2);
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
    component['proximaEtapa']();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em etapaAnterior', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ formaPagamento: 'Pix', valor: 100 });
    component['etapaAnterior']();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve inicializar o formulário com dados de inscrição completos', () => {
    const dadosMock = { valor: 200, formaPagamento: 'Pix' };
    mockInscricaoService.isPagamentoCompleto.mockReturnValue(true);
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    component['atualizarForm']();
    expect(component['form'].value.valor).toBe(200);
    expect(component['form'].value.formaPagamento).toBe('Pix');
  });
});
