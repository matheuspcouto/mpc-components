import { ComponentFixture, TestBed } from '@angular/core/testing';
import AguardeComponent from './aguarde.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AguardeComponent', () => {
  let component: AguardeComponent;
  let fixture: ComponentFixture<AguardeComponent>;

  beforeEach(async () => {
    // Mock do window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true
    });

    await TestBed.configureTestingModule({
      imports: [AguardeComponent],
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
    fixture = TestBed.createComponent(AguardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('AfterViewInit', () => {
    const spy = jest.spyOn(window, 'scrollTo');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith(0, 0);
  });
});
