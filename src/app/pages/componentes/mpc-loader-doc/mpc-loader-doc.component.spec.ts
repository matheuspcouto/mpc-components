import { MpcLoaderDocComponent } from './mpc-loader-doc.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MpcLoaderDocComponent', () => {
  let component: MpcLoaderDocComponent;
  let fixture: ComponentFixture<MpcLoaderDocComponent>;
  let mockLoaderService: { show: jest.Mock, hide: jest.Mock };

  beforeEach(async () => {
    mockLoaderService = {
      show: jest.fn(),
      hide: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MpcLoaderDocComponent],
      providers: [
        { provide: (component as any)?.mpcLoaderService?.constructor || 'mpcLoaderService', useValue: mockLoaderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcLoaderDocComponent);
    component = fixture.componentInstance;
    // Força a injeção do mock
    (component as any).mpcLoaderService = mockLoaderService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir e fechar o loading', () => {
    jest.useFakeTimers();
    component.abrirLoading();
    expect(mockLoaderService.show).toHaveBeenCalled();
    jest.advanceTimersByTime(5000);
    expect(mockLoaderService.hide).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
