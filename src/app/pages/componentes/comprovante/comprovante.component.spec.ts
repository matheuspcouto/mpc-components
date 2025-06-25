import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprovanteComponent } from './comprovante.component';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ComprovanteComponent', () => {
  let component: ComprovanteComponent;
  let fixture: ComponentFixture<ComprovanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ComprovanteComponent,
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
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComprovanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal de comprovante', () => {
    component.abrirModalComprovante();
    expect(component.dadosComprovante).toBeDefined();
  });
});
