import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcPageHeaderDocComponent } from './mpc-page-header-doc.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcPageHeaderComponent } from '../../../shared/components/mpc-page-header/mpc-page-header.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


describe('MpcPageHeaderDocComponent', () => {
  let component: MpcPageHeaderDocComponent;
  let fixture: ComponentFixture<MpcPageHeaderDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPageHeaderDocComponent, MpcNavbarComponent, MpcPageHeaderComponent, MpcFooterComponent],
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