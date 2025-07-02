import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesquisaComponent } from './pesquisa.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InscricaoService } from '../service/inscricao.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from 'express';
import { of, throwError } from 'rxjs';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('PesquisaComponent', () => {
  let component: PesquisaComponent;
  let fixture: ComponentFixture<PesquisaComponent>;
  let mockInscricaoService: any;
  let mockToastr: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockInscricaoService = {
      detalharInscricao: jest.fn(),
      atualizarDadosInscricao: jest.fn()
    };
    mockToastr = { success: jest.fn(), error: jest.fn() };
    mockRouter = { navigate: jest.fn() };
    mockActivatedRoute = { params: of({ id: '123' }) };
    await TestBed.configureTestingModule({
      imports: [PesquisaComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: InscricaoService, useValue: mockInscricaoService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve pesquisar e navegar em caso de sucesso', () => {
    component['form'].setValue({ pesquisa: '123' });

    mockInscricaoService.detalharInscricao.mockReturnValue({
      pipe: () => ({
        subscribe: ({ next, error }: any) => next(of({ id: 1 }))
      })
    });

    component['pesquisar']();

    expect(mockInscricaoService.detalharInscricao).toHaveBeenCalledWith('123');
    expect(mockInscricaoService.atualizarDadosInscricao).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalled();
  });

  it('deve exibir erro se não encontrar inscrição', () => {
    component['form'].setValue({ pesquisa: '000' });
    mockInscricaoService.detalharInscricao.mockReturnValueOnce(throwError(() => new Error('erro')));
    component['pesquisar']();
    expect(mockToastr.error).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('deve inicializar o formulário corretamente', () => {
    expect(component['form'].value).toEqual({ pesquisa: '' });
  });
}); 