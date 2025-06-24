import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { NonNullableFormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import DadosPessoaisComponent from './dados-pessoais.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideNgxMask } from 'ngx-mask';

describe('DadosPessoaisComponent', () => {
  let component: DadosPessoaisComponent;
  let fixture: ComponentFixture<DadosPessoaisComponent>;
  let mockInscricaoService: jest.Mocked<InscricaoService>;
  let mockToastrService: jest.Mocked<ToastrService>;
  let mockModalComponent: jest.Mocked<MpcModalComponent>;
  let mockFormBuilder: jest.Mocked<NonNullableFormBuilder>;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      isDadosPessoaisCompletos: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    } as any;

    mockToastrService = {
      error: jest.fn()
    } as any;

    mockModalComponent = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    } as any;

    // Mock do FormBuilder
    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        nome: new FormControl('', Validators.required),
        sobrenome: new FormControl('', Validators.required),
        dataNasc: new FormControl('', Validators.required),
        sexo: new FormControl('', Validators.required),
        estadoCivil: new FormControl('', Validators.required),
        idade: new FormControl(0, Validators.min(1)),
        cpfCnpj: new FormControl('', Validators.required),
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [DadosPessoaisComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        provideNgxMask()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DadosPessoaisComponent);
    component = fixture.componentInstance;
    component['modalErro'] = mockModalComponent;
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar com data atual formatada', () => {
      const dataEsperada = new Date().toISOString().split('T')[0];

      component.ngOnInit();

      expect(component['dataAtual']).toBe(dataEsperada);
    });

    it('deve inicializar opções de estado civil', () => {
      expect(component['estadosCivis'].length).toBe(5);
      expect(component['estadosCivis'][0]).toEqual({
        label: 'Solteiro(a)',
        value: 'Solteiro(a)',
        selected: false
      });
    });

    it('deve inicializar opções de sexo', () => {
      expect(component['sexos'].length).toBe(2);
      expect(component['sexos'][0]).toEqual({
        label: 'Masculino',
        value: 'M',
        checked: false
      });
    });

    it('deve inicializar formulário com validadores', () => {
      expect(mockFormBuilder.group).toHaveBeenCalled();
      expect(component['form'].get('nome')?.hasError('required')).toBe(true);
      expect(component['form'].get('sobrenome')?.hasError('required')).toBe(true);
      expect(component['form'].get('dataNasc')?.hasError('required')).toBe(true);
      expect(component['form'].get('sexo')?.hasError('required')).toBe(true);
      expect(component['form'].get('estadoCivil')?.hasError('required')).toBe(true);
      expect(component['form'].get('cpfCnpj')?.hasError('required')).toBe(true);
    });
  });

  describe('atualizarForm', () => {
    it('deve atualizar formulário quando dados pessoais estão completos', () => {
      const dadosMock = {
        nome: 'João',
        sobrenome: 'Silva',
        dataNasc: '1990-01-01',
        idade: 33,
        cpfCnpj: '123.456.789-00',
        sexo: 'M',
        estadoCivil: 'Solteiro(a)'
      };

      mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);

      component.ngOnInit();

      expect(component['form'].get('nome')?.value).toBe('João');
      expect(component['form'].get('sobrenome')?.value).toBe('Silva');
      expect(component['form'].get('dataNasc')?.value).toBe('1990-01-01');
      expect(component['form'].get('idade')?.value).toBe(33);
      expect(component['form'].get('cpfCnpj')?.value).toBe('123.456.789-00');
    });

    it('deve marcar sexo correto quando dados estão completos', () => {
      const dadosMock = { sexo: 'F' };
      mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);

      component.ngOnInit();

      expect(component['sexos'][1].checked).toBe(true);
      expect(component['form'].get('sexo')?.value).toBe('F');
    });

    it('deve marcar estado civil correto quando dados estão completos', () => {
      const dadosMock = { estadoCivil: 'Casado(a)' };
      mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(true);
      mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);

      component.ngOnInit();

      expect(component['estadosCivis'][1].selected).toBe(true);
      expect(component['form'].get('estadoCivil')?.value).toBe('Casado(a)');
    });

    it('deve abrir modal de erro quando ocorre exceção', () => {
      mockInscricaoService.isDadosPessoaisCompletos.mockImplementation(() => {
        throw new Error('Erro teste');
      });

      component.ngOnInit();

      expect(mockModalComponent.abrirModal).toHaveBeenCalled();
    });

    it('não deve atualizar formulário quando dados pessoais não estão completos', () => {
      mockInscricaoService.isDadosPessoaisCompletos.mockReturnValue(false);

      component.ngOnInit();

      expect(component['form'].get('nome')?.value).toBe('');
    });
  });

  describe('proximaEtapa', () => {
    it('deve mostrar erro quando formulário é inválido', () => {
      component['proximaEtapa']();

      expect(mockToastrService.error).toHaveBeenCalledWith(
        'Preencha todos os campos obrigatórios corretamente!'
      );
      expect(mockInscricaoService.atualizarDadosInscricao).not.toHaveBeenCalled();
    });

    it('deve navegar para próxima etapa quando formulário é válido', () => {
      // Preencher formulário com dados válidos
      component['form'].patchValue({
        nome: 'João',
        sobrenome: 'Silva',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro(a)',
        idade: 33,
        cpfCnpj: '123.456.789-00'
      });

      // Marcar o formulário como válido
      Object.keys(component['form'].controls).forEach(key => {
        component['form'].get(key)?.markAsTouched();
        component['form'].get(key)?.updateValueAndValidity();
      });

      // Mock para retornar válido
      jest.spyOn(component['form'], 'valid', 'get').mockReturnValue(true);

      component['proximaEtapa']();

      expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalledWith(
        component['form'].value,
        2
      );
      expect(mockToastrService.error).not.toHaveBeenCalled();
    });
  });

  describe('formatarData', () => {
    it('deve formatar data corretamente', () => {
      const dataFormatada = component['formatarData']('2023-12-25');

      expect(dataFormatada).toBe('2023-12-25');
    });

    it('deve retornar data original quando formato é inválido', () => {
      const dataInvalida = '25/12/2023';
      const dataFormatada = component['formatarData'](dataInvalida);

      expect(dataFormatada).toBe(dataInvalida);
    });

    it('deve retornar data original quando não tem 3 partes', () => {
      const dataIncompleta = '2023-12';
      const dataFormatada = component['formatarData'](dataIncompleta);

      expect(dataFormatada).toBe(dataIncompleta);
    });
  });

  describe('abrirModalErro', () => {
    it('deve abrir modal com configuração de erro', () => {
      const titulo = 'Título Teste';
      const texto = 'Texto Teste';

      component['abrirModalErro'](titulo, texto);

      expect(mockModalComponent.abrirModal).toHaveBeenCalled();
    });

    it('deve configurar botão para fechar modal', () => {
      component['abrirModalErro']('Título', 'Texto');

      const configModal = mockModalComponent.abrirModal.mock.calls[0][0];

      if (configModal.botao) {
         configModal.botao();
      }

      expect(mockModalComponent.fecharModal).toHaveBeenCalled();
    });
  });

  describe('Propriedades protegidas', () => {
    it('deve ter dataAtual inicializada', () => {
      expect(component['dataAtual']).toBeDefined();
    });

    it('deve ter estadosCivis com todas as opções', () => {
      const estadosEsperados = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'Separado(a)'];
      const estadosAtuais = component['estadosCivis'].map(e => e.value);

      expect(estadosAtuais).toEqual(estadosEsperados);
    });

    it('deve ter sexos com opções masculino e feminino', () => {
      expect(component['sexos']).toEqual([
        { label: 'Masculino', value: 'M', checked: false },
        { label: 'Feminino', value: 'F', checked: false }
      ]);
    });

    it('deve ter formulário inicializado', () => {
      expect(component['form']).toBeDefined();
      expect(component['form'].get('nome')).toBeDefined();
      expect(component['form'].get('sobrenome')).toBeDefined();
      expect(component['form'].get('dataNasc')).toBeDefined();
      expect(component['form'].get('sexo')).toBeDefined();
      expect(component['form'].get('estadoCivil')).toBeDefined();
      expect(component['form'].get('idade')).toBeDefined();
      expect(component['form'].get('cpfCnpj')).toBeDefined();
    });
  });
});
