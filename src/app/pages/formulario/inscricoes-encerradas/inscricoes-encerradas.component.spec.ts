import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscricoesEncerradasComponent } from './inscricoes-encerradas.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';

describe('InscricoesEncerradasComponent', () => {
  let component: InscricoesEncerradasComponent;
  let fixture: ComponentFixture<InscricoesEncerradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscricoesEncerradasComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InscricoesEncerradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Inicialização do Componente', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });
  });
});
