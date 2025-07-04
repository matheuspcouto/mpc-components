import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcButtonDocComponent } from './mpc-button-doc.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Global mock for window.alert
Object.defineProperty(window, 'alert', {
  writable: true,
  value: jest.fn(),
});

describe('MpcButtonDocComponent', () => {
  let component: MpcButtonDocComponent;
  let fixture: ComponentFixture<MpcButtonDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcButtonDocComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpcButtonDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('alerta deve exibir mensagem', () => {
    const alertSpy = jest.spyOn(window, 'alert');
    component.alert('Mensagem de teste');
    expect(alertSpy).toHaveBeenCalledWith('Mensagem de teste');
  });
});
