import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSenhaComponent } from './mpc-input-senha.component';

describe('MpcInputSenhaComponent', () => {
  let component: MpcInputSenhaComponent;
  let fixture: ComponentFixture<MpcInputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputSenhaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputSenhaComponent);
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
      expect(component.regexSenha).toBe('');
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'senha-input';
      component.tabIndex = 5;
      component.ariaLabel = 'Campo de senha';
      component.disabled = true;
      component.readonly = true;
      component.required = true;
      component.regexSenha = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

      expect(component.id).toBe('senha-input');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Campo de senha');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.required).toBe(true);
      expect(component.regexSenha).toBe('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$');
    });
  });

  describe('Propriedades protegidas', () => {
    it('deve inicializar propriedades protegidas com valores padrão', () => {
      expect(component['value']).toBe('');
      expect(component['errorMessage']).toBeUndefined();
      expect(component['campoTocado']).toBe(false);
      expect(component['ocultarSenha']).toBe(true);
    });
  });

  describe('Getter e Setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      jest.spyOn(component.valor, 'emit');

      component.Value = 'minhasenha123';

      expect(component.Value).toBe('minhasenha123');
      expect(component['isCampoValido']).toHaveBeenCalled();
      expect(component.valor.emit).toHaveBeenCalledWith('minhasenha123');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      jest.spyOn(component.valor, 'emit');

      component.Value = '';

      expect(component.valor.emit).not.toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor', () => {
    it('deve implementar writeValue', () => {
      component.writeValue('novasenha');
      expect(component['value']).toBe('novasenha');
    });

    it('deve implementar registerOnChange', () => {
      const mockFn = jest.fn();
      component.registerOnChange(mockFn);
      expect(component.onChange).toBe(mockFn);
    });

    it('deve implementar registerOnTouched', () => {
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
      const spyOnChange = jest.spyOn(component, 'onChange');
      const spyOnTouched = jest.spyOn(component, 'onTouched');
      const mockEvent = { target: { value: 'senha123' } };

      component['setValue'](mockEvent);

      expect(component.Value).toBe('senha123');
      expect(spyOnChange).toHaveBeenCalledWith('senha123');
      expect(spyOnTouched).toHaveBeenCalled();
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

      it('deve retornar false quando required e valor vazio', () => {
        component.required = true;
        component['value'] = '';
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo senha é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ required: true });
      });

      it('deve retornar false quando regex não é atendido', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        component['value'] = 'senhafraca';
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('A senha não está em um formato válido');
        expect(component.error.emit).toHaveBeenCalledWith({ regex: true });
      });

      it('deve retornar true quando todas as validações passam', () => {
        component.required = true;
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        component['value'] = 'SenhaForte123';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });

      it('deve priorizar validação required sobre regex', () => {
        component.required = true;
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        component['value'] = '';
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo senha é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ required: true });
      });
    });

    describe('validaRequired', () => {
      it('deve retornar true quando required e valor vazio', () => {
        component.required = true;
        component['value'] = '';
        expect(component['validaRequired'](component.Value)).toBe(true);
      });

      it('deve retornar false quando required e valor preenchido', () => {
        component.required = true;
        component['value'] = 'senha123';
        expect(component['validaRequired'](component.Value)).toBe(false);
      });

      it('deve retornar false quando não required', () => {
        component.required = false;
        component['value'] = '';
        expect(component['validaRequired'](component.Value)).toBe(false);
      });
    });

    describe('validaRegex', () => {
      it('deve retornar true quando valor não atende regex', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        component['value'] = 'senhafraca';
        expect(component['validaRegex'](component.Value)).toBe(true);
      });

      it('deve retornar false quando valor atende regex', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        component['value'] = 'SenhaForte123';
        expect(component['validaRegex'](component.Value)).toBe(false);
      });

      it('deve retornar false quando regex está vazio', () => {
        component.regexSenha = '';
        component['value'] = 'qualquersenha';
        expect(component['validaRegex'](component.Value)).toBe(false);
      });
    });
  });

  describe('EventEmitters', () => {
    it('deve emitir valor quando campo válido', () => {
      jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component.Value = 'senha123';

      expect(component.valor.emit).toHaveBeenCalledWith('senha123');
    });

    it('deve emitir erro de required', () => {
      jest.spyOn(component.error, 'emit');
      component.required = true;
      component['value'] = '';

      component['isCampoValido'](component.Value);

      expect(component.error.emit).toHaveBeenCalledWith({ required: true });
    });

    it('deve emitir erro de regex', () => {
      jest.spyOn(component.error, 'emit');
      component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
      component['value'] = 'senhafraca';

      component['isCampoValido'](component.Value);

      expect(component.error.emit).toHaveBeenCalledWith({ regex: true });
    });
  });
});
