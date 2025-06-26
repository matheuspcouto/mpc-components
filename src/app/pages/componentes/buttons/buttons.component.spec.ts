import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsComponent } from './buttons.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Global mock for window.alert
Object.defineProperty(window, 'alert', {
  writable: true,
  value: jest.fn(),
});

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsComponent],
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
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('alerta deve exibir mensagem', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.alert('Mensagem de teste');
    expect(alertSpy).toHaveBeenCalledWith('Mensagem de teste');
  });
});
