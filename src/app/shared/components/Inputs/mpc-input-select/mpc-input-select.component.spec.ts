import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSelectComponent, SelectOption } from './mpc-input-select.component';

describe('MpcInputSelectComponent', () => {
  let component: MpcInputSelectComponent;
  let fixture: ComponentFixture<MpcInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputSelectComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor ao setValue', () => {
    const option: SelectOption = { label: 'Teste', value: 'T', selected: false };
    component.options = [option];
    component['setValue'](option);
    expect(component.value).toBe('T');
    expect((component as any).opcaoSelecionada).toEqual(option);
  });

  it('deve validar campo obrigatório - required false', () => {
    component.required = false;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toBeNull();
  });

  it('deve validar campo obrigatório - required true', () => {
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    (component as any).opcaoSelecionada = { label: 'Teste', value: 'T', selected: true };
    const result = component.validate({ value: 'T' } as any);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve chamar writeValue', () => {
    const spyOnWriteValue = jest.spyOn(component as any, 'writeValue');
    component.writeValue('teste');
    expect(spyOnWriteValue).toHaveBeenCalledWith('teste');
  });

  it('deve chamar onFocus', () => {
    const spyOnOnFocus = jest.spyOn(component as any, 'onFocus');
    (component as any).onFocus();
    expect(spyOnOnFocus).toHaveBeenCalled();
  });

  it('deve chamar ngOnInit com value', () => {
    const spyOnNgOnInit = jest.spyOn(component as any, 'ngOnInit');
    component.value = 'teste';
    (component as any).ngOnInit();
    expect(spyOnNgOnInit).toHaveBeenCalled();
  });

  it('deve retornar null em validate se disabled for true', () => {
    component.disabled = true;
    component.required = true;
    (component as any).campoTocado = true;
    const result = component.validate({ value: '' } as any);
    expect(result).toBeNull();
  });

  it('deve marcar campo como tocado e chamar onChange ao focar', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');
    component.value = 'algum valor';
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
    expect(spyOnChange).toHaveBeenCalledWith('algum valor');
  });

  it('não deve retornar erro se campo obrigatório não foi tocado', () => {
    component.required = true;
    (component as any).campoTocado = false;
    (component as any).opcaoSelecionada = { label: 'Selecione', value: '', selected: true };
    const result = component.validate({ value: '' } as any);
    expect(result).toEqual({ required: true });
    // errorMessage não deve ser setado pois campo não foi tocado
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve adicionar "Selecione" apenas se não existir nas opções', () => {
    component.options = [
      { label: 'Selecione', value: '', selected: true },
      { label: 'Opção 1', value: '1' }
    ];
    component.value = '';
    component.ngOnInit();
    // Não deve duplicar 'Selecione'
    expect(component.options.filter(o => o.label === 'Selecione').length).toBe(1);
    expect((component as any).opcaoSelecionada).toEqual({ label: 'Selecione', value: '', selected: true });
  });

  it('deve selecionar a primeira opção se nenhuma estiver marcada como selected', () => {
    component.options = [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' }
    ];
    component.value = '';
    component.ngOnInit();
    expect((component as any).opcaoSelecionada).toEqual(component.options[0]);
  });

  it('deve selecionar a opção correta se value existir', () => {
    component.options = [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' }
    ];
    component.value = '2';
    component.ngOnInit();
    expect((component as any).opcaoSelecionada).toEqual({ label: 'Opção 2', value: '2' });
  });

  it('deve emitir valueChange ao setValue', () => {
    const option = { label: 'Opção', value: 'X' };
    const spy = jest.spyOn(component.valueChange, 'emit');
    component.setValue(option);
    expect(spy).toHaveBeenCalledWith('X');
  });

  it('isCampoObrigatorio deve retornar false se required for false', () => {
    component.required = false;
    (component as any).opcaoSelecionada = { label: 'Opção', value: '1' };
    // @ts-ignore
    expect(component['isCampoObrigatorio']()).toBe(false);
  });

  it('isCampoObrigatorio deve retornar true se required for true e valor vazio', () => {
    component.required = true;
    (component as any).opcaoSelecionada = { label: 'Selecione', value: '' };
    // @ts-ignore
    expect(component['isCampoObrigatorio']()).toBe(true);
  });

  it('isCampoObrigatorio deve retornar false se required for true e valor preenchido', () => {
    component.required = true;
    (component as any).opcaoSelecionada = { label: 'Opção', value: '1' };
    // @ts-ignore
    expect(component['isCampoObrigatorio']()).toBe(false);
  });

});
