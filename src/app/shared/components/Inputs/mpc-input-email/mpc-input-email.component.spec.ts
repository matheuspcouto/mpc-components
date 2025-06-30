import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputEmailComponent } from './mpc-input-email.component';

describe('MpcInputEmailComponent', () => {
  let component: MpcInputEmailComponent;
  let fixture: ComponentFixture<MpcInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputEmailComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve formatar valor de e-mail', () => {
    component.value = 'teste@email.com';
    expect(component.valorFormatado).toBeDefined();
  });

  it('deve marcar campo como tocado ao focar', () => {
    component['onFocus']();
    expect((component as any)['campoTocado']).toBe(true);
  });

  it('deve emitir valor válido ao setar e-mail', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: 'teste@email.com' } });
    expect(component.valor.emit).toHaveBeenCalledWith('teste@email.com');
  });

  it('não deve emitir valor inválido', () => {
    jest.spyOn(component.valor, 'emit');
    component.required = true;
    component['setValue']({ target: { value: '' } });
    expect(component.valor.emit).not.toHaveBeenCalled();
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

  it('isCampoValido retorna false se regex inválido', () => {
    jest.spyOn(component as any, 'isEmailInvalido').mockReturnValue(true);
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('email-invalido')).toBe(false);
    expect(component.error.emit).toHaveBeenCalled();
  });

  it('isCampoValido retorna true se válido', () => {
    expect((component as any).isCampoValido('teste@email.com')).toBe(true);
  });

  it('isCampoObrigatorio retorna true se required e vazio', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
  });

  it('isCampoObrigatorio retorna false se preenchido', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('a')).toBe(false);
  });
});
