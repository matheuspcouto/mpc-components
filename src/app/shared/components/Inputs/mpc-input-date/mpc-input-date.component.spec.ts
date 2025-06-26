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

  describe('Getter e Setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      const valorTeste = '2023-01-01';
      component.Value = valorTeste;
      expect(component.Value).toBe(valorTeste);
    });

    it('deve emitir valor quando campo é válido', () => {
      jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component.Value = '2023-01-01';

      expect(component.valor.emit).toHaveBeenCalledWith('2023-01-01');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);

      component.Value = '2023-01-01';

      expect(component.valor.emit).not.toHaveBeenCalled();
    });
  });

  describe('Métodos de ControlValueAccessor', () => {
    it('deve registrar função onChange', () => {
      const mockFn = jest.fn();
      component.registerOnChange(mockFn);
      expect(component.onChange).toBe(mockFn);
    });

    it('deve registrar função onTouched', () => {
      const mockFn = jest.fn();
      component.registerOnTouched(mockFn);
      expect(component.onTouched).toBe(mockFn);
    });

    it('deve chamar onBlur', () => {
      component['onBlur']();
    });

    it('deve chamar onFocus', () => {
      component['onFocus']();
      expect(component['campoTocado']).toBe(true);
    });
  });

  describe('setValue', () => {
    it('deve definir valor e chamar callbacks', () => {
      const mockEvent = { target: { value: '2023-01-01' } };
      jest.spyOn(component as any, 'onChange');
      jest.spyOn(component as any, 'onTouched');

      component['setValue'](mockEvent);

      expect(component.Value).toBe('2023-01-01');
      expect(component.onChange).toHaveBeenCalledWith('2023-01-01');
      expect(component.onTouched).toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    describe('isCampoValido', () => {
      it('deve retornar true quando campo é readonly', () => {
        component.readonly = true;
        expect(component['isCampoValido'](component.Value)).toBe(true);
      });

      it('deve retornar true quando campo é disabled', () => {
        component.disabled = true;
        expect(component['isCampoValido'](component.Value)).toBe(true);
      });

      it('deve retornar false e emitir erro quando campo obrigatório está vazio', () => {
        jest.spyOn(component.error, 'emit');
        jest.spyOn(component as any, 'validaRequired').mockReturnValue(true);
        component.label = 'Data';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Data é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ 'required': true });
      });

      it('deve retornar false e emitir erro quando data é menor que minDate', () => {
        jest.spyOn(component.error, 'emit');
        jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
        jest.spyOn(component as any, 'validaMinDate').mockReturnValue(true);
        jest.spyOn(component as any, 'formatarData').mockReturnValue('01/01/2020');
        component.minDate = '2020-01-01';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('A data deve ser maior ou igual a 01/01/2020');
        expect(component.error.emit).toHaveBeenCalledWith({ 'minDate': true });
      });

      it('deve retornar false e emitir erro quando data é maior que maxDate', () => {
        jest.spyOn(component.error, 'emit');
        jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
        jest.spyOn(component as any, 'validaMinDate').mockReturnValue(false);
        jest.spyOn(component as any, 'validaMaxDate').mockReturnValue(true);
        jest.spyOn(component as any, 'formatarData').mockReturnValue('31/12/2025');
        component.maxDate = '2025-12-31';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('A data deve ser menor ou igual a 31/12/2025');
        expect(component.error.emit).toHaveBeenCalledWith({ 'maxDate': true });
      });

      it('deve retornar true quando todas as validações passam', () => {
        jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
        jest.spyOn(component as any, 'validaMinDate').mockReturnValue(false);
        jest.spyOn(component as any, 'validaMaxDate').mockReturnValue(false);

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });
    });

    describe('validaMinDate', () => {
      it('deve retornar false quando minDate não está definido', () => {
        component.minDate = '';
        expect(component['validaMinDate'](component.Value)).toBe(false);
      });

      it('deve retornar true quando valor é menor que minDate', () => {
        component.minDate = '2023-01-01';
        component.value = '2022-12-31';
        expect(component['validaMinDate'](component.Value)).toBe(true);
      });

      it('deve retornar false quando valor é maior ou igual a minDate', () => {
        component.minDate = '2023-01-01';
        component.value = '2023-01-01';
        expect(component['validaMinDate'](component.Value)).toBe(false);
      });
    });

    describe('validaMaxDate', () => {
      it('deve retornar false quando maxDate não está definido', () => {
        component.maxDate = '';
        expect(component['validaMaxDate'](component.Value)).toBe(false);
      });

      it('deve retornar true quando valor é maior que maxDate', () => {
        component.maxDate = '2023-12-31';
        component.value = '2024-01-01';
        expect(component['validaMaxDate'](component.Value)).toBe(true);
      });

      it('deve retornar false quando valor é menor ou igual a maxDate', () => {
        component.maxDate = '2023-12-31';
        component.value = '2023-12-31';
        expect(component['validaMaxDate'](component.Value)).toBe(false);
      });
    });

    describe('validaRequired', () => {
      it('deve retornar true quando campo é obrigatório, tocado e vazio', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.value = '';
        expect(component['validaRequired'](component.Value)).toBe(true);
      });

      it('deve retornar false quando campo não é obrigatório', () => {
        component['campoTocado'] = true;
        component.required = false;
        component.value = '';
        expect(component['validaRequired'](component.Value)).toBe(false);
      });

      it('deve retornar false quando campo não foi tocado', () => {
        component['campoTocado'] = false;
        component.required = true;
        component.value = '';
        expect(component['validaRequired'](component.Value)).toBe(false);
      });

      it('deve retornar false quando campo tem valor', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.value = '2023-01-01';
        expect(component['validaRequired'](component.Value)).toBe(false);
      });
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
  });

  describe('Propriedades protegidas', () => {
    it('deve inicializar errorMessage como undefined', () => {
      expect(component['errorMessage']).toBeUndefined();
    });

    it('deve inicializar campoTocado como false', () => {
      expect(component['campoTocado']).toBe(false);
    });

    it('deve permitir alterar campoTocado', () => {
      component['campoTocado'] = true;
      expect(component['campoTocado']).toBe(true);
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
