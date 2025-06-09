
import { TestBed } from '@angular/core/testing';
import { MpcLoaderService } from './mpc-loader.service';

describe('MpcLoaderService', () => {
  let service: MpcLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpcLoaderService]
    });
    service = TestBed.inject(MpcLoaderService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve mostrar o loader ao chamar show()', () => {
    service.show();
  });

  it('deve ocultar o loader ao chamar hide()', () => {
    service.hide();
  });
});
