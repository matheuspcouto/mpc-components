import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MpcNavbarComponent } from './mpc-navbar.component';

describe('MpcNavbarComponent', () => {
  let component: MpcNavbarComponent;
  let fixture: ComponentFixture<MpcNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcNavbarComponent],
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
    fixture = TestBed.createComponent(MpcNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
