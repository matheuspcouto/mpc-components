import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcButtonComponent } from './mpc-button.component';

describe('MpcButtonComponent', () => {
  let component: MpcButtonComponent;
  let fixture: ComponentFixture<MpcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcButtonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MpcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o texto passado via input', () => {
    component.texto = 'Salvar';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Salvar');
  });
}); 