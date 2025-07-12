import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import ContatoComponent from './contato.component';
import { InscricaoService } from '../service/inscricao.service';
import { provideHttpClient } from '@angular/common/http';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { Router } from '@angular/router';

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;
  let mockInscricaoService: any;
  let mockFormBuilder: any;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      isContatoCompleto: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    };

    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        telefone: new FormControl(''),
        email: new FormControl(''),
        rua: new FormControl(''),
        numero: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        cep: new FormControl(''),
        complemento: new FormControl('')
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ContatoComponent],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        provideHttpClient(),
        MpcErrorService,
        { provide: Router, useValue: { navigate: jest.fn() } } // Mock do Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário corretamente', () => {
    expect(component['form'].value).toEqual({
      telefone: '', email: '', rua: '', numero: '', bairro: '', cidade: '', estado: '', cep: '', complemento: ''
    });
  });

  it('deve preencher o formulário quando contato está completo', () => {
    const dadosMock = { telefone: '11999999999', email: 'teste@teste.com', rua: 'Rua Teste', numero: '123', bairro: 'Bairro Teste', cidade: 'Cidade Teste', estado: 'SP', cep: '12345678', complemento: 'Complemento Teste' };
    mockInscricaoService.isContatoCompleto.mockReturnValue(true);
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    component['atualizarForm']();
    expect(component['form'].value).toEqual(dadosMock);
  });

  it('deve chamar atualizarForm no ngOnInit', () => {
    const spy = jest.spyOn(component as any, 'atualizarForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em atualizarForm', () => {
    mockInscricaoService.isContatoCompleto.mockImplementation(() => { throw new Error('Erro teste'); });
    const errorService = (component as any).errorService;
    const spy = jest.spyOn(errorService, 'construirErro');
    component['atualizarForm']();
    expect(spy).toHaveBeenCalled();
  });

  it('deve mostrar erro se tentar avançar com formulário inválido', () => {
    component['form'].patchValue({ telefone: '' });
    component['proximaEtapa']();
  });

  it('deve avançar para próxima etapa se formulário for válido', () => {
    component['form'].patchValue({ telefone: '11999999999', email: 'test@test.com', rua: 'Rua Teste', bairro: 'Bairro Teste', cidade: 'Cidade Teste', estado: 'SP', cep: '12345678', numero: '123' });
    component['proximaEtapa']();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve atualizar dados e navegar para etapa anterior', () => {
    const formValue = { telefone: '11999999999' };
    component['form'].patchValue(formValue);
    component['etapaAnterior']();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve preencher campos de endereço com dados do CEP', () => {
    const endereco: any = { rua: 'Rua do CEP', bairro: 'Bairro do CEP', cidade: 'Cidade do CEP', estado: 'RJ', cep: '87654321' };
    component['definirEnderecoPorCep'](endereco);
    expect(component['form'].value.rua).toBe(endereco.rua);
    expect(component['form'].value.bairro).toBe(endereco.bairro);
    expect(component['form'].value.cidade).toBe(endereco.cidade);
    expect(component['form'].value.estado).toBe(endereco.estado);
    expect(component['form'].value.cep).toBe(endereco.cep);
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em proximaEtapa', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ telefone: '11999999999', email: 'test@test.com', rua: 'Rua Teste', bairro: 'Bairro Teste', cidade: 'Cidade Teste', estado: 'SP', cep: '12345678', numero: '123' });
    const errorService = (component as any).errorService;
    const spy = jest.spyOn(errorService, 'construirErro');
    component['proximaEtapa']();
    expect(spy).toHaveBeenCalled();
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em etapaAnterior', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ telefone: '11999999999' });
    const errorService = (component as any).errorService;
    const spy = jest.spyOn(errorService, 'construirErro');
    component['etapaAnterior']();
    expect(spy).toHaveBeenCalled();
  });
});
