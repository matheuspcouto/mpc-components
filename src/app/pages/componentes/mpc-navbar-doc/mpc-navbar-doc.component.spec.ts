import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcNavbarDocComponent } from './mpc-navbar-doc.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MpcNavbarDocComponent', () => {
  let component: MpcNavbarDocComponent;
  let fixture: ComponentFixture<MpcNavbarDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcNavbarDocComponent],
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

    fixture = TestBed.createComponent(MpcNavbarDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
