import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputDateComponent } from './mpc-input-date.component';

describe('MpcInputDateComponent', () => {
  let component: MpcInputDateComponent;
  let fixture: ComponentFixture<MpcInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputDateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Propriedades de entrada', () => {
    it('deve inicializar com valores padrão', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.value).toBe('');
      expect(component.label).toBe('');
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
      expect(component.required).toBe(false);
      expect(component.minDate).toBe('');
      expect(component.maxDate).toBe('');
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'data-nascimento';
      component.tabIndex = 1;
      component.ariaLabel = 'Data de nascimento';
      component.value = '2023-01-01';
      component.label = 'Data de Nascimento';
      component.disabled = true;
      component.readonly = true;
      component.required = true;
      component.minDate = '2020-01-01';
      component.maxDate = '2025-12-31';

      expect(component.id).toBe('data-nascimento');
      expect(component.tabIndex).toBe(1);
      expect(component.ariaLabel).toBe('Data de nascimento');
      expect(component.value).toBe('2023-01-01');
      expect(component.label).toBe('Data de Nascimento');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.required).toBe(true);
      expect(component.minDate).toBe('2020-01-01');
      expect(component.maxDate).toBe('2025-12-31');
    });
  });

  describe('Método onFocus', () => {
    it('deve marcar campo como tocado e validar', () => {
      jest.spyOn(component as any, 'isCampoValido');

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(component['isCampoValido']).toHaveBeenCalledWith(component.value);
    });
  });

  describe('Método setValue', () => {
    it('deve definir valor e emitir quando campo é válido', () => {
      const mockEvent = { target: { value: '2023-01-01' } };
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component.value).toBe('2023-01-01');
      expect(component.valor.emit).toHaveBeenCalledWith('2023-01-01');
    });

    it('deve definir valor mas não emitir quando campo é inválido', () => {
      const mockEvent = { target: { value: '2023-01-01' } };
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component.value).toBe('2023-01-01');
      expect(component.valor.emit).not.toHaveBeenCalled();
    });
  });

  describe('Validação isCampoValido', () => {
    it('deve retornar true quando campo é readonly', () => {
      component.readonly = true;

      const resultado = component['isCampoValido']('2023-01-01');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é disabled', () => {
      component.disabled = true;

      const resultado = component['isCampoValido']('2023-01-01');

      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando campo obrigatório está vazio', () => {
      jest.spyOn(component.error, 'emit');
      component.required = true;
      component['campoTocado'] = true;
      component.label = 'Data';

      const resultado = component['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo Data é obrigatório');
      expect(component.error.emit).toHaveBeenCalledWith({ 'required': true });
    });

    it('deve retornar false e emitir erro quando data é menor que minDate', () => {
      jest.spyOn(component.error, 'emit');
      component.minDate = '2023-01-01';

      const resultado = component['isCampoValido']('2022-12-31');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('A data deve ser maior ou igual a 01/01/2023');
      expect(component.error.emit).toHaveBeenCalledWith({ 'minDate': true });
    });

    it('deve retornar false e emitir erro quando data é maior que maxDate', () => {
      jest.spyOn(component.error, 'emit');
      component.maxDate = '2023-12-31';

      const resultado = component['isCampoValido']('2024-01-01');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('A data deve ser menor ou igual a 31/12/2023');
      expect(component.error.emit).toHaveBeenCalledWith({ 'maxDate': true });
    });

    it('deve retornar true quando todas as validações passam', () => {
      component.required = false;
      component.minDate = '';
      component.maxDate = '';

      const resultado = component['isCampoValido']('2023-01-01');

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
    });
  });

  describe('Validação validaMinDate', () => {
    it('deve retornar false quando minDate não está definido', () => {
      component.minDate = '';

      const resultado = component['validaMinDate']('2023-01-01');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando valor não está definido e minDate existe', () => {
      component.minDate = '2023-01-01';

      const resultado = component['validaMinDate']('');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é menor que minDate', () => {
      component.minDate = '2023-01-01';

      const resultado = component['validaMinDate']('2022-12-31');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando valor é igual a minDate', () => {
      component.minDate = '2023-01-01';

      const resultado = component['validaMinDate']('2023-01-01');

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando valor é maior que minDate', () => {
      component.minDate = '2023-01-01';

      const resultado = component['validaMinDate']('2023-01-02');

      expect(resultado).toBe(false);
    });
  });

  describe('Validação validaMaxDate', () => {
    it('deve retornar false quando maxDate não está definido', () => {
      component.maxDate = '';

      const resultado = component['validaMaxDate']('2023-01-01');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando valor não está definido e maxDate existe', () => {
      component.maxDate = '2023-12-31';

      const resultado = component['validaMaxDate']('');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é maior que maxDate', () => {
      component.maxDate = '2023-12-31';

      const resultado = component['validaMaxDate']('2024-01-01');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando valor é igual a maxDate', () => {
      component.maxDate = '2023-12-31';

      const resultado = component['validaMaxDate']('2023-12-31');

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando valor é menor que maxDate', () => {
      component.maxDate = '2023-12-31';

      const resultado = component['validaMaxDate']('2023-12-30');

      expect(resultado).toBe(false);
    });
  });

  describe('Validação validaRequired', () => {
    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;
      component['campoTocado'] = true;

      const resultado = component['validaRequired']('');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando valor não está definido e campo é obrigatório', () => {
      component.required = true;
      component['campoTocado'] = true;

      const resultado = component['validaRequired']('');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é obrigatório, tocado e valor está vazio', () => {
      component.required = true;
      component['campoTocado'] = true;

      const resultado = component['validaRequired']('');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando campo tem valor', () => {
      component.required = true;
      component['campoTocado'] = true;

      const resultado = component['validaRequired']('2023-01-01');

      expect(resultado).toBe(false);
    });
  });

  describe('Formatação de datas', () => {
    it('deve converter data do formato YYYY-MM-DD para DD/MM/YYYY', () => {
      const resultado = component['formatarData']('2023-03-15');

      expect(resultado).toBe('15/03/2023');
    });

    it('deve converter data com mês e dia de um dígito', () => {
      const resultado = component['formatarData']('2023-1-5');

      expect(resultado).toBe('5/1/2023');
    });

    it('deve retornar string vazia quando data não está definida', () => {
      const resultado = component['formatarData']('');

      expect(resultado).toBe('');
    });

    it('deve retornar string vazia quando data é undefined', () => {
      const resultado = component['formatarData'](undefined);

      expect(resultado).toBe('');
    });
  });

  describe('Propriedades protegidas', () => {
    it('deve inicializar errorMessage como undefined', () => {
      expect(component['errorMessage']).toBeUndefined();
    });

    it('deve inicializar campoTocado como false', () => {
      expect(component['campoTocado']).toBe(false);
    });
  });

  describe('Eventos de saída', () => {
    it('deve ter EventEmitter para valor', () => {
      expect(component.valor).toBeDefined();
      expect(component.valor.emit).toBeDefined();
    });

    it('deve ter EventEmitter para error', () => {
      expect(component.error).toBeDefined();
      expect(component.error.emit).toBeDefined();
    });
  });
});
