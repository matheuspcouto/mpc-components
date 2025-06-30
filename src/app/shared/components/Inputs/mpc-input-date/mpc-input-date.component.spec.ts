import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputDateComponent } from './mpc-input-date.component';

describe('MpcInputDateComponent', () => {
  let component: MpcInputDateComponent;
  let fixture: ComponentFixture<MpcInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputDateComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir valor ao setar data', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '2023-01-01' } });
    expect(component.valor.emit).toHaveBeenCalledWith('2023-01-01');
  });

  it('deve emitir erro ao valor vazio se required', () => {
    jest.spyOn(component.error, 'emit');
    component.required = true;
    component['setValue']({ target: { value: '' } });
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('isCampoValido retorna true se readonly', () => {
    component.readonly = true;
    expect((component as any).isCampoValido('2023-01-01')).toBe(true);
  });

  it('isCampoValido retorna false se obrigatório e vazio', () => {
    component.required = true;
    component.label = 'Data';
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna false se menor que minDate', () => {
    component.minDate = '2023-01-01';
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('2022-12-31')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna false se maior que maxDate', () => {
    component.maxDate = '2023-12-31';
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('2024-01-01')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna true se válido', () => {
    expect((component as any).isCampoValido('2023-01-01')).toBe(true);
  });

  it('validaMinDate retorna true se valor menor que minDate', () => {
    component.minDate = '2023-01-01';
    expect((component as any).validaMinDate('2022-12-31')).toBe(true);
  });

  it('validaMaxDate retorna true se valor maior que maxDate', () => {
    component.maxDate = '2023-12-31';
    expect((component as any).validaMaxDate('2024-01-01')).toBe(true);
  });

  it('isCampoObrigatorio retorna true se required e vazio', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
  });

  it('isCampoObrigatorio retorna false se preenchido', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('2023-01-01')).toBe(false);
  });
});
