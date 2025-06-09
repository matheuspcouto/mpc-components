import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModaisComponent } from './modais.component';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

describe('ModaisComponent', () => {
  let component: ModaisComponent;
  let fixture: ComponentFixture<ModaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ModaisComponent,
        MpcNavbarComponent,
        MpcModalComponent,
        MpcButtonComponent,
        ToastrModule.forRoot()
      ],
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

    fixture = TestBed.createComponent(ModaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
