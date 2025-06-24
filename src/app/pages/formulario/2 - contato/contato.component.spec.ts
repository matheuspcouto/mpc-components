import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import ContatoComponent from './contato.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Endereco } from '../../../shared/components/Inputs/mpc-input-pesquisa-cep/mpc-input-pesquisa-cep.component';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;
  let mockInscricaoService: jest.Mocked<InscricaoService>;
  let mockToastrService: jest.Mocked<ToastrService>;
  let mockModalErro: jest.Mocked<MpcModalComponent>;
  let mockFormBuilder: jest.Mocked<NonNullableFormBuilder>;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      isContatoCompleto: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    } as any;

    mockToastrService = {
      error: jest.fn()
    } as any;

    mockModalErro = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    } as any;

    // Mock do FormBuilder
    mockFormBuilder = {
      group: jest.fn().mockReturnValue(new FormGroup({
        telefone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        rua: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        bairro: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        estado: new FormControl('', Validators.required),
        cep: new FormControl('', Validators.required),
        complemento: new FormControl('')
      })),
      control: jest.fn(),
      array: jest.fn(),
      record: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ContatoComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: NonNullableFormBuilder, useValue: mockFormBuilder },
        provideNgxMask(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    component['modalErro'] = mockModalErro;
  });

  describe('inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar o formulário com campos vazios', () => {
      expect(component['form'].value).toEqual({
        telefone: '',
        email: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
      });
    });

    it('deve chamar atualizarForm no ngOnInit', () => {
      const spy = jest.spyOn(component as any, 'atualizarForm');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('atualizarForm', () => {
    it('deve preencher o formulário quando contato está completo', () => {
      const dadosMock = {
        telefone: '11999999999',
        email: 'teste@teste.com',
        rua: 'Rua Teste',
        numero: '123',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'SP',
        cep: '12345678',
        complemento: 'Complemento Teste'
      };

      mockInscricaoService.isContatoCompleto.mockReturnValue(true);
      mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);

      component['atualizarForm']();

      expect(component['form'].value).toEqual(dadosMock);
    });

    it('deve preencher o formulário quando contato está completo', () => {
      mockInscricaoService.isContatoCompleto.mockReturnValue(false);

      component['atualizarForm']();

      expect(mockInscricaoService.getDadosInscricao).toHaveBeenCalled();
    });

    it('deve abrir modal de erro quando ocorre exceção', () => {
      mockInscricaoService.isContatoCompleto.mockImplementation(() => {
        throw new Error('Erro teste');
      });

      const spy = jest.spyOn(component as any, 'abrirModalErro');
      component['atualizarForm']();

      expect(spy).toHaveBeenCalledWith('Erro', 'Não foi possível carregar os dados da inscrição');
    });
  });

  describe('proximaEtapa', () => {
    it('deve mostrar erro quando formulário é inválido', () => {
      component['form'].patchValue({ telefone: '' }); // formulário inválido

      component['proximaEtapa']();

      expect(mockToastrService.error).toHaveBeenCalledWith('Preencha todos os campos obrigatórios corretamente!');
    });

    it('deve navegar para próxima etapa quando formulário é válido', () => {
      // Preenchendo formulário válido
      component['form'].patchValue({
        telefone: '11999999999',
        email: 'test@test.com',
        rua: 'Rua Teste',
        bairro: 'Bairro Teste',
        cidade: 'Cidade Teste',
        estado: 'SP',
        cep: '12345678',
        numero: '123',
      });

      component['proximaEtapa']();

      expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
    });
  });

  describe('etapaAnterior', () => {
    it('deve atualizar dados e navegar para etapa anterior', () => {
      const formValue = { telefone: '11999999999' };
      component['form'].patchValue(formValue);

      component['etapaAnterior']();

      expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
    });
  });

  describe('abrirModalErro', () => {
    it('deve configurar e abrir modal de erro', () => {
      const titulo = 'Título Teste';
      const texto = 'Texto Teste';

      component['abrirModalErro'](titulo, texto);

      expect(mockModalErro.abrirModal).toHaveBeenCalled();
    });

    it('deve fechar modal quando botão é clicado', () => {
      component['abrirModalErro']('Teste', 'Teste');

      const configModal = mockModalErro.abrirModal.mock.calls[0][0];
      if (configModal && configModal.botao) {
        configModal.botao();
      }

      expect(mockModalErro.fecharModal).toHaveBeenCalled();
    });
  });

  describe('definirEnderecoPorCep', () => {
    it('deve preencher campos de endereço com dados do CEP', () => {
      const endereco: Endereco = {
        rua: 'Rua do CEP',
        bairro: 'Bairro do CEP',
        cidade: 'Cidade do CEP',
        estado: 'RJ',
        cep: '87654321'
      };

      component['definirEnderecoPorCep'](endereco);

      expect(component['form'].value.rua).toBe(endereco.rua);
      expect(component['form'].value.bairro).toBe(endereco.bairro);
      expect(component['form'].value.cidade).toBe(endereco.cidade);
      expect(component['form'].value.estado).toBe(endereco.estado);
      expect(component['form'].value.cep).toBe(endereco.cep);
    });
  });
});
