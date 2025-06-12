import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSelectComponent, SelectOption } from './mpc-input-select.component';

describe('MpcInputSelectComponent', () => {
  let component: MpcInputSelectComponent;
  let fixture: ComponentFixture<MpcInputSelectComponent>;

  const mockOptions: SelectOption[] = [
    { label: 'Opção 1', value: 'opcao1' },
    { label: 'Opção 2', value: 'opcao2' },
    { label: 'Opção 3', value: 'opcao3', selected: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcInputSelectComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve encontrar opção selecionada quando existe', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      component.options = mockOptions;

      component.ngOnInit();

      expect(component['opcaoSelecionada']).toEqual(mockOptions[2]);
      expect(valorSpy).toHaveBeenCalledWith('opcao3');
    });

    it('deve adicionar opção "Selecione" quando não há opção selecionada', () => {
      const optionsSemSelecao: SelectOption[] = [
        { label: 'Opção 1', value: 'opcao1' },
        { label: 'Opção 2', value: 'opcao2' }
      ];
      component.options = optionsSemSelecao;

      component.ngOnInit();

      expect(component.options[0]).toEqual({ label: 'Selecione', value: '', selected: true });
      expect(component['opcaoSelecionada']).toEqual({ label: 'Selecione', value: '', selected: true });
    });

    it('deve emitir erro quando campo é obrigatório e não há seleção', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      component.required = true;
      component.options = [{ label: 'Opção 1', value: 'opcao1' }];

      component.ngOnInit();

      expect(errorSpy).toHaveBeenCalledWith({ required: true });
    });
  });

  describe('OpcaoSelecionada setter/getter', () => {
    it('deve definir opção selecionada e marcar campo como tocado', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      const isCampoValidoSpy = jest.spyOn(component, 'isCampoValido').mockReturnValue(true);
      const novaOpcao: SelectOption = { label: 'Nova Opção', value: 'nova' };

      component.OpcaoSelecionada = novaOpcao;

      expect(component['opcaoSelecionada']).toEqual(novaOpcao);
      expect(component['campoTocado']).toBe(true);
      expect(isCampoValidoSpy).toHaveBeenCalled();
      expect(valorSpy).toHaveBeenCalledWith('nova');
    });

    it('não deve emitir valor quando campo é inválido', () => {
      const valorSpy = jest.spyOn(component.valor, 'emit');
      jest.spyOn(component, 'isCampoValido').mockReturnValue(false);
      const novaOpcao: SelectOption = { label: 'Nova Opção', value: 'nova' };

      component.OpcaoSelecionada = novaOpcao;

      expect(valorSpy).not.toHaveBeenCalled();
    });

    it('deve retornar opção selecionada', () => {
      const opcao: SelectOption = { label: 'Teste', value: 'teste' };
      component['opcaoSelecionada'] = opcao;

      expect(component.OpcaoSelecionada).toEqual(opcao);
    });
  });

  describe('registerOnChange', () => {
    it('deve registrar função onChange', () => {
      const mockFn = jest.fn();

      component.registerOnChange(mockFn);

      expect(component.onChange).toBe(mockFn);
    });
  });

  describe('registerOnTouched', () => {
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
      const opcao: SelectOption = { label: 'Teste', value: 'teste' };

      component.setValue(opcao);

      expect(component.OpcaoSelecionada).toEqual(opcao);
      expect(onChangeSpy).toHaveBeenCalledWith(opcao);
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('isCampoValido', () => {
    it('deve retornar true quando campo está desabilitado', () => {
      component.disabled = true;

      const resultado = component.isCampoValido();

      expect(resultado).toBe(true);
    });

    it('deve retornar false e emitir erro quando validação required falha', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      jest.spyOn(component, 'validaRequired').mockReturnValue(true);
      component.label = 'Teste';

      const resultado = component.isCampoValido();

      expect(resultado).toBe(false);
      expect(component['errorMessage']).toBe('O campo Teste é obrigatório');
      expect(errorSpy).toHaveBeenCalledWith({ 'required': true });
    });

    it('deve retornar true e limpar erro quando campo é válido', () => {
      const errorSpy = jest.spyOn(component.error, 'emit');
      jest.spyOn(component, 'validaRequired').mockReturnValue(false);

      const resultado = component.isCampoValido();

      expect(resultado).toBe(true);
      expect(component['errorMessage']).toBeUndefined();
      expect(errorSpy).toHaveBeenCalledWith({});
    });
  });

  describe('validaRequired', () => {
    beforeEach(() => {
      component.required = true;
      component['campoTocado'] = true;
    });

    it('deve retornar true quando opção não está selecionada', () => {
      component['opcaoSelecionada'] = undefined;

      const resultado = component.validaRequired();

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor está vazio', () => {
      component['opcaoSelecionada'] = { label: 'Teste', value: '' };

      const resultado = component.validaRequired();

      expect(resultado).toBe(true);
    });

    it('deve retornar true quando valor é "Selecione"', () => {
      component['opcaoSelecionada'] = { label: 'Selecione', value: 'Selecione' };

      const resultado = component.validaRequired();

      expect(resultado).toBe(true);
    });

    it('deve retornar false quando campo não é obrigatório', () => {
      component.required = false;

      const resultado = component.validaRequired();

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando campo não foi tocado', () => {
      component['campoTocado'] = false;

      const resultado = component.validaRequired();

      expect(resultado).toBe(false);
    });

    it('deve retornar false quando opção válida está selecionada', () => {
      component['opcaoSelecionada'] = { label: 'Opção Válida', value: 'valida' };

      const resultado = component.validaRequired();

      expect(resultado).toBe(false);
    });
  });

  describe('propriedades de entrada', () => {
    it('deve ter valores padrão corretos', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('');
      expect(component.label).toBe('');
      expect(component.disabled).toBe(false);
      expect(component.options).toEqual([]);
      expect(component.required).toBe(false);
    });
  });

  describe('propriedades protegidas', () => {
    it('deve inicializar propriedades protegidas corretamente', () => {
      expect(component['opcaoSelecionada']).toBeUndefined();
      expect(component['errorMessage']).toBeUndefined();
      expect(component['campoTocado']).toBe(false);
    });
  });
});
