import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSelectComponent, SelectOption } from './mpc-input-select.component';
import { ValidationErrors } from '@angular/forms';

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

  it('deve adicionar opção "Selecione" se nenhuma selecionada', () => {
    component.options = [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' }
    ];
    component.ngOnInit();
    expect(component.options[0].label).toBe('Selecione');
    expect((component as any).opcaoSelecionada?.label).toBe('Selecione');
  });

  it('deve emitir valor se houver opção selecionada', () => {
    const spy = jest.spyOn(component.valor, 'emit');
    component.options = [
      { label: 'Opção 1', value: '1', selected: true },
      { label: 'Opção 2', value: '2' }
    ];
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('1');
    expect((component as any).opcaoSelecionada?.value).toBe('1');
  });

  it('deve emitir erro se campo obrigatório não for selecionado', () => {
    component.required = true;
    component.label = 'Campo';
    component.options = [
      { label: 'Selecione', value: '', selected: true },
      { label: 'Opção 1', value: '1' }
    ];
    component.ngOnInit();
    (component as any).campoTocado = true;
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).isCampoValido();
    expect(spy).toHaveBeenCalledWith({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    component.label = 'Campo';
    component.options = [
      { label: 'Opção 1', value: '1', selected: true },
      { label: 'Opção 2', value: '2' }
    ];
    component.ngOnInit();
    (component as any).campoTocado = true;
    expect((component as any).isCampoValido()).toBe(true);
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo disabled', () => {
    component.disabled = true;
    expect((component as any).isCampoValido()).toBe(true);
  });

  it('deve emitir valor ao setValue válido', () => {
    const spy = jest.spyOn(component.valor, 'emit');
    component.options = [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' }
    ];
    component.ngOnInit();
    component.setValue({ label: 'Opção 2', value: '2' });
    expect(spy).toHaveBeenCalledWith('2');
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve chamar isCampoValido no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'isCampoValido');
    component.options = [
      { label: 'Opção 1', value: '1', selected: true }
    ];
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('deve validar isCampoObrigatorio corretamente', () => {
    component.required = true;
    component.options = [
      { label: 'Selecione', value: '', selected: true },
      { label: 'Opção 1', value: '1' }
    ];
    component.ngOnInit();
    expect((component as any).isCampoObrigatorio()).toBe(true);
    component.options = [
      { label: 'Opção 1', value: '1', selected: true }
    ];
    component.ngOnInit();
    expect((component as any).isCampoObrigatorio()).toBe(false);
    component.required = false;
    expect((component as any).isCampoObrigatorio()).toBe(false);
  });
});
