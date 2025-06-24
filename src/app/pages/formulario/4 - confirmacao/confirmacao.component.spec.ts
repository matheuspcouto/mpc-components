import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ConfirmacaoComponent } from './confirmacao.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcComprovanteComponent } from '../../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { Inscricao } from '../model/inscricao.model';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { ToastrService } from 'ngx-toastr';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let mockInscricaoService: jest.Mocked<InscricaoService>;
  let mockModalErro: jest.Mocked<MpcModalComponent>;
  let mockModalSucesso: jest.Mocked<MpcModalComponent>;
  let mockComprovanteExemplo: jest.Mocked<MpcComprovanteComponent>;
  let mockToastService: jest.Mocked<ToastrService>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;

  beforeEach(async () => {

    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      inscrever: jest.fn()
    } as any;

    mockModalErro = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    } as any;

    mockModalSucesso = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    } as any;

    mockComprovanteExemplo = {
      abrirComprovante: jest.fn()
    } as any;

    mockToastService = {
      success: jest.fn()
    } as any;

    mockActivatedRoute = {
      snapshot: {
        queryParams: {
          inscricao: '123456789'
        }
      }
    } as any;

    await TestBed.configureTestingModule({
      imports: [ConfirmacaoComponent, RouterTestingModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    component['modalErro'] = mockModalErro;
    component['modalSucesso'] = mockModalSucesso;
    component['comprovanteExemplo'] = mockComprovanteExemplo;
  });

  describe('inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar dados da inscrição no ngOnInit', () => {
      const dadosMock = {
        nome: 'João',
        sobrenome: 'Silva',
        dataNasc: '1990-01-01',
        sexo: 'M',
        estadoCivil: 'Solteiro',
        idade: 33,
        cpfCnpj: '12345678901',
        telefone: '11999999999',
        email: 'joao@teste.com',
        endereco: 'Rua Teste, 123',
        formaPagamento: 'Cartão',
        valor: 105.00
      };

      mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);

      component.ngOnInit();

      expect(mockInscricaoService.getDadosInscricao).toHaveBeenCalled();
      expect(component['dadosInscricao']).toBeInstanceOf(Inscricao);
    });
  });

  describe('formatarValor', () => {
    it('deve formatar valor para moeda brasileira', () => {
      const resultado = component['formatarValor'](100.50);
      expect(resultado.length).toBeGreaterThan(0);
    });
  });

  describe('getSexo', () => {
    it('deve retornar Masculino para sexo M', () => {
      component['dadosInscricao'].sexo = 'M';
      const resultado = component['getSexo']();
      expect(resultado).toBe('Masculino');
    });

    it('deve retornar Feminino para sexo F', () => {
      component['dadosInscricao'].sexo = 'F';
      const resultado = component['getSexo']();
      expect(resultado).toBe('Feminino');
    });
  });

  describe('inscrever', () => {
    it('deve abrir modal de sucesso quando inscrição é realizada com sucesso', () => {
      mockInscricaoService.inscrever.mockReturnValue(of({ sucesso: true }));
      const spy = jest.spyOn(component as any, 'abrirModalSucesso');

      component['inscrever']();

      expect(mockInscricaoService.inscrever).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('deve abrir modal de erro quando inscrição falha', () => {
      const erro = 'Erro no servidor';
      mockInscricaoService.inscrever.mockReturnValue(throwError(() => erro));
      const spy = jest.spyOn(component as any, 'abrirModalErro');

      component['inscrever']();

      expect(spy).toHaveBeenCalledWith(
        'Não foi possível realizar a inscrição, tente novamente mais tarde.',
        erro
      );
    });
  });

  describe('abrirModalSucesso', () => {
    it('deve configurar e abrir modal de sucesso', () => {
      component['abrirModalSucesso']();

      expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
      const configModal = mockModalSucesso.abrirModal.mock.calls[0][0];
      expect(configModal.titulo).toBe('Inscrição realizada com sucesso');
      expect(configModal.textoBotao).toBe('Abrir comprovante');
      expect(configModal.textoSegundoBotao).toBe('Fechar');
    });

    it('deve executar função do botão principal', () => {
      const spy = jest.spyOn(component as any, 'abrirModalComprovante');
      component['abrirModalSucesso']();

      const configModal = mockModalSucesso.abrirModal.mock.calls[0][0];
      if (configModal && configModal.botao) {
        configModal.botao();
      }

      expect(spy).toHaveBeenCalled();
    });

    it('deve executar função do segundo botão', () => {
      component['abrirModalSucesso']();

      const configModal = mockModalSucesso.abrirModal.mock.calls[0][0];
      if (configModal && configModal.segundoBotao) {
        configModal.segundoBotao();
      }

      expect(mockModalSucesso.fecharModal).toHaveBeenCalled();
    });
  });

  describe('abrirModalComprovante', () => {
    beforeEach(() => {
      component['dadosInscricao'].nome = 'João Silva';
      component['dadosInscricao'].dataNasc = '01/01/1990';
      component['dadosInscricao'].idade = 33;
      component['dadosInscricao'].cpfCnpj = '123.456.789-01';
      component['dadosInscricao'].sexo = 'M';
      component['dadosInscricao'].estadoCivil = 'Solteiro';
      component['dadosInscricao'].telefone = '(11) 99999-9999';
      component['dadosInscricao'].email = 'joao@teste.com';
      component['dadosInscricao'].endereco = 'Rua Teste, 123';
      component['dadosInscricao'].formaPagamento = 'Cartão';
      component['dadosInscricao'].valor = 105.00;
    });

    it('deve fechar modal de sucesso e configurar dados do comprovante', () => {
      component['abrirModalComprovante']();

      expect(mockModalSucesso.fecharModal).toHaveBeenCalled();
      expect(component['dadosComprovante'].titulo).toBe('Comprovante de inscrição');
      expect(component['dadosComprovante'].dados.dadosInscricao.codigoInscricao).toBe('123456');
      expect(component['dadosComprovante'].dados.dadosInscricao.status).toBe('ATIVO');
    });

    it('deve configurar dados pessoais no comprovante', () => {
      component['abrirModalComprovante']();

      const dadosPessoais = component['dadosComprovante'].dados.dadosPessoais;
      expect(dadosPessoais.length).toBe(9);
      expect(dadosPessoais[0]).toEqual({ label: 'Nome', valor: 'João Silva' });
      expect(dadosPessoais[4]).toEqual({ label: 'Sexo', valor: 'Masculino' });
    });

    it('deve configurar dados de pagamento no comprovante', () => {
      component['abrirModalComprovante']();

      const dadosPagamento = component['dadosComprovante'].dados.dadosPagamento;
      expect(dadosPagamento.formaPagamento).toBe('Cartão');
      expect(dadosPagamento.valor).toBe(105.00);
      expect(dadosPagamento.statusPagamento).toBe('A PAGAR');
    });

    it('deve abrir comprovante', () => {
      component['abrirModalComprovante']();
      expect(mockComprovanteExemplo.abrirComprovante).toHaveBeenCalled();
    });

    it('deve lidar com dados vazios ou undefined', () => {
      component['dadosInscricao'] = new Inscricao();
      component['abrirModalComprovante']();

      const dadosPessoais = component['dadosComprovante'].dados.dadosPessoais;
      expect(dadosPessoais[0].valor).toBe('');
    });
  });

  describe('abrirModalErro', () => {
    it('deve configurar e abrir modal de erro', () => {
      const titulo = 'Erro Teste';
      const texto = 'Mensagem de erro';

      component['abrirModalErro'](titulo, texto);

      expect(mockModalErro.abrirModal).toHaveBeenCalled();
      const configModal = mockModalErro.abrirModal.mock.calls[0][0];
      expect(configModal.titulo).toBe(titulo);
      expect(configModal.texto).toBe(texto);
      expect(configModal.textoBotao).toBe('OK');
    });

    it('deve executar função do botão de erro', () => {
      component['abrirModalErro']('Teste', 'Teste');

      const configModal = mockModalErro.abrirModal.mock.calls[0][0];
      if (configModal && configModal.botao) {
        configModal.botao();
      }

      expect(mockModalErro.fecharModal).toHaveBeenCalled();
    });
  });
});
