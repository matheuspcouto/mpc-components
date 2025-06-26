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
      expect(component['value']).toBeUndefined();
      expect(component['errorMessage']).toBeUndefined();
      expect(component['campoTocado']).toBe(false);
      expect(component['ocultarSenha']).toBe(true);
    });
  });

  describe('onFocus', () => {
    it('deve marcar campo como tocado e validar campo', () => {
      jest.spyOn(component as any, 'isCampoValido');

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(component['isCampoValido']).toHaveBeenCalledWith(component['value']);
    });
  });

  describe('setValue', () => {
    it('deve definir valor e emitir quando campo é válido', () => {
      const mockEvent = { target: { value: 'senha123' } };
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component['value']).toBe('senha123');
      expect(component['isCampoValido']).toHaveBeenCalledWith('senha123');
      expect(component.valor.emit).toHaveBeenCalledWith('senha123');
    });

    it('deve definir valor mas não emitir quando campo é inválido', () => {
      const mockEvent = { target: { value: 'senha123' } };
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component['value']).toBe('senha123');
      expect(component['isCampoValido']).toHaveBeenCalledWith('senha123');
      expect(component.valor.emit).not.toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    describe('isCampoValido', () => {
      it('deve retornar true quando campo é readonly', () => {
        component.readonly = true;

        const resultado = component['isCampoValido']('qualquervalor');

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando campo é disabled', () => {
        component.disabled = true;

        const resultado = component['isCampoValido']('qualquervalor');

        expect(resultado).toBe(true);
      });

      it('deve retornar false quando required e valor vazio', () => {
        component.required = true;
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido']('');

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo senha é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ required: true });
      });

      it('deve retornar false quando required e valor undefined', () => {
        component.required = true;
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido'](undefined);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo senha é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ required: true });
      });

      it('deve retornar false quando regex não é atendido', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido']('senhafraca');

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('A senha não está em um formato válido');
        expect(component.error.emit).toHaveBeenCalledWith({ regex: true });
      });

      it('deve retornar true quando todas as validações passam', () => {
        component.required = true;
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

        const resultado = component['isCampoValido']('SenhaForte123');

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });

      it('deve priorizar validação required sobre regex', () => {
        component.required = true;
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
        jest.spyOn(component.error, 'emit');

        const resultado = component['isCampoValido']('');

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo senha é obrigatório');
        expect(component.error.emit).toHaveBeenCalledWith({ required: true });
      });

      it('deve limpar errorMessage quando campo é válido', () => {
        component['errorMessage'] = 'Erro anterior';
        component.required = false;
        component.regexSenha = '';

        const resultado = component['isCampoValido']('senhavalida');

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });
    });

    describe('validaRequired', () => {
      it('deve retornar true quando required e valor vazio', () => {
        component.required = true;

        const resultado = component['validaRequired']('');

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando required e valor undefined', () => {
        component.required = true;

        const resultado = component['validaRequired'](undefined);

        expect(resultado).toBe(true);
      });

      it('deve retornar false quando required e valor preenchido', () => {
        component.required = true;

        const resultado = component['validaRequired']('senha123');

        expect(resultado).toBe(false);
      });

      it('deve retornar false quando não required', () => {
        component.required = false;

        const resultado = component['validaRequired']('');

        expect(resultado).toBe(false);
      });

      it('deve retornar false quando required é undefined', () => {
        component.required = undefined;

        const resultado = component['validaRequired']('');

        expect(resultado).toBe(false);
      });
    });

    describe('validaRegex', () => {
      it('deve retornar true quando valor não atende regex', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

        const resultado = component['validaRegex']('senhafraca');

        expect(resultado).toBe(true);
      });

      it('deve retornar false quando valor atende regex', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

        const resultado = component['validaRegex']('SenhaForte123');

        expect(resultado).toBe(false);
      });

      it('deve retornar false quando regex está vazio', () => {
        component.regexSenha = '';

        const resultado = component['validaRegex']('qualquersenha');

        expect(resultado).toBe(false);
      });

      it('deve retornar false quando regex é undefined', () => {
        component.regexSenha = undefined;

        const resultado = component['validaRegex']('qualquersenha');

        expect(resultado).toBe(false);
      });

      it('deve retornar true quando valor é undefined e regex existe', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

        const resultado = component['validaRegex'](undefined);

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando valor é vazio e regex existe', () => {
        component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

        const resultado = component['validaRegex']('');

        expect(resultado).toBe(true);
      });
    });
  });
});
