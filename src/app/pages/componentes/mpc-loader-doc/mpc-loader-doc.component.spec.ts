import { MpcLoaderDocComponent } from './mpc-loader-doc.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MpcLoaderDocComponent', () => {
  let component: MpcLoaderDocComponent;
  let fixture: ComponentFixture<MpcLoaderDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcLoaderDocComponent],
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

    fixture = TestBed.createComponent(MpcLoaderDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o loading', () => {
    component.abrirLoading();
    expect(component['mpcLoaderService'].isLoading()).toBeTruthy();
  });
});
