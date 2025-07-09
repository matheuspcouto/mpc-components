import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MpcInputBuscaCepComponent } from './mpc-input-busca-cep.component';

describe('MpcInputBuscaCepComponent', () => {
  let component: MpcInputBuscaCepComponent;
  let fixture: ComponentFixture<MpcInputBuscaCepComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputBuscaCepComponent, HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputBuscaCepComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve escrever valor via writeValue', () => {
    component.writeValue('12345678');
    expect(component.value).toBe('12345678');
  });

  it('deve registrar onChange e onTouched', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.registerOnTouched(fn);
    component.onChange('abc');
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('deve validar campo obrigatório vazio', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '';
    const control = new FormControl('');
    const result = component.validate(control);
    expect(result).toEqual({ required: true });
    expect((component as any).errorMessage).toContain('obrigatório');
  });

  it('deve validar CEP inválido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '123';
    const control = new FormControl('123');
    const result = component.validate(control);
    expect(result).toEqual({ pattern: true });
    expect((component as any).errorMessage).toContain('dígitos numéricos');
  });

  it('deve aceitar CEP válido', () => {
    component.required = true;
    (component as any).campoTocado = true;
    component.value = '12345678';
    const control = new FormControl('12345678');
    const result = component.validate(control);
    expect(result).toBeNull();
    expect((component as any).errorMessage).toBeUndefined();
  });

  it('deve formatar valor corretamente', () => {
    component.value = '12345678';
    expect(component.valorFormatado).toBe('12345-678');
  });

  it('deve atualizar valor e disparar onChange/onTouched ao setValue', () => {
    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);
    (component as any).setValue({ target: { value: '12345678' } });
    expect(component.value).toBe('12345678');
    expect(onChange).toHaveBeenCalledWith('12345678');
    expect(onTouched).toHaveBeenCalled();
  });

  it('deve marcar campo como tocado ao focar', () => {
    (component as any).campoTocado = false;
    (component as any).onFocus();
    expect((component as any).campoTocado).toBeTruthy();
  });

  it('deve chamar pequisarCep ao setValue válido', () => {
    const spy = jest.spyOn(component as any, 'pequisarCep');
    component.required = true;
    component.value = '12345678';
    (component as any).campoTocado = true;
    (component as any).setValue({ target: { value: '12345678' } });
    expect(spy).toHaveBeenCalledWith('12345678');
  });

  it('não deve chamar a API se o CEP for inválido (menos de 8 dígitos)', () => {
    const spy = jest.spyOn((component as any).http, 'get');
    (component as any).pequisarCep('12345');
    expect(spy).not.toHaveBeenCalled();
  });

  it('deve setar errorMessage se response.erro for true', () => {
    (component as any).campoTocado = true;
    (component as any).pequisarCep('12345678');
    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.flush({ erro: true });
    expect((component as any).errorMessage).toBe('CEP não encontrado');
  });

  it('deve emitir endereco se response for válido', () => {
    const enderecoMock = {
      logradouro: 'Rua A',
      bairro: 'Centro',
      localidade: 'Cidade',
      estado: 'UF',
      cep: '12345-678'
    };
    const emitSpy = jest.spyOn(component.endereco, 'emit');
    (component as any).pequisarCep('12345678');
    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.flush(enderecoMock);
    expect(emitSpy).toHaveBeenCalledWith({
      rua: 'Rua A',
      bairro: 'Centro',
      cidade: 'Cidade',
      estado: 'UF',
      cep: '12345-678'
    });
  });

  it('deve setar errorMessage se ocorrer erro na requisição', () => {
    (component as any).pequisarCep('12345678');
    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.error(new ProgressEvent('erro'));
    expect((component as any).errorMessage).toBe('CEP não encontrado');
  });

  it('isCepInvalido deve retornar true para valores inválidos', () => {
    expect((component as any).isCepInvalido(undefined)).toBe(true);
    expect((component as any).isCepInvalido('')).toBe(true);
    expect((component as any).isCepInvalido('123')).toBe(true);
    expect((component as any).isCepInvalido('1234567a')).toBe(true);
  });

  it('isCepInvalido deve retornar false para CEP válido', () => {
    expect((component as any).isCepInvalido('12345678')).toBe(false);
    expect((component as any).isCepInvalido('12345-678')).toBe(false);
  });

  it('isCampoObrigatorio deve retornar true se required e vazio', () => {
    component.required = true;
    expect((component as any).isCampoObrigatorio('')).toBe(true);
    expect((component as any).isCampoObrigatorio(undefined)).toBe(true);
  });

  it('isCampoObrigatorio deve retornar false se não required ou preenchido', () => {
    component.required = false;
    expect((component as any).isCampoObrigatorio('')).toBe(false);
    component.required = true;
    expect((component as any).isCampoObrigatorio('123')).toBe(false);
  });

  it('validate deve retornar null se disabled', () => {
    component.disabled = true;
    const control = new FormControl('12345678');
    expect(component.validate(control)).toBeNull();
  });
});
