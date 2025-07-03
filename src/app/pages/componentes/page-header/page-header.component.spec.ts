import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderComponent } from './page-header.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcPageHeaderComponent } from '../../../shared/components/mpc-page-header/mpc-page-header.component';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPageHeaderComponent, MpcNavbarComponent, MpcFooterComponent],
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

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
}); 