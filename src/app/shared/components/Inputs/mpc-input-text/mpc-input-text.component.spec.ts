import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputTextComponent } from './mpc-input-text.component';
import { ValidationErrors } from '@angular/forms';

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

  it('deve emitir erro se valor for menor que o mínimo', () => {
    component.min = '5';
    component.label = 'Nome';
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).campoTocado = true;
    (component as any).isCampoValido('abc');
    expect(spy).toHaveBeenCalledWith({ min: true });
    expect((component as any).errorMessage).toContain('mínimo');
  });

  it('deve aceitar campo válido', () => {
    component.min = '2';
    component.label = 'Nome';
    (component as any).campoTocado = true;
    expect((component as any).isCampoValido('abc')).toBe(true);
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve aceitar campo readonly ou disabled', () => {
    component.readonly = true;
    expect((component as any).isCampoValido(undefined)).toBe(true);
    component.readonly = false;
    component.disabled = true;
    expect((component as any).isCampoValido(undefined)).toBe(true);
  });

  it('deve emitir valor ao setValue válido', () => {
    const spy = jest.spyOn(component.valor, 'emit');
    component.min = '2';
    (component as any).setValue({ target: { value: 'abc' } });
    expect(spy).toHaveBeenCalledWith('abc');
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve chamar isCampoValido no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'isCampoValido');
    component.value = 'abc';
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('abc');
  });

  it('deve validar isMenorQueValorMinimo corretamente', () => {
    component.min = '5';
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(true);
    expect((component as any).isMenorQueValorMinimo('abcdef')).toBe(false);
    expect((component as any).isMenorQueValorMinimo(undefined)).toBe(true);
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
    component.min = 'abc';
    expect((component as any).isMenorQueValorMinimo('abc')).toBe(false);
  });
});
