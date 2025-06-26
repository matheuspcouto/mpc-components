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
      expect(component.value).toBeUndefined();
      expect(component.label).toBe('');
      expect(component.disabled).toBe(false);
      expect(component.readonly).toBe(false);
      expect(component.min).toBeUndefined();
      expect(component.max).toBeUndefined();
    });

    it('deve aceitar valores customizados', () => {
      component.id = 'test-id';
      component.tabIndex = 5;
      component.ariaLabel = 'Test Label';
      component.value = 10;
      component.label = 'Idade';
      component.disabled = true;
      component.readonly = true;
      component.min = 1;
      component.max = 100;

      expect(component.id).toBe('test-id');
      expect(component.tabIndex).toBe(5);
      expect(component.ariaLabel).toBe('Test Label');
      expect(component.value).toBe(10);
      expect(component.label).toBe('Idade');
      expect(component.disabled).toBe(true);
      expect(component.readonly).toBe(true);
      expect(component.min).toBe(1);
      expect(component.max).toBe(100);
    });
  });

  describe('Método onFocus', () => {
    it('deve definir campoTocado como true e validar campo', () => {
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido');

      component['onFocus']();

      expect(component['campoTocado']).toBe(true);
      expect(isCampoValidoSpy).toHaveBeenCalledWith(component.value);
    });
  });

  describe('Método setValue', () => {
    it('deve definir valor e emitir quando campo é válido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const event = { target: { value: 20 } };

      component['setValue'](event);

      expect(component.value).toBe(20);
      expect(isCampoValidoSpy).toHaveBeenCalledWith(20);
      expect(valorSpy).toHaveBeenCalledWith(20);
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const event = { target: { value: 20 } };

      component['setValue'](event);

      expect(component.value).toBe(20);
      expect(isCampoValidoSpy).toHaveBeenCalledWith(20);
      expect(valorSpy).not.toHaveBeenCalled();
    });
  });

  describe('Validações', () => {
    describe('isCampoValido', () => {
      it('deve retornar true quando campo é readonly', () => {
        component.readonly = true;

        const resultado = component['isCampoValido'](10);

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando campo é disabled', () => {
        component.disabled = true;

        const resultado = component['isCampoValido'](10);

        expect(resultado).toBe(true);
      });

      it('deve retornar false e emitir erro quando validação de min falha', () => {
        const errorSpy = jest.spyOn(component.error, 'emit');
        const validaMinSpy = jest.spyOn(component as any, 'validaMin').mockReturnValue(true);

        component.label = 'Idade';
        component.min = 18;
        const resultado = component['isCampoValido'](10);

        expect(validaMinSpy).toHaveBeenCalledWith(10);
        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O valor mínimo para o campo Idade é 18');
        expect(errorSpy).toHaveBeenCalledWith({ min: true });
      });

      it('deve retornar false e emitir erro quando validação de max falha', () => {
        const errorSpy = jest.spyOn(component.error, 'emit');
        const validaMinSpy = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
        const validaMaxSpy = jest.spyOn(component as any, 'validaMax').mockReturnValue(true);

        component.label = 'Idade';
        component.max = 100;
        const resultado = component['isCampoValido'](150);

        expect(validaMinSpy).toHaveBeenCalledWith(150);
        expect(validaMaxSpy).toHaveBeenCalledWith(150);
        expect(resultado).toBe(false);
        expect(component['errorMessage']).toBe('O valor máximo para o campo Idade é 100');
        expect(errorSpy).toHaveBeenCalledWith({ max: true });
      });

      it('deve retornar true quando todas as validações passam', () => {
        const validaMinSpy = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
        const validaMaxSpy = jest.spyOn(component as any, 'validaMax').mockReturnValue(false);

        const resultado = component['isCampoValido'](50);

        expect(validaMinSpy).toHaveBeenCalledWith(50);
        expect(validaMaxSpy).toHaveBeenCalledWith(50);
        expect(resultado).toBe(true);
        expect(component['errorMessage']).toBeUndefined();
      });
    });

    describe('validaMin', () => {
      it('deve retornar false quando min não está definido', () => {
        component.min = undefined;

        const resultado = component['validaMin'](10);

        expect(resultado).toBe(false);
      });

      it('deve retornar true quando valor não está definido', () => {
        component.min = 10;

        const resultado = component['validaMin'](undefined);

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando valor é menor que mínimo', () => {
        component.min = 10;

        const resultado = component['validaMin'](5);

        expect(resultado).toBe(true);
      });

      it('deve retornar false quando valor é maior ou igual ao mínimo', () => {
        component.min = 10;

        const resultado = component['validaMin'](15);

        expect(resultado).toBe(false);
      });
    });

    describe('validaMax', () => {
      it('deve retornar false quando max não está definido', () => {
        component.max = undefined;

        const resultado = component['validaMax'](10);

        expect(resultado).toBe(false);
      });

      it('deve retornar true quando valor não está definido', () => {
        component.max = 100;

        const resultado = component['validaMax'](undefined);

        expect(resultado).toBe(true);
      });

      it('deve retornar true quando valor é maior que máximo', () => {
        component.max = 100;

        const resultado = component['validaMax'](150);

        expect(resultado).toBe(true);
      });

      it('deve retornar false quando valor é menor ou igual ao máximo', () => {
        component.max = 100;

        const resultado = component['validaMax'](50);

        expect(resultado).toBe(false);
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
});
