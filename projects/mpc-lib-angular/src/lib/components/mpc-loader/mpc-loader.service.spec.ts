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
    expect(service.isLoading()).toBe(false);
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('deve ocultar o loader ao chamar hide()', () => {
    service['apiCount'] = 1;
    service['_isLoading'].set(true);
    expect(service.isLoading()).toBe(true);
    service.hide();
    expect(service.isLoading()).toBe(false);
  });

  it('deve manter o loader ativo quando há múltiplas chamadas show()', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
    service.show();
    expect(service.isLoading()).toBe(true);
    service.hide();
    expect(service.isLoading()).toBe(true);
    service.hide();
    expect(service.isLoading()).toBe(false);
  });
});
