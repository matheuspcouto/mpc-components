import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaErroComponent } from './pagina-erro.component';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';

describe('PaginaErroComponent', () => {
  let component: PaginaErroComponent;
  let fixture: ComponentFixture<PaginaErroComponent>;
  let mockMpcErrorService: any;

  beforeEach(async () => {
    mockMpcErrorService = { construirErro: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [PaginaErroComponent],
      providers: [
        { provide: MpcErrorService, useValue: mockMpcErrorService }
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
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve simular erro genérico', () => {
    component.simularErroGenerico();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve simular erro de validação', () => {
    component.simularErroValidacao();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });

  it('deve simular erro com imagem personalizada', () => {
    component.simularErroComImagem();
    expect(mockMpcErrorService.construirErro).toHaveBeenCalled();
  });
}); 