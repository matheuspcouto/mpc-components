import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTextComponent } from './mpc-input-text.component';

describe('MpcInputTextComponent', () => {
  let component: MpcInputTextComponent;
  let fixture: ComponentFixture<MpcInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('propriedades de entrada', () => {
    it('deve inicializar com valores padrão', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.label).toBe('');
      expect(component.readonly).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.value).toBe('');
      expect(component.min).toBe('');
      expect(component.max).toBe('');
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'test-id';
      component.tabIndex = 5;
      component.ariaLabel = 'Test Label';
      component.label = 'Nome';
      component.readonly = true;
      component.disabled = true;
      component.value = 'teste';
      component.min = '3';
      component.max = '10';

      expect(component.id).toBe('test-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Test Label');
      expect(component.label).toBe('Nome');
      expect(component.readonly).toBe(true);
      expect(component.disabled).toBe(true);
      expect(component.value).toBe('teste');
      expect(component.min).toBe('3');
      expect(component.max).toBe('10');
    });
  });

  describe('getter e setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const spyEmit = jest.spyOn(component.valor, 'emit');

      component.Value = 'novo valor';

      expect(component.Value).toBe('novo valor');
      expect(component.value).toBe('novo valor');
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).toHaveBeenCalledWith('novo valor');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const spyEmit = jest.spyOn(component.valor, 'emit');

      component.Value = 'valor inválido';

      expect(component.Value).toBe('valor inválido');
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).not.toHaveBeenCalled();
    });
  });

  describe('métodos de controle de formulário', () => {
    it('deve escrever valor através de writeValue', () => {
      component.writeValue('valor escrito');
      expect(component.value).toBe('valor escrito');
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
      const spyOnChange = jest.spyOn(component as any, 'onChange');
      const spyOnTouched = jest.spyOn(component as any, 'onTouched');
      const mockEvent = { target: { value: 'valor do evento' } };

      component['setValue'](mockEvent);

      expect(component.Value).toBe('valor do evento');
      expect(spyOnChange).toHaveBeenCalledWith('valor do evento');
      expect(spyOnTouched).toHaveBeenCalled();
    });
  });

  describe('validações', () => {
    describe('isCampoValido', () => {
      it('deve retornar true quando campo é readonly', () => {
        component.readonly = true;
        expect(component['isCampoValido'](component.Value)).toBe(true);
      });

      it('deve retornar true quando campo é disabled', () => {
        component.disabled = true;
        expect(component['isCampoValido'](component.Value)).toBe(true);
      });

      it('deve retornar false quando validação min falha', () => {
        const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(true);
        const spyEmit = jest.spyOn(component.error, 'emit');
        component.label = 'Nome';
        component.min = '5';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Nome deve ter no mínimo 5 caracteres');
        expect(spyEmit).toHaveBeenCalledWith({ min: true });
        expect(spyValidaMin).toHaveBeenCalled();
      });

      it('deve retornar false quando validação max falha', () => {
        const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
        const spyValidaMax = jest.spyOn(component as any, 'validaMax').mockReturnValue(true);
        const spyEmit = jest.spyOn(component.error, 'emit');
        component.label = 'Nome';
        component.max = '10';

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Nome deve ter no máximo 10 caracteres');
        expect(spyEmit).toHaveBeenCalledWith({ max: true });
        expect(spyValidaMin).toHaveBeenCalled();
        expect(spyValidaMax).toHaveBeenCalled();
      });

      it('deve retornar true quando todas as validações passam', () => {
        const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
        const spyValidaMax = jest.spyOn(component as any, 'validaMax').mockReturnValue(false);

        const resultado = component['isCampoValido'](component.Value);

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
        expect(spyValidaMin).toHaveBeenCalled();
        expect(spyValidaMax).toHaveBeenCalled();
      });
    });

    describe('validaMin', () => {
      it('deve retornar false quando min não está definido', () => {
        component.min = '';
        expect(component['validaMin'](component.Value)).toBe(false);
      });

      it('deve retornar false quando valor não está definido', () => {
        component.min = '5';
        component.value = undefined;
        expect(component['validaMin'](component.Value)).toBe(false);
      });

      it('deve retornar true quando valor é menor que mínimo', () => {
        component.min = '5';
        component.value = 'abc';
        expect(component['validaMin'](component.Value)).toBe(true);
      });

      it('deve retornar false quando valor atende ao mínimo', () => {
        component.min = '3';
        component.value = 'abc';
        expect(component['validaMin'](component.Value)).toBe(false);
      });

      it('deve retornar false quando valor é maior que mínimo', () => {
        component.min = '3';
        component.value = 'abcd';
        expect(component['validaMin'](component.Value)).toBe(false);
      });
    });

    describe('validaMax', () => {
      it('deve retornar false quando max não está definido', () => {
        component.max = '';
        expect(component['validaMax'](component.Value)).toBe(false);
      });

      it('deve retornar false quando valor não está definido', () => {
        component.max = '5';
        component.value = undefined;
        expect(component['validaMax'](component.Value)).toBe(false);
      });

      it('deve retornar true quando valor é maior que máximo', () => {
        component.max = '3';
        component.value = 'abcd';
        expect(component['validaMax'](component.Value)).toBe(true);
      });

      it('deve retornar false quando valor atende ao máximo', () => {
        component.max = '5';
        component.value = 'abcde';
        expect(component['validaMax'](component.Value)).toBe(false);
      });

      it('deve retornar false quando valor é menor que máximo', () => {
        component.max = '5';
        component.value = 'abc';
        expect(component['validaMax'](component.Value)).toBe(false);
      });
    });
  });

  describe('eventos de saída', () => {
    it('deve emitir valor quando campo é válido', () => {
      const spyEmit = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);

      component.Value = 'valor válido';

      expect(spyEmit).toHaveBeenCalledWith('valor válido');
    });
  });
});
