import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MpcInputBuscaCepComponent } from './mpc-input-busca-cep.component';

describe('MpcInputBuscaCepComponent', () => {
  let component: MpcInputBuscaCepComponent;
  let fixture: ComponentFixture<MpcInputBuscaCepComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputBuscaCepComponent, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputBuscaCepComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir valor ao pesquisar CEP válido', () => {
    jest.spyOn(component.valor, 'emit');
    component['setValue']({ target: { value: '12345678' } });
    const req = httpMock.expectOne('https://viacep.com.br/ws/12345678/json/');
    req.flush({
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      localidade: 'Cidade Teste',
      estado: 'SP',
      cep: '12345678'
    });
    expect(component.valor.emit).toHaveBeenCalledWith({
      rua: 'Rua Teste',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'SP',
      cep: '12345678'
    });
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

  it('deve emitir erro se CEP inválido', () => {
    jest.spyOn(component.error, 'emit');
    component['setValue']({ target: { value: '123' } });
    expect(component.error.emit).toHaveBeenCalledWith({ pattern: true });
  });

  it('deve exibir mensagem de erro obrigatória no template', () => {
    component.required = true;
    component['campoTocado'] = true;
    component['isCampoValido']('');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('O campo CEP é obrigatório');
  });

  it('deve exibir mensagem de erro de padrão no template', () => {
    component['campoTocado'] = true;
    component['isCampoValido']('123');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.text-danger')?.textContent).toContain('O campo CEP deve conter 8 dígitos númericos');
  });

  it('isCepInvalido retorna true se valor undefined', () => {
    expect(component['isCepInvalido'](undefined)).toBe(true);
  });

  it('isCepInvalido retorna true se valor não bate regex', () => {
    expect(component['isCepInvalido']('abc')).toBe(true);
  });

  it('isCepInvalido retorna false se valor bate regex', () => {
    expect(component['isCepInvalido']('12345-678')).toBe(false);
  });

  it('isCepInvalido retorna false se valor bate regex sem hífen', () => {
    expect(component['isCepInvalido']('12345678')).toBe(false);
  });

  it('isCampoObrigatorio retorna false se required for false', () => {
    component.required = false;
    expect(component['isCampoObrigatorio']('')).toBe(false);
  });

  it('isCampoObrigatorio retorna true se required for true e valor vazio', () => {
    component.required = true;
    expect(component['isCampoObrigatorio']('')).toBe(true);
  });

  it('isCampoObrigatorio retorna false se required é true e valor não for vazio', () => {
    component.required = true;
    expect(component['isCampoObrigatorio']('abc')).toBe(false);
  });

  it('pequisarCep não faz nada se cep for undefined', () => {
    expect(component['pequisarCep'](undefined)).toBeUndefined();
  });

  it('pequisarCep define errorMessage se response.erro', () => {
    component['pequisarCep']('99999999');
    const req = httpMock.expectOne('https://viacep.com.br/ws/99999999/json/');
    req.flush({ erro: true });
    expect(component['errorMessage']).toBe('CEP não encontrado');
  });

  it('pequisarCep define errorMessage se erro na requisição', () => {
    component['pequisarCep']('88888888');
    const req = httpMock.expectOne('https://viacep.com.br/ws/88888888/json/');
    req.error(new ProgressEvent('erro'));
    expect(component['errorMessage']).toBe('CEP não encontrado');
  });

  it('valorFormatado deve chamar o pipe', () => {
    component.value = '12345678';
    expect(component.valorFormatado).toBe('12345-678');
  });
});
