import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import PagamentoComponent from './pagamento.component';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let mockInscricaoService: jest.Mocked<InscricaoService>;
  let mockFormBuilder: jest.Mocked<NonNullableFormBuilder>;
  let mockToastrService: jest.Mocked<ToastrService>;

  beforeEach(async () => {
    mockInscricaoService = {
      atualizarDadosInscricao: jest.fn()
    } as any;

    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        formaPagamento: new FormControl('', Validators.required),
        valor: new FormControl(100, Validators.required)
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    } as any;

    mockToastrService = {
      error: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [PagamentoComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        { provide: ToastrService, useValue: mockToastrService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
  });

  describe('inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar o formulário com valores padrão', () => {
      expect(component['form'].value).toEqual({
        formaPagamento: '',
        valor: 100
      });
    });

    it('deve inicializar formas de pagamento corretamente', () => {
      expect(component['formasPagamento']).toEqual([
        { label: 'Cartão', value: 'Cartão', selected: false },
        { label: 'Pix', value: 'Pix', selected: false },
        { label: 'Dinheiro', value: 'Dinheiro', selected: false }
      ]);
    });
  });

  describe('calcularValorTotal', () => {
    it('deve aplicar taxa de 5% quando forma de pagamento é Cartão', () => {
      component['form'].patchValue({ formaPagamento: 'Cartão' });

      component['calcularValorTotal']();

      expect(component['form'].value.valor).toBe(105);
    });

    it('deve manter valor normal quando forma de pagamento é Pix', () => {
      component['form'].patchValue({ formaPagamento: 'Pix' });

      component['calcularValorTotal']();

      expect(component['form'].value.valor).toBe(100);
    });

    it('deve manter valor normal quando forma de pagamento é Dinheiro', () => {
      component['form'].patchValue({ formaPagamento: 'Dinheiro' });

      component['calcularValorTotal']();

      expect(component['form'].value.valor).toBe(100);
    });
  });

  describe('atualizarFormaPagamento', () => {
    it('deve atualizar forma de pagamento no formulário', () => {
      const formaPagamento = 'Pix';

      component['atualizarFormaPagamento'](formaPagamento);

      expect(component['form'].value.formaPagamento).toBe(formaPagamento);
    });

    it('deve chamar calcularValorTotal após atualizar forma de pagamento', () => {
      const spy = jest.spyOn(component as any, 'calcularValorTotal');

      component['atualizarFormaPagamento']('Cartão');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('formatarValor', () => {
    it('deve formatar valor decimal em moeda brasileira', () => {
      const valorFormatado = component['formatarValor'](105.50);

      expect(valorFormatado.length).toBeGreaterThan(0);
    });
  });

  describe('proximaEtapa', () => {
    it('deve retornar sem fazer nada quando formulário é inválido', () => {
      component['form'].patchValue({ formaPagamento: '' }); // formulário inválido

      component['proximaEtapa']();

      expect(mockInscricaoService.atualizarDadosInscricao).not.toHaveBeenCalled();
    });

    it('deve atualizar dados e navegar para confirmação quando formulário é válido', () => {
      component['form'].patchValue({
        formaPagamento: 'Pix',
        valor: 100
      });

      component['proximaEtapa']();

      expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
    });
  });

  describe('etapaAnterior', () => {
    it('deve atualizar dados e navegar para etapa anterior', () => {
      const formValue = { formaPagamento: 'Cartão', valor: 105 };
      component['form'].patchValue(formValue);

      component['etapaAnterior']();

      expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalledWith(formValue, 2);
    });
  });
});
