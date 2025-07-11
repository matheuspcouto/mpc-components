import { MpcInputsDocComponent } from './mpc-inputs-doc.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('MpcInputDocComponent', () => {
  let component: MpcInputsDocComponent;
  let fixture: ComponentFixture<MpcInputsDocComponent>;
  let mockFormBuilder: any;

  beforeEach(async () => {
    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        nome: new FormControl(''),
        sobrenome: new FormControl(''),
        dataNasc: new FormControl(''),
        sexo: new FormControl(''),
        estadoCivil: new FormControl(''),
        idade: new FormControl(0),
        cpfCnpj: new FormControl(''),
        descricao: new FormControl(''),
        cep: new FormControl(''),
        rua: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        telefone: new FormControl(''),
        email: new FormControl(''),
        senha: new FormControl(''),
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MpcInputsDocComponent],
      providers: [
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              params: {},
              queryParams: {},
              data: {}
            }
          }
        },
        provideHttpClient(),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcInputsDocComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir minDate corretamente', () => {
    expect(component['minDate']).toBe('1900-01-01');
  });

  it('deve definir maxDate como a data de hoje', () => {
    const hoje = new Date().toISOString().split('T')[0];
    expect(component['maxDate']).toBe(hoje);
  });

  it('deve inicializar estadosCivis corretamente', () => {
    expect(component['estadosCivis'].length).toBe(5);
    expect(component['estadosCivis'][0].label).toBe('Solteiro(a)');
  });

  it('deve inicializar sexos corretamente', () => {
    expect(component['sexos'].length).toBe(2);
    expect(component['sexos'][0].label).toBe('Masculino');
  });

  it('deve inicializar o formulário corretamente', () => {
    expect(component['form']).toBeDefined();
    expect(component['form'].get('idade')?.value).toBe(0);
  });

  it('deve preencher campos de endereço com dados do CEP', () => {
    const endereco = { rua: 'Rua do CEP', bairro: 'Bairro do CEP', cidade: 'Cidade do CEP', estado: 'RJ', cep: '87654321' };
    component['definirEnderecoPorCep'](endereco);
    expect(component['form'].value.rua).toBe(endereco.rua);
    expect(component['form'].value.bairro).toBe(endereco.bairro);
    expect(component['form'].value.cidade).toBe(endereco.cidade);
    expect(component['form'].value.estado).toBe(endereco.estado);
    expect(component['form'].value.cep).toBe(endereco.cep);
  });
}); 