import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModaisComponent } from './modais.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('ModaisComponent', () => {
  let component: ModaisComponent;
  let fixture: ComponentFixture<ModaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModaisComponent,
        MpcNavbarComponent,
        MpcModalComponent,
        MpcButtonComponent,
        ToastrModule.forRoot()
      ],
      providers: [
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

    fixture = TestBed.createComponent(ModaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal de confirmação', () => {
    const abrirModalConfirmacaoSpy = jest.spyOn(component, 'abrirModalConfirmacao');
    component.abrirModalConfirmacao();
    expect(abrirModalConfirmacaoSpy).toHaveBeenCalled();
  });

  it('deve abrir o modal de sucesso', () => {
    const abrirModalSucessoSpy = jest.spyOn(component, 'abrirModalSucesso');
    component.abrirModalSucesso();
    expect(abrirModalSucessoSpy).toHaveBeenCalled();
  });

  it('deve abrir o modal de alerta', () => {
    const abrirModalAlertaSpy = jest.spyOn(component, 'abrirModalAlerta');
    component.abrirModalAlerta();
    expect(abrirModalAlertaSpy).toHaveBeenCalled();
  });

  it('deve abrir o modal de erro', () => {
    const abrirModalErroSpy = jest.spyOn(component, 'abrirModalErro');
    component.abrirModalErro();
    expect(abrirModalErroSpy).toHaveBeenCalled();
  });

  it('deve fechar o modal', () => {
    const fecharModalSpy = jest.spyOn(component.modalExemplo, 'fecharModal');
    component.modalExemplo.fecharModal();
    expect(fecharModalSpy).toHaveBeenCalled();
  });
});
