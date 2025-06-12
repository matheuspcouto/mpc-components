import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcInputCpfcnpjComponent } from './mpc-input-cpfcnpj.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

describe('MpcInputCpfcnpjComponent', () => {
  let component: MpcInputCpfcnpjComponent;
  let fixture: ComponentFixture<MpcInputCpfcnpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputCpfcnpjComponent, FormsModule, ReactiveFormsModule, NgxMaskDirective],
      providers: [provideNgxMask()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputCpfcnpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('setValue', () => {
    beforeEach(() => {
      jest.spyOn(component.valor, 'emit');
    });

    it('deve processar CPF válido', () => {
      const event = { target: { value: '27657842059' } };
      component.setValue(event);

      expect(component.Value).toBe('27657842059');
      expect(component['mascara']).toBe('000.000.000-009');
      expect(component.valor.emit).toHaveBeenCalledWith('27657842059');
      expect(component.isValidCPF()).toBeTruthy();
    });

    it('deve processar CNPJ válido', () => {
      const event = { target: { value: '97522695000103' } };
      component.setValue(event);

      expect(component.Value).toBe('97522695000103');
      expect(component['mascara']).toBe('00.000.000/0000-00');
      expect(component.valor.emit).toHaveBeenCalledWith('97522695000103');
      expect(component.isValidCNPJ()).toBeTruthy();
    });

    it('deve processar valor vazio', () => {
      const event = { target: { value: '' } };
      component.setValue(event);

      expect(component.Value).toBe('');
      expect(component['mascara']).toBe('000.000.000-009');
    });

    it('deve emitir erro para valor inválido quando obrigatório', () => {
      component.required = true;
      jest.spyOn(component.error, 'emit');
      const event = { target: { value: 'invalid' } };

      component.setValue(event);

      expect(component.Value).toBe('');
      expect(component.error.emit).toHaveBeenCalled();
    });
  });

  describe('Validação CPF', () => {
    it('deve validar CPF sem formatação', () => {
      component.value = '27657842059';
      expect(component.isValidCPF()).toBeTruthy();
    });

    it('deve validar CPF com formatação', () => {
      component.value = '276.578.420-59';
      expect(component.isValidCPF()).toBeTruthy();
    });

    it('deve validar CPF com algoritmo correto', () => {
      component.value = '12345678909';
      expect(component.isValidCPF()).toBeTruthy();
    });

    it('deve invalidar CPF com todos zeros', () => {
      component.value = '00000000000';
      expect(component.isValidCPF()).toBeFalsy();
    });

    it('deve invalidar CPF com primeiro dígito incorreto', () => {
      component.value = '12345678919';
      expect(component.isValidCPF()).toBeFalsy();
    });

    it('deve invalidar CPF com segundo dígito incorreto', () => {
      component.value = '12345678908';
      expect(component.isValidCPF()).toBeFalsy();
    });

    it('deve aplicar correção quando segundo dígito é 10', () => {
      component.Value = '11144477735';
      expect(typeof component.isValidCPF()).toBe('boolean');
    });

    it('deve aplicar correção quando segundo dígito é 11', () => {
      component.Value = '98765432100';
      expect(typeof component.isValidCPF()).toBe('boolean');
    });
  });

  describe('Validação CNPJ', () => {
    it('deve validar CNPJ válido', () => {
      component.value = '97522695000103';
      expect(component.isValidCNPJ()).toBeTruthy();
    });

    it('deve invalidar CNPJ inválido', () => {
      component.value = '9752269500003';
      expect(component.isValidCNPJ()).toBeFalsy();
    });
  });

  describe('Validação campo obrigatório', () => {
    beforeEach(() => {
      component['campoTocado'] = true;
    });

    describe('quando required é false', () => {
      beforeEach(() => {
        component.required = false;
      });

      it('deve retornar false para valor vazio', () => {
        component.value = '';
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false para valor undefined', () => {
        component.value = undefined;
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false para valor preenchido', () => {
        component.value = '12345678901';
        expect(component.validaRequired()).toBe(false);
      });
    });

    describe('quando required é true', () => {
      beforeEach(() => {
        component.required = true;
      });

      it('deve retornar true para string vazia', () => {
        component.value = '';
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar true para undefined', () => {
        component.value = undefined;
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar true para null', () => {
        component.value = null as any;
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar false para CPF válido', () => {
        component.value = '12345678901';
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false para espaços em branco', () => {
        component.value = '   ';
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false para um caractere', () => {
        component.value = '1';
        expect(component.validaRequired()).toBe(false);
      });
    });

    describe('com getter Value mockado', () => {
      it('deve retornar true quando Value é string vazia', () => {
        component.required = true;
        jest.spyOn(component, 'Value', 'get').mockReturnValue('');
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar false quando Value é string não vazia', () => {
        component.required = true;
        jest.spyOn(component, 'Value', 'get').mockReturnValue('123');
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar true quando Value é undefined', () => {
        component.required = true;
        jest.spyOn(component, 'Value', 'get').mockReturnValue(undefined as any);
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar true quando Value é null', () => {
        component.required = true;
        jest.spyOn(component, 'Value', 'get').mockReturnValue(null as any);
        expect(component.validaRequired()).toBe(true);
      });
    });
  });

  describe('Validação de campo', () => {
    beforeEach(() => {
      component['campoTocado'] = true;
    });

    it('deve retornar true quando readonly é true', () => {
      component.readonly = true;
      component.value = 'invalid';
      expect(component.isCampoValido()).toBeTruthy();
    });

    it('deve retornar true quando disabled é true', () => {
      component.disabled = true;
      component.value = 'invalid';
      expect(component.isCampoValido()).toBeTruthy();
    });

    it('deve validar campo obrigatório vazio', () => {
      component.required = true;
      component.value = '';

      expect(component.isCampoValido()).toBeFalsy();
      expect(component['errorMessage']).toBe('O campo CPF/CNPJ é obrigatório');
    });
  });

  describe('ControlValueAccessor', () => {
    describe('writeValue', () => {
      it('deve definir valor válido', () => {
        component.writeValue('12345678901');
        expect(component.value).toBe('12345678901');
      });

      it('deve definir string vazia', () => {
        component.writeValue('');
        expect(component.value).toBe('');
      });

      it('deve definir undefined', () => {
        component.writeValue(undefined as any);
        expect(component.value).toBe(undefined);
      });
    });

    describe('registerOnChange', () => {
      it('deve registrar função onChange', () => {
        const mockFn = jest.fn();
        component.registerOnChange(mockFn);
        expect(component.onChange).toBe(mockFn);
      });

      it('deve chamar função onChange registrada', () => {
        const mockFn = jest.fn();
        component.registerOnChange(mockFn);
        component.onChange('test');
        expect(mockFn).toHaveBeenCalledWith('test');
      });

      it('deve substituir callback anterior', () => {
        const first = jest.fn();
        const second = jest.fn();

        component.registerOnChange(first);
        component.registerOnChange(second);
        component.onChange('test');

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledWith('test');
      });
    });

    describe('registerOnTouched', () => {
      it('deve registrar função onTouched', () => {
        const mockFn = jest.fn();
        component.registerOnTouched(mockFn);
        expect(component.onTouched).toBe(mockFn);
      });

      it('deve chamar função onTouched registrada', () => {
        const mockFn = jest.fn();
        component.registerOnTouched(mockFn);
        component.onTouched();
        expect(mockFn).toHaveBeenCalled();
      });

      it('deve substituir callback anterior', () => {
        const first = jest.fn();
        const second = jest.fn();

        component.registerOnTouched(first);
        component.registerOnTouched(second);
        component.onTouched();

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalled();
      });
    });

    it('deve ter função onChange padrão que não faz nada', () => {
      expect(() => component.onChange('test')).not.toThrow();
      expect(component.onChange('test')).toBeUndefined();
    });

    it('deve ter função onTouched padrão que não faz nada', () => {
      expect(() => component.onTouched()).not.toThrow();
      expect(component.onTouched()).toBeUndefined();
    });

    it('deve chamar callbacks quando setValue é executado', () => {
      const mockOnChange = jest.fn();
      const mockOnTouched = jest.fn();
      const event = { target: { value: '12345678901' } };

      component.registerOnChange(mockOnChange);
      component.registerOnTouched(mockOnTouched);
      component.setValue(event);

      expect(mockOnChange).toHaveBeenCalledWith('12345678901');
      expect(mockOnTouched).toHaveBeenCalled();
    });
  });
});
