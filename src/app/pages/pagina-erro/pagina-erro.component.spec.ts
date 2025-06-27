import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaErroComponent } from './pagina-erro.component';
import { ErrorService } from '../../shared/error/error.service';
import { Rotas } from '../../shared/enums/rotas-enum';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PaginaErroComponent', () => {
  let component: PaginaErroComponent;
  let fixture: ComponentFixture<PaginaErroComponent>;
  let mockErrorService: any;

  beforeEach(async () => {
    mockErrorService = {
      construirErro: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PaginaErroComponent],
      providers: [
        { provide: ErrorService, useValue: mockErrorService },
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
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve simular erro detalhado', () => {
    component.simularErroDetalhado();
    expect(mockErrorService.construirErro).toHaveBeenCalledWith(
      { error: { message: 'Erro de conexão com o servidor', status: 500 } },
      Rotas.PAGINA_ERRO
    );
  });

  it('deve simular erro genérico', () => {
    component.simularErroGenerico();
    expect(mockErrorService.construirErro).toHaveBeenCalledWith(null, Rotas.PAGINA_ERRO);
  });

  it('deve simular erro de validação', () => {
    component.simularErroValidacao();
    expect(mockErrorService.construirErro).toHaveBeenCalledWith(
      { error: { message: 'Dados inválidos fornecidos', status: 400 } },
      Rotas.PAGINA_ERRO
    );
  });

  it('deve simular erro com imagem personalizada', () => {
    component.simularErroComImagem();
    expect(mockErrorService.construirErro).toHaveBeenCalledWith(
      { error: { message: 'Erro com imagem personalizada', status: 404 } },
      Rotas.PAGINA_ERRO,
      'assets/img/modal/atencao.png'
    );
  });
}); 