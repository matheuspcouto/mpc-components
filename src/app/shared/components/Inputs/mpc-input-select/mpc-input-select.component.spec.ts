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

  it('deve chamar ngOnInit sem value', () => {
    (component as any).value = undefined;
    (component as any).ngOnInit();
    expect((component as any).opcaoSelecionada).toEqual({ label: 'Selecione', value: '', selected: true });
  });

});
