import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputEmailComponent } from './mpc-input-email.component';

describe('MpcInputEmailComponent', () => {
  let component: MpcInputEmailComponent;
  let fixture: ComponentFixture<MpcInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputEmailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputEmailComponent);
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
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
      expect(component.required).toBe(false);
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'email-input';
      component.tabIndex = 2;
      component.ariaLabel = 'Campo de email';
      component.disabled = true;
      component.readonly = true;
      component.required = true;

      expect(component.id).toBe('email-input');
      expect(component.tabIndex).toBe(2);
      expect(component.ariaLabel).toBe('Campo de email');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.required).toBe(true);
    });
  });

  describe('Getter e Setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      const spyIsCampoValido = jest.spyOn(component, 'isCampoValido').mockReturnValue(true);
      const spyEmit = jest.spyOn(component.valor, 'emit');

      component.Value = 'test@example.com';

      expect(component.Value).toBe('test@example.com');
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).toHaveBeenCalledWith('test@example.com');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const spyIsCampoValido = jest.spyOn(component, 'isCampoValido').mockReturnValue(false);
      const spyEmit = jest.spyOn(component.valor, 'emit');

      component.Value = 'email-invalido';

      expect(component.Value).toBe('email-invalido');
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).not.toHaveBeenCalled();
    });
  });

  describe('Métodos ControlValueAccessor', () => {
    it('deve escrever valor através de writeValue', () => {
      component.writeValue('novo@email.com');
      expect(component['Value']).toBe('novo@email.com');
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
  });

  describe('setValue', () => {
    it('deve definir valor e chamar callbacks', () => {
      const spyOnChange = jest.spyOn(component, 'onChange');
      const spyOnTouched = jest.spyOn(component, 'onTouched');
      const spyIsCampoValido = jest.spyOn(component, 'isCampoValido').mockReturnValue(true);
      const mockEvent = { target: { value: 'test@email.com' } };

      component.setValue(mockEvent);

      expect(component.Value).toBe('test@email.com');
      expect(spyOnChange).toHaveBeenCalledWith('test@email.com');
      expect(spyOnTouched).toHaveBeenCalled();
      expect(spyIsCampoValido).toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando campo é readonly', () => {
      component.readonly = true;
      expect(component.isCampoValido()).toBe(true);
    });

    it('deve retornar true quando campo é disabled', () => {
      component.disabled = true;
      expect(component.isCampoValido()).toBe(true);
    });

    it('deve retornar false e emitir erro quando required é inválido', () => {
      const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(true);
      const spyEmitError = jest.spyOn(component.error, 'emit');

      const resultado = component.isCampoValido();

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo e-mail é obrigatório');
      expect(spyEmitError).toHaveBeenCalledWith({ required: true });
      expect(spyValidaRequired).toHaveBeenCalled();
    });

    it('deve retornar false e emitir erro quando regex é inválido', () => {
      const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
      const spyValidaRegex = jest.spyOn(component, 'validaRegex').mockReturnValue(true);
      const spyEmitError = jest.spyOn(component.error, 'emit');

      const resultado = component.isCampoValido();

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo e-mail não está em um formato válido');
      expect(spyEmitError).toHaveBeenCalledWith({ regex: true });
      expect(spyValidaRequired).toHaveBeenCalled();
      expect(spyValidaRegex).toHaveBeenCalled();
    });

    it('deve retornar true quando campo é válido', () => {
      const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
      const spyValidaRegex = jest.spyOn(component, 'validaRegex').mockReturnValue(false);

      const resultado = component.isCampoValido();

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
      expect(spyValidaRequired).toHaveBeenCalled();
      expect(spyValidaRegex).toHaveBeenCalled();
    });
  });

  describe('validaRegex', () => {
    beforeEach(() => {
      component['Value'] = '';
    });

    it('deve retornar false para email válido', () => {
      component['Value'] = 'test@example.com';
      expect(component.validaRegex()).toBe(false);
    });

    it('deve retornar true para email inválido sem @', () => {
      component['Value'] = 'emailinvalido';
      expect(component.validaRegex()).toBe(true);
    });

    it('deve retornar true para email inválido sem domínio', () => {
      component['Value'] = 'test@';
      expect(component.validaRegex()).toBe(true);
    });

    it('deve retornar true para email inválido sem extensão', () => {
      component['Value'] = 'test@domain';
      expect(component.validaRegex()).toBe(true);
    });

    it('deve retornar false para email válido com números', () => {
      component['Value'] = 'user123@domain123.com';
      expect(component.validaRegex()).toBe(false);
    });

    it('deve retornar false para email válido com caracteres especiais', () => {
      component['Value'] = 'user.name+tag@example.co.uk';
      expect(component.validaRegex()).toBe(false);
    });
  });

  describe('validaRequired', () => {
    it('deve retornar true quando required é true e valor está vazio', () => {
      component.required = true;
      component['Value'] = '';
      expect(component.validaRequired()).toBe(true);
    });

    it('deve retornar false quando required é true e valor não está vazio', () => {
      component.required = true;
      component['Value'] = 'test@example.com';
      expect(component.validaRequired()).toBe(false);
    });

    it('deve retornar false quando required é false', () => {
      component.required = false;
      component['Value'] = '';
      expect(component.validaRequired()).toBe(false);
    });
  });

  describe('EventEmitters', () => {
    it('deve emitir valor quando campo é válido', () => {
      const spyEmit = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component, 'isCampoValido').mockReturnValue(true);

      component.Value = 'valid@email.com';

      expect(spyEmit).toHaveBeenCalledWith('valid@email.com');
    });

    it('deve emitir erro quando validação falha', () => {
      const spyEmit = jest.spyOn(component.error, 'emit');
      component.required = true;
      component['Value'] = '';

      component.isCampoValido();

      expect(spyEmit).toHaveBeenCalledWith({ required: true });
    });
  });

  describe('Propriedades protegidas', () => {
    it('deve inicializar propriedades protegidas com valores padrão', () => {
      expect(component['value']).toBe('');
      expect(component['errorMessage']).toBeUndefined();
      expect(component['campoTocado']).toBe(false);
    });

    it('deve permitir modificação de propriedades protegidas', () => {
      component['value'] = 'test@example.com';
      component['errorMessage'] = 'Erro personalizado';
      component['campoTocado'] = true;

      expect(component['value']).toBe('test@example.com');
      expect(component['errorMessage']).toBe('Erro personalizado');
      expect(component['campoTocado']).toBe(true);
    });
  });
});
