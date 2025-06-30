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

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('deve emitir valor ao setar texto', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: 'valor teste' } });
    expect(component.valor.emit).toHaveBeenCalledWith('valor teste');
  });

  it('deve emitir valor vazio', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '' } });
    expect(component.valor.emit).toHaveBeenCalledWith('');
  });

  it('isCampoValido retorna true se readonly', () => {
    component.readonly = true;
    expect((component as any).isCampoValido('qualquer valor')).toBe(true);
  });

  it('isCampoValido retorna false se min falha', () => {
    component.min = '5';
    expect((component as any).isCampoValido('abc')).toBe(false);
  });

  it('isCampoValido retorna false se max falha', () => {
    component.max = '3';
    expect((component as any).isCampoValido('abcdef')).toBe(false);
  });

  it('isCampoValido retorna true se válido', () => {
    component.min = '1';
    component.max = '10';
    expect((component as any).isCampoValido('abc')).toBe(true);
  });
});
