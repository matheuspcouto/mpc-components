import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MpcInputPesquisaCepComponent, Endereco } from './mpc-input-pesquisa-cep.component';

describe('MpcInputPesquisaCepComponent', () => {
  let component: MpcInputPesquisaCepComponent;
  let fixture: ComponentFixture<MpcInputPesquisaCepComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcInputPesquisaCepComponent, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputPesquisaCepComponent);
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
});
