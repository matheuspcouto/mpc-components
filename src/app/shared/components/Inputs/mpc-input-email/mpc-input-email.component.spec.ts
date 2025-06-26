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
      expect(component.value).toBeUndefined();
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'email-input';
      component.tabIndex = 2;
      component.ariaLabel = 'Campo de email';
      component.disabled = true;
      component.readonly = true;
      component.required = true;
      component.value = 'test@example.com';

      expect(component.id).toBe('email-input');
      expect(component.tabIndex).toBe(2);
      expect(component.ariaLabel).toBe('Campo de email');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.required).toBe(true);
      expect(component.value).toBe('test@example.com');
    });
  });

  describe('valorFormatado getter', () => {
    it('deve retornar valor formatado através do pipe', () => {
      component.value = 'test@example.com';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar vazio quando é valor undefined formatado através do pipe', () => {
      component.value = undefined;
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve recosntruir o email quando é valor @ formatado através do pipe', () => {
      component.value = '@';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor original quando o valor não tem @ formatado através do pipe', () => {
      component.value = 'testexample.com';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor original quando o valor tem dois @ formatado através do pipe', () => {
      component.value = 'test@example@.com';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor original quando o valor tem dois . formatado através do pipe', () => {
      component.value = 'test@.example.com';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('onFocus', () => {
    it('deve marcar campo como tocado e validar', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido');

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(spyIsCampoValido).toHaveBeenCalledWith(component.value);
    });
  });

  describe('setValue', () => {
    it('deve definir valor e emitir quando campo é válido', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const spyEmitValor = jest.spyOn(component.valor, 'emit');
      const mockEvent = { target: { value: 'test@email.com' } };

      component['setValue'](mockEvent);

      expect(component.value).toBe('test@email.com');
      expect(spyIsCampoValido).toHaveBeenCalledWith('test@email.com');
      expect(spyEmitValor).toHaveBeenCalledWith('test@email.com');
    });

    it('deve definir valor mas não emitir quando campo é inválido', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const spyEmitValor = jest.spyOn(component.valor, 'emit');
      const mockEvent = { target: { value: 'email-invalido' } };

      component['setValue'](mockEvent);

      expect(component.value).toBe('email-invalido');
      expect(spyIsCampoValido).toHaveBeenCalledWith('email-invalido');
      expect(spyEmitValor).not.toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando campo é readonly', () => {
      component.readonly = true;
      const resultado = component['isCampoValido']('qualquer-valor');
      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é disabled', () => {
      component.disabled = true;
      const resultado = component['isCampoValido']('qualquer-valor');
      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando required é inválido', () => {
      const spyValidaRequired = jest.spyOn(component as any, 'validaRequired').mockReturnValue(true);
      const spyEmitError = jest.spyOn(component.error, 'emit');

      const resultado = component['isCampoValido']('');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo e-mail é obrigatório');
      expect(spyEmitError).toHaveBeenCalledWith({ required: true });
      expect(spyValidaRequired).toHaveBeenCalled();
    });

    it('deve retornar false e emitir erro quando regex é inválido', () => {
      const spyValidaRegex = jest.spyOn(component as any, 'validaRegex').mockReturnValue(true);
      const spyEmitError = jest.spyOn(component.error, 'emit');
      const valor = 'email-invalido';

      const resultado = component['isCampoValido'](valor);

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo e-mail não está em um formato válido');
      expect(spyEmitError).toHaveBeenCalledWith({ regex: true });
      expect(spyValidaRegex).toHaveBeenCalledWith(valor);
    });

    it('deve retornar true quando campo é válido', () => {
      const resultado = component['isCampoValido']('test@example.com');
      expect(resultado).toBe(true);
    });
  });

  describe('validaRequired', () => {
    it('deve retornar false ao ter valor e ser obrigatório', () => {
      component.required = true;
      const resultado = component['validaRequired']('a');
      expect(resultado).toBe(false);
    });

    it('deve retornar true ao não ter valor e ser obrigatório', () => {
      component.required = true;
      const resultado = component['validaRequired'](undefined);
      expect(resultado).toBe(true);
    });
  });

});
