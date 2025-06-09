
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardMenuComponent } from './mpc-card-menu.component';

describe('MpcCardMenuComponent', () => {
  let component: MpcCardMenuComponent;
  let fixture: ComponentFixture<MpcCardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MpcCardMenuComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcCardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter valores padrão', () => {
    expect(component.titulo).toBe('');
    expect(component.descricao).toBe('');
    expect(component.icone).toBe('');
    expect(component.acao).toBeUndefined();
  });

  it('deve chamar a função de clique quando o botão é clicado', () => {
    const spy = jest.spyOn(component, 'onClick');
    const button = fixture.nativeElement.querySelector('div');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
