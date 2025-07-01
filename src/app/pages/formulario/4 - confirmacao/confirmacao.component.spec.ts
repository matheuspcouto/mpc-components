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
import { ErrorService } from '../../../shared/error/error.service';

describe('ConfirmacaoComponent', () => {
  let component: ConfirmacaoComponent;
  let fixture: ComponentFixture<ConfirmacaoComponent>;
  let mockInscricaoService: any;
  let mockModalSucesso: any;
  let mockToastService: any;
  let mockActivatedRoute: any;
  let router: Router;
  let mockErrorService: any;

  beforeEach(async () => {
    mockInscricaoService = {
      getDadosInscricao: jest.fn(),
      inscrever: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    };
    mockModalSucesso = {
      abrirModal: jest.fn(),
      fecharModal: jest.fn()
    };
    mockToastService = { success: jest.fn() };
    mockActivatedRoute = {
      snapshot: { queryParams: { inscricao: '123456789' } }
    };
    mockErrorService = { construirErro: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [ConfirmacaoComponent, RouterTestingModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ErrorService, useValue: mockErrorService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmacaoComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component['modalSucesso'] = mockModalSucesso;
    router = TestBed.inject(Router);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar dados da inscrição no ngOnInit', () => {
    const dadosMock = { nome: 'João', sobrenome: 'Silva', dataNasc: '1990-01-01', sexo: 'M', estadoCivil: 'Solteiro', idade: 33, cpfCnpj: '12345678901', telefone: '11999999999', email: 'joao@teste.com', endereco: 'Rua Teste, 123', formaPagamento: 'Cartão', valor: 105.00 };
    mockInscricaoService.getDadosInscricao.mockReturnValue(dadosMock);
    component.ngOnInit();
    expect(mockInscricaoService.getDadosInscricao).toHaveBeenCalled();
    expect(component['dadosInscricao']).toBeInstanceOf(Inscricao);
  });

  it('deve voltar para a rota anterior ao chamar etapaAnterior', () => {
    const spy = jest.spyOn(router, 'navigate');
    component['etapaAnterior']();
    expect(spy).toHaveBeenCalledWith([Rotas.PAGAMENTO]);
  });

  it('deve formatar valor para moeda brasileira', () => {
    expect((component as any)['formatarValor'](100.50).length).toBeGreaterThan(0);
  });

  it('deve retornar Masculino/Feminino corretamente', () => {
    component['dadosInscricao'] = { sexo: 'M' } as any;
    expect((component as any)['getSexo']()).toBe('Masculino');
    component['dadosInscricao'] = { sexo: 'F' } as any;
    expect((component as any)['getSexo']()).toBe('Feminino');
  });

  it('deve abrir modal de sucesso e executar ações dos botões', () => {
    (component as any)['abrirModalSucesso']();
    expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
    const configModal = mockModalSucesso.abrirModal.mock.calls[0][0];
    expect(configModal.titulo).toBe('Inscrição realizada com sucesso');
    expect(configModal.textoBotao).toBe('Abrir comprovante');
    expect(configModal.textoSegundoBotao).toBe('Fechar');
    if (configModal.segundoBotao) configModal.segundoBotao();
    expect(mockModalSucesso.fecharModal).toHaveBeenCalled();
    const routerSpy = jest.spyOn(router, 'navigate');
    if (configModal.botao) configModal.botao();
    expect(routerSpy).toHaveBeenCalledWith([Rotas.COMPROVANTE]);
  });

  it('deve chamar inscrever com sucesso', () => {
    const inscricaoMock = new Inscricao();
    mockInscricaoService.inscrever.mockReturnValue(of(inscricaoMock));
    component['inscrever']();
    expect(mockInscricaoService.inscrever).toHaveBeenCalled();
    expect(mockModalSucesso.abrirModal).toHaveBeenCalled();
  });

  it('deve chamar inscrever e construir erro quando inscrição falha', () => {
    const erro = 'Erro no servidor';
    mockInscricaoService.inscrever = jest.fn().mockReturnValue({
      subscribe: ({ next, error }: any) => error(erro)
    });
    const errorServiceSpy = jest.spyOn((component as any)['errorService'], 'construirErro');
    component['inscrever']();
    expect(errorServiceSpy).toHaveBeenCalledWith(erro);
  });

  it('deve chamar ErrorService.construirErro quando ocorre exceção em etapaAnterior', () => {
    const error = new Error('Erro simulado');
    jest.spyOn(router, 'navigate').mockImplementation(() => { throw error; });
    const errorServiceSpy = jest.spyOn((component as any)['errorService'], 'construirErro');
    component['etapaAnterior']();
    expect(errorServiceSpy).toHaveBeenCalledWith(error);
  });

  it('deve chamar atualizarDadosInscricao ao inscrever com sucesso', () => {
    const inscricaoMock = new Inscricao();
    mockInscricaoService.inscrever.mockReturnValue(of(inscricaoMock));
    component['inscrever']();
    expect(mockInscricaoService.inscrever).toHaveBeenCalled();
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalledWith(inscricaoMock, 5);
  });
});
