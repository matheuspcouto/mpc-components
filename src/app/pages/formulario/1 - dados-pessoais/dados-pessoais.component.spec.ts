import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonNullableFormBuilder, FormControl, FormGroup } from '@angular/forms';
import DadosPessoaisComponent from './dados-pessoais.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';

describe('DadosPessoaisComponent', () => {
  let component: DadosPessoaisComponent;
  let fixture: ComponentFixture<DadosPessoaisComponent>;
  let mockInscricaoService: any;
  let mockFormBuilder: any;
  let mockErrorService: any;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      isDadosPessoaisCompletos: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    };

    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        nome: new FormControl(''),
        sobrenome: new FormControl(''),
        dataNasc: new FormControl(''),
        sexo: new FormControl(''),
        estadoCivil: new FormControl(''),
        idade: new FormControl(0),
        cpfCnpj: new FormControl(''),
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    };

    mockErrorService = { construirErro: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [DadosPessoaisComponent],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        { provide: MpcErrorService, useValue: mockErrorService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DadosPessoaisComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar corretamente o formulário e opções', () => {
    component.ngOnInit();
    expect(component['dataAtual']).toBeDefined();
    expect(component['estadosCivis'].length).toBeGreaterThan(0);
    expect(component['sexos'].length).toBeGreaterThan(0);
    expect(mockFormBuilder.group).toHaveBeenCalled();
  });

  it('deve preencher formulário com dados pessoais completos', () => {
    const dadosMock = { nome: 'João', sobrenome: 'Silva', dataNasc: '1990-01-01', idade: 33, cpfCnpj: '123.456.789-00', sexo: 'M', estadoCivil: 'Solteiro(a)' };
    mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    component.ngOnInit();
    expect(component['form'].get('nome')?.value).toBe('João');
    expect(component['form'].get('cpfCnpj')?.value).toBe('123.456.789-00');
  });

  it('não deve preencher formulário se dados pessoais não estão completos', () => {
    mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);
    component.ngOnInit();
    expect(component['form'].get('nome')?.value).toBe('');
  });

  it('deve avançar para próxima etapa se formulário for válido', () => {
    component['form'].patchValue({ nome: 'João', sobrenome: 'Silva', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro(a)', idade: 33, cpfCnpj: '123.456.789-00' });
    Object.keys(component['form'].controls).forEach(key => {
      component['form'].get(key)?.markAsTouched();
      component['form'].get(key)?.updateValueAndValidity();
    });
    jest.spyOn(component['form'], 'valid', 'get').mockReturnValue(true);
    component['proximaEtapa']();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
  });

  it('deve formatar data corretamente', () => {
    expect(component['formatarData']('2023-12-25')).toBe('2023-12-25');
    expect(component['formatarData']('25/12/2023')).toBe('25/12/2023');
    expect(component['formatarData']('2023-12')).toBe('2023-12');
  });

  it('deve tratar erro ao chamar proximaEtapa', () => {
    mockInscricaoService.atualizarDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    component['form'].patchValue({ nome: 'João', sobrenome: 'Silva', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro(a)', idade: 33, cpfCnpj: '123.456.789-00' });
    jest.spyOn(component['form'], 'valid', 'get').mockReturnValue(true);
    component['proximaEtapa']();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve tratar erro ao chamar atualizarForm', () => {
    mockInscricaoService.getDadosInscricao.mockImplementation(() => { throw new Error('Erro simulado'); });
    mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
    component['atualizarForm']();
    expect(mockErrorService.construirErro).toHaveBeenCalled();
  });
});
