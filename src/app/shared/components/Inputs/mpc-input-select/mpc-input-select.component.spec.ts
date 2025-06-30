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

  it('deve emitir valor da opção selecionada ao iniciar', () => {
    jest.spyOn(component.valor, 'emit');
    component.options = mockOptions;
    component.ngOnInit();
    expect(component.valor.emit).toHaveBeenCalledWith('opcao3');
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('deve emitir valor ao selecionar opção válida', () => {
    jest.spyOn(component.valor, 'emit');
    const novaOpcao: SelectOption = { label: 'Nova Opção', value: 'nova' };
    component.setValue(novaOpcao);
    expect(component.valor.emit).toHaveBeenCalledWith('nova');
  });

  it('isCampoValido retorna true se desabilitado', () => {
    component.disabled = true;
    expect((component as any).isCampoValido()).toBe(true);
  });

  it('isCampoValido retorna false se obrigatório e sem seleção', () => {
    component.required = true;
    (component as any)['campoTocado'] = true;
    (component as any)['opcaoSelecionada'] = undefined;
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido()).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });
});
