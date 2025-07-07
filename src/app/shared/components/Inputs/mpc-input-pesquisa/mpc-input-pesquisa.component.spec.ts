import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MpcInputPesquisaComponent } from './mpc-input-pesquisa.component';

describe('MpcInputPesquisaComponent', () => {
  let component: MpcInputPesquisaComponent;
  let fixture: ComponentFixture<MpcInputPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputPesquisaComponent, ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve escrever valor via writeValue', () => {
    component.writeValue('abc');
    expect(component.value).toBe('abc');
  });

  it('deve registrar onChange e onTouched', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    component.onChange('abc');
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('deve validar campo menor que mínimo', () => {
    component.min = 5;
    (component as any).campoTocado = true;
    component.value = 'abc';
    const control = new FormControl('abc');
    const result = component.validate(control);
    expect(result).toEqual({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve aceitar valor válido', () => {
    component.min = 2;
    (component as any).campoTocado = true;
    component.value = 'abcd';
    const control = new FormControl('abcd');
    const result = component.validate(control);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve retornar null se readonly for true', () => {
    component.readonly = true;
    component.value = 'abc';
    const control = new FormControl('abc');
    const result = component.validate(control);
    expect(result).toBeNull();
  });

  it('deve retornar null se disabled for true', () => {
    component.disabled = true;
    component.value = 'abc';
    const control = new FormControl('abc');
    const result = component.validate(control);
    expect(result).toBeNull();
  });

  it('deve limpar a pesquisa', () => {
    component.value = 'algum valor';
    (component as any).limparPesquisa();
    expect(component.value).toBe('');
  });

  it('deve emitir evento ao pesquisar', () => {
    const spy = jest.spyOn(component.acao, 'emit');
    component.value = 'busca';
    (component as any).pesquisar();
    expect(spy).toHaveBeenCalledWith('busca');
  });

  it('deve atualizar valor e disparar onChange/onTouched ao setValue', () => {
    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);
    (component as any).setValue({ target: { value: 'novo valor' } });
    expect(component.value).toBe('novo valor');
    expect(onChange).toHaveBeenCalledWith('novo valor');
    expect(onTouched).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBeTruthy();
  });

  it('minLength deve retornar 0 se min não for definido', () => {
    component.min = undefined;
    expect(component.minLength).toBe(0);
  });

  it('isMenorQueValorMinimo deve retornar false se minLength for 0', () => {
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });

  it('isMenorQueValorMinimo deve retornar true se value for vazio', () => {
    component.min = 3;
    expect((component as any).isMenorQueValorMinimo('')).toBe(true);
  });

  it('isMenorQueValorMinimo deve retornar true se value.length < minLength', () => {
    component.min = 5;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(true);
  });

  it('isMenorQueValorMinimo deve retornar false se value.length >= minLength', () => {
    component.min = 2;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });
});
