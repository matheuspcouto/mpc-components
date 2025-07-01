import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcInputPesquisaComponent } from './mpc-input-pesquisa.component';
import { ValidationErrors } from '@angular/forms';

describe('MpcInputPesquisaComponent', () => {
  let component: MpcInputPesquisaComponent;
  let fixture: ComponentFixture<MpcInputPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputPesquisaComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar minLength corretamente', () => {
    component.min = '5';
    expect(component.minLength).toBe(5);
    component.min = undefined;
    expect(component.minLength).toBe(0);
  });

  it('deve chamar acaoPesquisa se definida', () => {
    const spy = jest.fn();
    component.acaoPesquisa = spy;
    (component as any).pesquisar();
    expect(spy).toHaveBeenCalled();
  });

  it('não deve chamar acaoPesquisa se não definida', () => {
    component.acaoPesquisa = undefined;
    expect(() => (component as any).pesquisar()).not.toThrow();
  });

  it('deve marcar campo como tocado e validar ao focar', () => {
    jest.spyOn(component as any, 'isCampoValido').mockReturnValue(true);
    (component as any).onFocus();
    expect(component['campoTocado']).toBeTruthy();
    expect((component as any).isCampoValido).toHaveBeenCalledWith(component.value);
  });

  it('deve limpar a pesquisa', () => {
    component.value = 'teste';
    (component as any).limparPesquisa();
    expect(component.value).toBe('');
  });

  it('deve validar campo como válido se readonly ou disabled', () => {
    component.readonly = true;
    expect((component as any).isCampoValido('abc')).toBeTruthy();
    component.readonly = false;
    component.disabled = true;
    expect((component as any).isCampoValido('abc')).toBeTruthy();
  });

  it('deve emitir erro e definir mensagem se valor menor que mínimo e campo tocado', () => {
    component.min = '3';
    component['campoTocado'] = true;
    jest.spyOn(component.error, 'emit');
    expect((component as any).isCampoValido('a')).toBeFalsy();
    expect(component.error.emit).toHaveBeenCalledWith({ min: true });
    expect(component['errorMessage']).toContain('no mínimo');
  });

  it('deve considerar válido se valor não for menor que mínimo', () => {
    component.min = '2';
    component['campoTocado'] = true;
    expect((component as any).isCampoValido('abc')).toBeTruthy();
    expect(component['errorMessage']).toBeUndefined();
  });

  it('isMenorQueValorMinimo deve retornar false se min não definido ou undefined', () => {
    component.min = '0';
    expect((component as any).isMenorQueValorMinimo('abc')).toBeFalsy();
    component.min = undefined;
    expect((component as any).isMenorQueValorMinimo('abc')).toBeFalsy();
  });

  it('isMenorQueValorMinimo deve retornar true se valor for vazio', () => {
    component.min = '2';
    expect((component as any).isMenorQueValorMinimo('')).toBeTruthy();
    expect((component as any).isMenorQueValorMinimo(undefined)).toBeTruthy();
  });

  it('isMenorQueValorMinimo deve comparar corretamente o tamanho', () => {
    component.min = '5';
    expect((component as any).isMenorQueValorMinimo('1234')).toBeTruthy();
    expect((component as any).isMenorQueValorMinimo('12345')).toBeFalsy();
  });
});
