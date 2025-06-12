import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputNumberComponent } from './mpc-input-number.component';

describe('MpcInputNumberComponent', () => {
  let component: MpcInputNumberComponent;
  let fixture: ComponentFixture<MpcInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputNumberComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputNumberComponent);
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
      expect(component.value).toBe(0);
      expect(component.label).toBe('');
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
      expect(component.required).toBe(false);
      expect(component.min).toBe('');
      expect(component.max).toBe('');
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'test-id';
      component.tabIndex = 5;
      component.ariaLabel = 'Test Label';
      component.value = 10;
      component.label = 'Idade';
      component.disabled = true;
      component.readonly = true;
      component.required = true;
      component.min = '1';
      component.max = '100';

      expect(component.id).toBe('test-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Test Label');
      expect(component.value).toBe(10);
      expect(component.label).toBe('Idade');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.required).toBe(true);
      expect(component.min).toBe('1');
      expect(component.max).toBe('100');
    });
  });

  describe('Getter e Setter Value', () => {
    it('deve definir e obter valor através do setter/getter', () => {
      component.Value = 25;
      expect(component.Value).toBe(25);
      expect(component.value).toBe(25);
    });

    it('deve emitir valor quando campo é válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const validacaoSpy = jest.spyOn(component, 'isCampoValido').mockReturnValue(true);

      component.Value = 30;

      expect(validacaoSpy).toHaveBeenCalled();
      expect(valorSpy).toHaveBeenCalledWith(30);
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const validacaoSpy = jest.spyOn(component, 'isCampoValido').mockReturnValue(false);

      component.Value = 30;

      expect(validacaoSpy).toHaveBeenCalled();
      expect(valorSpy).not.toHaveBeenCalled();
    });
  });

  describe('Métodos ControlValueAccessor', () => {
    it('deve escrever valor através de writeValue', () => {
      component.writeValue(15);
      expect(component.value).toBe(15);
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
      const onChangeSpy = jest.spyOn(component, 'onChange');
      const onTouchedSpy = jest.spyOn(component, 'onTouched');
      const event = { target: { value: 20 } };

      component.setValue(event);

      expect(component.Value).toBe(20);
      expect(onChangeSpy).toHaveBeenCalledWith(20);
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
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
        const errorSpy = jest.spyOn(component.error, 'emit');
        const requiredSpy = jest.spyOn(component, 'validaRequired').mockReturnValue(true);

        component.label = 'Idade';
        const resultado = component.isCampoValido();

        expect(requiredSpy).toHaveBeenCalled();
        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O campo Idade é obrigatório');
        expect(errorSpy).toHaveBeenCalledWith({ required: true });
      });

      it('deve retornar false e emitir erro quando min é inválido', () => {
        const errorSpy = jest.spyOn(component.error, 'emit');
        const requiredSpy = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const minSpy = jest.spyOn(component, 'validaMin').mockReturnValue(true);

        component.label = 'Idade';
        component.min = '18';
        const resultado = component.isCampoValido();

        expect(requiredSpy).toHaveBeenCalled();
        expect(minSpy).toHaveBeenCalled();
        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O valor mínimo para o campo Idade é 18');
        expect(errorSpy).toHaveBeenCalledWith({ min: true });
      });

      it('deve retornar false e emitir erro quando max é inválido', () => {
        const errorSpy = jest.spyOn(component.error, 'emit');
        const requiredSpy = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const minSpy = jest.spyOn(component, 'validaMin').mockReturnValue(false);
        const maxSpy = jest.spyOn(component, 'validaMax').mockReturnValue(true);

        component.label = 'Idade';
        component.max = '100';
        const resultado = component.isCampoValido();

        expect(requiredSpy).toHaveBeenCalled();
        expect(minSpy).toHaveBeenCalled();
        expect(maxSpy).toHaveBeenCalled();
        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O valor máximo para o campo Idade é 100');
        expect(errorSpy).toHaveBeenCalledWith({ max: true });
      });

      it('deve retornar true quando todas as validações passam', () => {
        const requiredSpy = jest.spyOn(component, 'validaRequired').mockReturnValue(false);
        const minSpy = jest.spyOn(component, 'validaMin').mockReturnValue(false);
        const maxSpy = jest.spyOn(component, 'validaMax').mockReturnValue(false);

        const resultado = component.isCampoValido();

        expect(requiredSpy).toHaveBeenCalled();
        expect(minSpy).toHaveBeenCalled();
        expect(maxSpy).toHaveBeenCalled();
        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });
    });

    describe('validaMin', () => {
      it('deve retornar false quando min não está definido', () => {
        component.min = '';
        expect(component.validaMin()).toBe(false);
      });

      it('deve retornar true quando valor é menor que mínimo', () => {
        component.min = '10';
        component.Value = 5;
        expect(component.validaMin()).toBe(true);
      });

      it('deve retornar false quando valor é maior ou igual ao mínimo', () => {
        component.min = '10';
        component.Value = 15;
        expect(component.validaMin()).toBe(false);
      });

      it('deve retornar false quando valor é undefined', () => {
        component.min = '10';
        component.value = undefined;
        expect(component.validaMin()).toBe(false);
      });
    });

    describe('validaMax', () => {
      it('deve retornar false quando max não está definido', () => {
        component.max = '';
        expect(component.validaMax()).toBe(false);
      });

      it('deve retornar true quando valor é maior que máximo', () => {
        component.max = '100';
        component.Value = 150;
        expect(component.validaMax()).toBe(true);
      });

      it('deve retornar false quando valor é menor ou igual ao máximo', () => {
        component.max = '100';
        component.Value = 50;
        expect(component.validaMax()).toBe(false);
      });

      it('deve retornar false quando valor é undefined', () => {
        component.max = '100';
        component.value = undefined;
        expect(component.validaMax()).toBe(false);
      });
    });

    describe('validaRequired', () => {
      it('deve retornar true quando campo é obrigatório, tocado e valor é 0', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.Value = 0;
        expect(component.validaRequired()).toBe(true);
      });

      it('deve retornar false quando campo não é obrigatório', () => {
        component['campoTocado'] = true;
        component.required = false;
        component.Value = 0;
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false quando campo não foi tocado', () => {
        component['campoTocado'] = false;
        component.required = true;
        component.Value = 0;
        expect(component.validaRequired()).toBe(false);
      });

      it('deve retornar false quando valor não é 0', () => {
        component['campoTocado'] = true;
        component.required = true;
        component.Value = 5;
        expect(component.validaRequired()).toBe(false);
      });
    });
  });

  describe('Propriedades protegidas', () => {
    it('deve inicializar errorMessage como undefined', () => {
      expect(component['errorMessage']).toBeUndefined();
    });

    it('deve inicializar campoTocado como false', () => {
      expect(component['campoTocado']).toBe(false);
    });

    it('deve permitir alteração de campoTocado', () => {
      component['campoTocado'] = true;
      expect(component['campoTocado']).toBe(true);
    });
  });

  describe('Callbacks padrão', () => {
    it('deve ter onChange como função vazia por padrão', () => {
      expect(typeof component.onChange).toBe('function');
      expect(component.onChange()).toBeUndefined();
    });

    it('deve ter onTouched como função vazia por padrão', () => {
      expect(typeof component.onTouched).toBe('function');
      expect(component.onTouched()).toBeUndefined();
    });
  });
});
