import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ConfirmacaoComponent } from './confirmacao.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Inscricao } from '../model/inscricao.model';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { ToastrService } from 'ngx-toastr';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let mockInscricaoService: Partial<InscricaoService>;
  let mockModalSucesso: Partial<MpcModalComponent>;
  let mockToastService: Partial<ToastrService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let router: Router;

  beforeEach(async () => {
    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      inscrever: jest.fn()
    };

    mockModalSucesso = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    };

    mockToastService = {
      success: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        queryParams: {
          inscricao: '123456789'
        }
      } as any
    };

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
    // @ts-ignore
    component['modalSucesso'] = mockModalSucesso;
    router = TestBed.inject(Router);
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

      (mockInscricaoService.getDadosInscricao as jest.Mock).mockReturnValue(dadosMock);

      component.ngOnInit();

      expect(mockInscricaoService.getDadosInscricao).toHaveBeenCalled();
      expect(component['dadosInscricao']).toBeInstanceOf(Inscricao);
    });

    it('voltar para a rota anterior ao clicar no botão', () => {
      const spy = jest.spyOn(router, 'navigate');
      component['voltar']();
      expect(spy).toHaveBeenCalledWith([Rotas.PAGAMENTO]);
    });
  });

  describe('formatarValor', () => {
    it('deve formatar valor para moeda brasileira', () => {
      const resultado = (component as any)['formatarValor'](100.50);
      expect(resultado.length).toBeGreaterThan(0);
    });
  });

  describe('getSexo', () => {
    it('deve retornar Masculino para sexo M', () => {
      component['dadosInscricao'].sexo = 'M';
      const resultado = (component as any)['getSexo']();
      expect(resultado).toBe('Masculino');
    });

    it('deve retornar Feminino para sexo F', () => {
      component['dadosInscricao'].sexo = 'F';
      const resultado = (component as any)['getSexo']();
      expect(resultado).toBe('Feminino');
    });
  });

  describe('abrirModalSucesso', () => {
    it('deve configurar e abrir modal de sucesso', () => {
      (component as any)['abrirModalSucesso']();
      expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
      const configModal = (mockModalSucesso.abrirModal as jest.Mock).mock.calls[0][0];
      expect(configModal.titulo).toBe('Inscrição realizada com sucesso');
      expect(configModal.textoBotao).toBe('Abrir comprovante');
      expect(configModal.textoSegundoBotao).toBe('Fechar');
    });

    it('deve executar função do segundo botão (fechar modal)', () => {
      (component as any)['abrirModalSucesso']();
      const configModal = (mockModalSucesso.abrirModal as jest.Mock).mock.calls[0][0];
      if (configModal && configModal.segundoBotao) {
        configModal.segundoBotao();
      }
      expect(mockModalSucesso.fecharModal).toHaveBeenCalled();
    });

    it('deve executar função do botão principal (abrir comprovante)', () => {
      (component as any)['abrirModalSucesso']();
      const configModal = (mockModalSucesso.abrirModal as jest.Mock).mock.calls[0][0];
      const routerSpy = jest.spyOn(router, 'navigate');
      if (configModal && configModal.botao) {
        configModal.botao();
      }
      expect(routerSpy).toHaveBeenCalledWith([Rotas.COMPROVANTE]);
    });
  });

  describe('inscrever', () => {
    it('deve chamar inscrever com sucesso', () => {
      const inscricaoMock = new Inscricao();
      (mockInscricaoService.inscrever as jest.Mock).mockReturnValue(of(inscricaoMock));
      component['inscrever']();
      expect(mockInscricaoService.inscrever).toHaveBeenCalled();
    });

    it('deve chamar inscrever e construir erro quando inscrição falha', () => {
      const erro = 'Erro no servidor';
      (mockInscricaoService.inscrever as jest.Mock).mockReturnValue(throwError(() => erro));
      const errorServiceSpy = jest.spyOn((component as any)['errorService'], 'construirErro');
      component['inscrever']();
      expect(errorServiceSpy).toHaveBeenCalledWith(erro);
    });
  });
});
