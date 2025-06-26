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
      expect(component.value).toBeUndefined();
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
      const mockEvent = { target: { value: 'valor teste' } };
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
      const spyEmitValor = jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component.value).toBe('valor teste');
      expect(spyIsCampoValido).toHaveBeenCalledWith('valor teste');
      expect(spyEmitValor).toHaveBeenCalledWith('valor teste');
    });

    it('deve definir valor mas não emitir quando campo é inválido', () => {
      const mockEvent = { target: { value: 'ab' } };
      const spyIsCampoValido = jest.spyOn(component as any, 'isCampoValido').mockReturnValue(false);
      const spyEmitValor = jest.spyOn(component.valor, 'emit');

      component['setValue'](mockEvent);

      expect(component.value).toBe('ab');
      expect(spyIsCampoValido).toHaveBeenCalledWith('ab');
      expect(spyEmitValor).not.toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando campo é readonly', () => {
      component.readonly = true;

      const resultado = component['isCampoValido']('qualquer valor');

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando campo é disabled', () => {
      component.disabled = true;

      const resultado = component['isCampoValido']('qualquer valor');

      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando validação min falha', () => {
      const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(true);
      const spyValidaMax = jest.spyOn(component as any, 'validaMax').mockReturnValue(false);
      const spyEmitError = jest.spyOn(component.error, 'emit');
      component.label = 'Nome';
      component.min = '5';

      const resultado = component['isCampoValido']('abc');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo Nome deve ter no mínimo 5 caracteres');
      expect(spyEmitError).toHaveBeenCalledWith({ min: true });
      expect(spyValidaMin).toHaveBeenCalledWith('abc');
      expect(spyValidaMax).not.toHaveBeenCalled();
    });

    it('deve retornar false e emitir erro quando validação max falha', () => {
      const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
      const spyValidaMax = jest.spyOn(component as any, 'validaMax').mockReturnValue(true);
      const spyEmitError = jest.spyOn(component.error, 'emit');
      component.label = 'Nome';
      component.max = '3';

      const resultado = component['isCampoValido']('abcdef');

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo Nome deve ter no máximo 3 caracteres');
      expect(spyEmitError).toHaveBeenCalledWith({ max: true });
      expect(spyValidaMin).toHaveBeenCalledWith('abcdef');
      expect(spyValidaMax).toHaveBeenCalledWith('abcdef');
    });

    it('deve retornar true quando todas as validações passam', () => {
      const spyValidaMin = jest.spyOn(component as any, 'validaMin').mockReturnValue(false);
      const spyValidaMax = jest.spyOn(component as any, 'validaMax').mockReturnValue(false);

      const resultado = component['isCampoValido']('valor válido');

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
      expect(spyValidaMin).toHaveBeenCalledWith('valor válido');
      expect(spyValidaMax).toHaveBeenCalledWith('valor válido');
    });
  });

  describe('validaMin', () => {
    it('deve retornar false quando min não está definido', () => {
      component.min = '';

      const resultado = component['validaMin']('qualquer valor');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando valor não está definido e min está definido', () => {
      component.min = '5';

      const resultado = component['validaMin'](undefined);

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é menor que mínimo', () => {
      component.min = '5';

      const resultado = component['validaMin']('abc');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando valor atende ao mínimo exato', () => {
      component.min = '3';

      const resultado = component['validaMin']('abc');

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando valor é maior que mínimo', () => {
      component.min = '3';

      const resultado = component['validaMin']('abcdef');

      expect(resultado).toBe(false);
    });
  });

  describe('validaMax', () => {
    it('deve retornar false quando max não está definido', () => {
      component.max = '';

      const resultado = component['validaMax']('qualquer valor');

      expect(resultado).toBe(false);
    });

    it('deve retornar true quando valor não está definido e max está definido', () => {
      component.max = '5';

      const resultado = component['validaMax'](undefined);

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é maior que máximo', () => {
      component.max = '3';

      const resultado = component['validaMax']('abcdef');

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando valor atende ao máximo exato', () => {
      component.max = '5';

      const resultado = component['validaMax']('abcde');

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando valor é menor que máximo', () => {
      component.max = '5';

      const resultado = component['validaMax']('abc');

      expect(resultado).toBe(false);
    });
  });
});
