import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputEmailComponent } from './mpc-input-email.component';
import { ValidationErrors } from '@angular/forms';

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

  it('deve emitir erro se campo obrigatório estiver vazio', () => {
    component.required = true;
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).campoTocado = true;
    (component as any).isCampoValido('');
    expect(spy).toHaveBeenCalledWith({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve emitir erro se e-mail for inválido', () => {
    const spy = jest.spyOn(component.error, 'emit');
    (component as any).campoTocado = true;
    (component as any).isCampoValido('email-invalido');
    expect(spy).toHaveBeenCalledWith({ pattern: true });
    expect((component as any).errorMessage).toContain('não está em um formato válido');
  });

  it('deve aceitar campo válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    expect((component as any).isCampoValido('teste@teste.com')).toBe(true);
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
    component.required = true;
    (component as any).setValue({ target: { value: 'teste@teste.com' } });
    expect(spy).toHaveBeenCalledWith('teste@teste.com');
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBe(true);
  });

  it('deve formatar valor corretamente', () => {
    component.value = 'TESTE@TESTE.COM';
    expect(component.valorFormatado).toBe('teste@teste.com');
  });

  it('deve chamar isCampoValido no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'isCampoValido');
    component.value = 'teste@teste.com';
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('teste@teste.com');
  });

  it('deve validar isEmailInvalido corretamente', () => {
    expect((component as any).isEmailInvalido('teste@teste.com')).toBe(false);
    expect((component as any).isEmailInvalido('email-invalido')).toBe(true);
    expect((component as any).isEmailInvalido('')).toBe(true);
    expect((component as any).isEmailInvalido(undefined)).toBe(true);
  });

  it('deve validar isCampoObrigatorio corretamente', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
    expect((component as any).isCampoObrigatorio(undefined)).toBe(true);
    expect((component as any).isCampoObrigatorio('valor')).toBe(false);
    component.required = false;
    expect((component as any).isCampoObrigatorio('')).toBe(false);
  });
});
