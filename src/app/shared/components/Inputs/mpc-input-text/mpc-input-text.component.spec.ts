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
      expect(component.required).toBe(false);
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
      component.required = true;
      component.min = '3';
      component.max = '10';

      expect(component.id).toBe('test-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Test Label');
      expect(component.label).toBe('Nome');
      expect(component.readonly).toBe(true);
      expect(component.disabled).toBe(true);
      expect(component.value).toBe('teste');
      expect(component.required).toBe(true);
      expect(component.min).toBe('3');
      expect(component.max).toBe('10');
    });
  });

  describe('getter e setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      const spyIsCampoValido = jest.spyOn(component, 'isCampoValido').mockReturnValue(true);
      const spyEmit = jest.spyOn(component.valor, 'emit');

      component.Value = 'novo valor';

      expect(component.Value).toBe('novo valor');
      expect(component.value).toBe('novo valor');
      expect(spyIsCampoValido).toHaveBeenCalled();
      expect(spyEmit).toHaveBeenCalledWith('novo valor');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const spyIsCampoValido = jest.spyOn(component, 'isCampoValido').mockReturnValue(false);
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
  });

  describe('setValue', () => {
    it('deve definir valor e chamar callbacks', () => {
      const spyOnChange = jest.spyOn(component, 'onChange');
      const spyOnTouched = jest.spyOn(component, 'onTouched');
      const mockEvent = { target: { value: 'valor do evento' } };

      component.setValue(mockEvent);

      expect(component.Value).toBe('valor do evento');
      expect(spyOnChange).toHaveBeenCalledWith('valor do evento');
      expect(spyOnTouched).toHaveBeenCalled();
    });
  });

  describe('validações', () => {
    describe('isCampoValido', () => {
      it('deve retornar true quando campo é readonly', () => {
        component.readonly = true;
        expect(component.isCampoValido()).toBe(true);
      });

      it('deve retornar true quando campo é disabled', () => {
        component.disabled = true;
        expect(component.isCampoValido()).toBe(true);
      });

      it('deve retornar false quando validação required falha', () => {
        const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(true);
        const spyEmit = jest.spyOn(component.error, 'emit');
        component.label = 'Nome';

        const resultado = component.isCampoValido();

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Nome é obrigatório');
        expect(spyEmit).toHaveBeenCalledWith({ required: true });
        expect(spyValidaRequired).toHaveBeenCalled();
      });

      it('deve retornar false quando validação min falha', () => {
        const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const spyValidaMin = jest.spyOn(component, 'validaMin').mockReturnValue(true);
        const spyEmit = jest.spyOn(component.error, 'emit');
        component.label = 'Nome';
        component.min = '5';

        const resultado = component.isCampoValido();

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Nome deve ter no mínimo 5 caracteres');
        expect(spyEmit).toHaveBeenCalledWith({ min: true });
        expect(spyValidaRequired).toHaveBeenCalled();
        expect(spyValidaMin).toHaveBeenCalled();
      });

      it('deve retornar false quando validação max falha', () => {
        const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const spyValidaMin = jest.spyOn(component, 'validaMin').mockReturnValue(false);
        const spyValidaMax = jest.spyOn(component, 'validaMax').mockReturnValue(true);
        const spyEmit = jest.spyOn(component.error, 'emit');
        component.label = 'Nome';
        component.max = '10';

        const resultado = component.isCampoValido();

        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Nome deve ter no máximo 10 caracteres');
        expect(spyEmit).toHaveBeenCalledWith({ max: true });
        expect(spyValidaRequired).toHaveBeenCalled();
        expect(spyValidaMin).toHaveBeenCalled();
        expect(spyValidaMax).toHaveBeenCalled();
      });

      it('deve retornar true quando todas as validações passam', () => {
        const spyValidaRequired = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const spyValidaMin = jest.spyOn(component, 'validaMin').mockReturnValue(false);
        const spyValidaMax = jest.spyOn(component, 'validaMax').mockReturnValue(false);

        const resultado = component.isCampoValido();

        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
        expect(spyValidaRequired).toHaveBeenCalled();
        expect(spyValidaMin).toHaveBeenCalled();
        expect(spyValidaMax).toHaveBeenCalled();
      });
    });

    describe('validaMin', () => {
      it('deve retornar false quando min não está definido', () => {
        component.min = '';
        expect(component.validaMin()).toBe(false);
      });

      it('deve retornar false quando valor não está definido', () => {
        component.min = '5';
        component.value = undefined;
        expect(component.validaMin()).toBe(false);
      });

      it('deve retornar true quando valor é menor que mínimo', () => {
        component.min = '5';
        component.value = 'abc';
        expect(component.validaMin()).toBe(true);
      });

      it('deve retornar false quando valor atende ao mínimo', () => {
        component.min = '3';
        component.value = 'abc';
        expect(component.validaMin()).toBe(false);
      });

      it('deve retornar false quando valor é maior que mínimo', () => {
        component.min = '3';
        component.value = 'abcd';
        expect(component.validaMin()).toBe(false);
      });
    });

    describe('validaMax', () => {
      it('deve retornar false quando max não está definido', () => {
        component.max = '';
        expect(component.validaMax()).toBe(false);
      });

      it('deve retornar false quando valor não está definido', () => {
        component.max = '5';
        component.value = undefined;
        expect(component.validaMax()).toBe(false);
      });

      it('deve retornar true quando valor é maior que máximo', () => {
        component.max = '3';
        component.value = 'abcd';
        expect(component.validaMax()).toBe(true);
      });

      it('deve retornar false quando valor atende ao máximo', () => {
        component.max = '5';
        component.value = 'abcde';
        expect(component.validaMax()).toBe(false);
      });

      it('deve retornar false quando valor é menor que máximo', () => {
        component.max = '5';
        component.value = 'abc';
        expect(component.validaMax()).toBe(false);
      });
    });

    describe('validaRequired', () => {
      it('deve retornar false quando campo não foi tocado', () => {
        component['campoTocado'] = false;
        component.required = true;
        component.value = '';
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false quando required é false e min não está definido', () => {
        component['campoTocado'] = true;
        component.required = false;
        component.min = '';
        component.value = '';
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar true quando campo é obrigatório, foi tocado e está vazio', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.value = '';
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar true quando min está definido, campo foi tocado e está vazio', () => {
        component['campoTocado'] = true;
        component.required = false;
        component.min = '3';
        component.value = '';
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar false quando campo tem valor', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.value = 'valor';
        expect(component.validaRequired()).toBe(false);
      });
    });
  });

  describe('eventos de saída', () => {
    it('deve emitir valor quando campo é válido', () => {
      const spyEmit = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component, 'isCampoValido').mockReturnValue(true);

      component.Value = 'valor válido';

      expect(spyEmit).toHaveBeenCalledWith('valor válido');
    });

    it('deve emitir erro quando validação falha', () => {
      const spyEmit = jest.spyOn(component.error, 'emit');
      component.required = true;
      component['campoTocado'] = true;
      component.value = '';
      component.label = 'Campo';

      component.isCampoValido();

      expect(spyEmit).toHaveBeenCalledWith({ required: true });
    });
  });
});
