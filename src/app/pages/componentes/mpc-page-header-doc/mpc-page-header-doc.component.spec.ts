import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcPageHeaderDocComponent } from './mpc-page-header-doc.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


describe('MpcPageHeaderDocComponent', () => {
  let component: MpcPageHeaderDocComponent;
  let fixture: ComponentFixture<MpcPageHeaderDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPageHeaderDocComponent],
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

    fixture = TestBed.createComponent(MpcPageHeaderDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 