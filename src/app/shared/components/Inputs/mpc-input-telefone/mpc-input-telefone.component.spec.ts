import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';
import { MpcInputTelefoneComponent } from './mpc-input-telefone.component';

describe('MpcInputTelefoneComponent', () => {
  let component: MpcInputTelefoneComponent;
  let fixture: ComponentFixture<MpcInputTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTelefoneComponent],
      providers: [provideNgxMask()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputTelefoneComponent);
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
      expect(component.required).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
    });

    it('deve aceitar valores personalizados', () => {
      component.id = 'telefone-id';
      component.tabIndex = 5;
      component.ariaLabel = 'Campo telefone';
      component.required = true;
      component.disabled = true;
      component.readonly = true;

      expect(component.id).toBe('telefone-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Campo telefone');
      expect(component.required).toBe(true);
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
    });
  });

  describe('Propriedades de validação', () => {
    it('deve ter regex de telefone definido', () => {
      expect(component.regexTelefone).toBeDefined();
    });

    it('deve ter máscara definida', () => {
      expect(component['mascara']).toBe('(00) 00000-0000');
    });
  });

  describe('Getter e Setter Value', () => {
    it('deve definir e obter valor', () => {
      component.Value = '(11) 99999-9999';
      expect(component.Value).toBe('(11) 99999-9999');
    });

    it('deve emitir valor quando válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component.Value = '(11) 99999-9999';

      expect(isCampoValidoSpy).toHaveBeenCalled();
      expect(valorSpy).toHaveBeenCalledWith('11999999999');
    });

    it('não deve emitir valor quando inválido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);

      component.Value = '123';

      expect(isCampoValidoSpy).toHaveBeenCalled();
      expect(valorSpy).not.toHaveBeenCalled();
    });
  });

  describe('Métodos ControlValueAccessor', () => {
    it('deve escrever valor', () => {
      component.writeValue('(11) 99999-9999');
      expect(component.Value).toBe('(11) 99999-9999');
    });

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
      const onChangeSpy = jest.spyOn(component, 'onChange');
      const onTouchedSpy = jest.spyOn(component, 'onTouched');
      const event = { target: { value: '(11) 99999-9999' } };

      component['setValue'](event);

      expect(component.Value).toBe('(11) 99999-9999');
      expect(onChangeSpy).toHaveBeenCalledWith('(11) 99999-9999');
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando readonly', () => {
      component.readonly = true;
      expect(component['isCampoValido'](component.Value)).toBe(true);
    });

    it('deve retornar true quando disabled', () => {
      component.disabled = true;
      component.Value = '(11) 99999-9999';
      expect(component['isCampoValido'](component.Value)).toBe(true);
    });

    it('deve retornar false quando campo obrigatório está vazio', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      component.required = true;
      component.Value = '';

      const resultado = component['isCampoValido'](component.Value);

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo telefone é obrigatório');
      expect(errorSpy).toHaveBeenCalledWith({ required: true });
    });

    it('deve retornar false quando regex é inválido', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      const validaRequiredSpy = jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
      const validaRegexSpy = jest.spyOn(component as any, 'validaRegex').mockReturnValue(true);

      component.Value = '(11) 99999-99';

      const resultado = component['isCampoValido'](component.Value);

      expect(validaRequiredSpy).toHaveBeenCalled();
      expect(validaRegexSpy).toHaveBeenCalled();
      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo telefone não está em um formato válido. Tente (00) 00000-0000');
      expect(errorSpy).toHaveBeenCalledWith({ regex: true });
    });

    it('deve retornar true quando campo é válido', () => {
      const validaRequiredSpy = jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
      const validaRegexSpy = jest.spyOn(component as any, 'validaRegex').mockReturnValue(false);

      component.Value = '(11) 99999-9999';

      const resultado = component['isCampoValido'](component.Value);

      expect(validaRequiredSpy).toHaveBeenCalled();
      expect(validaRegexSpy).toHaveBeenCalled();
      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
    });
  });

  describe('validaRegex', () => {
    it('deve retornar false para telefone válido', () => {
      component.Value = '(11) 99999-9999';
      expect(component['validaRegex'](component.Value)).toBe(false);
    });

    it('deve retornar true para telefone inválido', () => {
      component.Value = '123';
      expect(component['validaRegex'](component.Value)).toBe(true);
    });

    it('deve validar diferentes formatos válidos', () => {
      const telefonesValidos = [
        '(11) 99999-9999',
        '11 99999-9999',
        '1199999-9999',
        '11999999999'
      ];

      telefonesValidos.forEach(telefone => {
        component.Value = telefone;
        expect(component['validaRegex'](component.Value)).toBe(false);
      });
    });

    it('deve invalidar formatos inválidos', () => {
      const telefonesInvalidos = [
        '123',
        '(00) 99999-9999',
        '(11) 19999-9999',
        '(11) 99999-999'
      ];

      telefonesInvalidos.forEach(telefone => {
        component.Value = telefone;
        expect(component['validaRegex'](component.Value)).toBe(true);
      });
    });
  });

  describe('validaRequired', () => {
    it('deve retornar true quando campo é obrigatório e vazio', () => {
      component.required = true;
      component.Value = '';
      expect(component['validaRequired'](component.Value)).toBe(true);
    });

    it('deve retornar false quando campo é obrigatório e preenchido', () => {
      component.required = true;
      component.Value = '(11) 99999-9999';
      expect(component['validaRequired'](component.Value)).toBe(false);
    });

    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;
      component.Value = '';
      expect(component['validaRequired'](component.Value)).toBe(false);
    });
  });

  describe('Eventos de saída', () => {
    it('deve emitir valor válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component.Value = '(11) 99999-9999';

      expect(valorSpy).toHaveBeenCalledWith('11999999999');
    });

    it('deve emitir erro de validação', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      component.required = true;
      component.Value = '';

      component['isCampoValido'](component.Value);

      expect(errorSpy).toHaveBeenCalledWith({ required: true });
    });
  });
});
