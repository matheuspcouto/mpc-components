import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscricoesEncerradasComponent } from './inscricoes-encerradas.component';

describe('InscricoesEncerradasComponent', () => {
  let component: InscricoesEncerradasComponent;
  let fixture: ComponentFixture<InscricoesEncerradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscricoesEncerradasComponent]
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
