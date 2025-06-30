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

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('deve emitir valor válido ao setar número', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: 10 } });
    expect(component.valor.emit).toHaveBeenCalledWith(10);
  });

  it('não deve emitir valor menor que min', () => {
    jest.spyOn(component.valor, 'emit');
    component.min = 5;
    component['setValue']({ target: { value: 2 } });
    expect(component.valor.emit).not.toHaveBeenCalled();
  });

  it('não deve emitir valor maior que max', () => {
    jest.spyOn(component.valor, 'emit');
    component.max = 10;
    component['setValue']({ target: { value: 20 } });
    expect(component.valor.emit).not.toHaveBeenCalled();
  });

  it('isCampoValido retorna true se readonly', () => {
    component.readonly = true;
    expect((component as any).isCampoValido(10)).toBe(true);
  });

  it('isCampoValido retorna false se menor que min', () => {
    component.min = 5;
    expect((component as any).isCampoValido(2)).toBe(false);
  });

  it('isCampoValido retorna false se maior que max', () => {
    component.max = 10;
    expect((component as any).isCampoValido(20)).toBe(false);
  });

  it('isCampoValido retorna true se válido', () => {
    component.min = 1;
    component.max = 10;
    expect((component as any).isCampoValido(5)).toBe(true);
  });
});
