import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputSenhaComponent } from './mpc-input-senha.component';

describe('MpcInputSenhaComponent', () => {
  let component: MpcInputSenhaComponent;
  let fixture: ComponentFixture<MpcInputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputSenhaComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputSenhaComponent);
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

  it('deve emitir valor ao setar senha', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: 'SenhaForte123' } });
    expect(component.valor.emit).toHaveBeenCalledWith('SenhaForte123');
  });

  it('deve emitir valor vazio', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '' } });
    expect(component.valor.emit).toHaveBeenCalledWith('');
  });

  it('isCampoValido retorna true se readonly', () => {
    component.readonly = true;
    expect((component as any).isCampoValido('qualquer')).toBe(true);
  });

  it('isCampoValido retorna false se obrigatório e vazio', () => {
    component.required = true;
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna false se regex não bate', () => {
    component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('senhafraca')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna true se válido', () => {
    component.required = true;
    component.regexSenha = '^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
    expect((component as any).isCampoValido('SenhaForte123')).toBe(true);
  });

  it('isCampoObrigatorio retorna true se required e vazio', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
  });
});
