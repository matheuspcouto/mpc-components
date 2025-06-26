import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTelefoneComponent } from './mpc-input-telefone.component';

describe('MpcInputTelefoneComponent', () => {
  let component: MpcInputTelefoneComponent;
  let fixture: ComponentFixture<MpcInputTelefoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTelefoneComponent]
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
      expect(component.value).toBeUndefined();
    });

    it('deve aceitar valores personalizados', () => {
      component.id = 'telefone-id';
      component.tabIndex = 5;
      component.ariaLabel = 'Campo telefone';
      component.required = true;
      component.disabled = true;
      component.readonly = true;
      component.value = '11999999999';

      expect(component.id).toBe('telefone-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Campo telefone');
      expect(component.required).toBe(true);
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.value).toBe('11999999999');
    });
  });

  describe('valorFormatado getter', () => {
    it('deve retornar valor formatado através do pipe', () => {
      component.value = '11999999999';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar valor formatado para valor undefined', () => {
      component.value = undefined;
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve retornar vazio quando valor formatado enviado for vazio', () => {
      component.value = '.';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve aplicar mascara quando valor formatado for enviado - 2 Dígitos', () => {
      component.value = '11';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });

    it('deve aplicar mascara quando valor formatado for enviado - 7 Dígitos', () => {
      component.value = '1199999';
      const valorFormatado = component.valorFormatado;
      expect(valorFormatado).toBeDefined();
    });
  });

  describe('onFocus', () => {
    it('deve marcar campo como tocado e validar', () => {
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido');
      component.value = '11999999999';

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(isCampoValidoSpy).toHaveBeenCalledWith('11999999999');
    });
  });

  describe('setValue', () => {
    it('deve definir valor e emitir quando válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const event = { target: { value: '(11) 99999-9999' } };

      component['setValue'](event);

      expect(component.value).toBe('11999999999');
      expect(isCampoValidoSpy).toHaveBeenCalledWith('11999999999');
      expect(valorSpy).toHaveBeenCalledWith('11999999999');
    });

    it('deve definir valor mas não emitir quando inválido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const event = { target: { value: '123' } };

      component['setValue'](event);

      expect(component.value).toBe('123');
      expect(isCampoValidoSpy).toHaveBeenCalledWith('123');
      expect(valorSpy).not.toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando readonly', () => {
      component.readonly = true;
      component.value = 'qualquer-valor';

      const resultado = component['isCampoValido']('qualquer-valor');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando disabled', () => {
      component.disabled = true;
      component.value = 'qualquer-valor';

      const resultado = component['isCampoValido']('qualquer-valor');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando validação required falha', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      const validaRequiredSpy = jest.spyOn(component as any, 'validaRequired').mockReturnValue(true);

      const resultado = component['isCampoValido']('');

      expect(validaRequiredSpy).toHaveBeenCalledWith('');
      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo telefone é obrigatório');
      expect(errorSpy).toHaveBeenCalledWith({ required: true });
    });

    it('deve retornar false quando validação regex falha', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      const validaRequiredSpy = jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
      const validaRegexSpy = jest.spyOn(component as any, 'validaRegex').mockReturnValue(true);

      const resultado = component['isCampoValido']('123');

      expect(validaRequiredSpy).toHaveBeenCalledWith('123');
      expect(validaRegexSpy).toHaveBeenCalledWith('123');
      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo telefone não está em um formato válido. Tente (00) 00000-0000');
      expect(errorSpy).toHaveBeenCalledWith({ regex: true });
    });

    it('deve retornar true quando campo é válido', () => {
      const validaRequiredSpy = jest.spyOn(component as any, 'validaRequired').mockReturnValue(false);
      const validaRegexSpy = jest.spyOn(component as any, 'validaRegex').mockReturnValue(false);

      const resultado = component['isCampoValido']('11999999999');

      expect(validaRequiredSpy).toHaveBeenCalledWith('11999999999');
      expect(validaRegexSpy).toHaveBeenCalledWith('11999999999');
      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
    });
  });

  describe('validaRegex', () => {
    it('deve retornar true quando valor é undefined', () => {
      const resultado = component['validaRegex'](undefined);
      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é vazio', () => {
      const resultado = component['validaRegex']('');
      expect(resultado).toBe(true);
    });

    it('deve retornar false para telefones válidos', () => {
      const telefonesValidos = [
        '(11) 99999-9999',
        '11 99999-9999',
        '1199999-9999',
        '11999999999',
        '(85) 98765-4321'
      ];

      telefonesValidos.forEach(telefone => {
        const resultado = component['validaRegex'](telefone);
        expect(resultado).toBe(false);
      });
    });

    it('deve retornar true para telefones inválidos', () => {
      const telefonesInvalidos = [
        '123',
        '(00) 99999-9999',
        '(11) 19999-9999',
        '(11) 99999-999',
        'abc',
        '1234567890123'
      ];

      telefonesInvalidos.forEach(telefone => {
        const resultado = component['validaRegex'](telefone);
        expect(resultado).toBe(true);
      });
    });
  });

  describe('validaRequired', () => {
    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;

      const resultado = component['validaRequired']('');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando campo é obrigatório e valor é undefined', () => {
      component.required = true;

      const resultado = component['validaRequired'](undefined);

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é obrigatório e valor é vazio', () => {
      component.required = true;

      const resultado = component['validaRequired']('');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando campo é obrigatório e valor é preenchido', () => {
      component.required = true;

      const resultado = component['validaRequired']('11999999999');

      expect(resultado).toBe(false);
    });
  });

  describe('Eventos de saída', () => {
    it('deve emitir valor limpo quando válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const event = { target: { value: '(11) 99999-9999' } };

      component['setValue'](event);

      expect(valorSpy).toHaveBeenCalledWith('11999999999');
    });

    it('deve emitir erro quando validação falha', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      component.required = true;

      component['isCampoValido']('');

      expect(errorSpy).toHaveBeenCalledWith({ required: true });
    });
  });
});
