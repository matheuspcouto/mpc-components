import { MpcHttpLoaderInterceptor } from './mpc-http-loader.interceptor';
import { MpcLoaderService } from 'mpc-lib-angular';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

describe('MpcHttpLoaderInterceptor', () => {
  let interceptor: MpcHttpLoaderInterceptor;
  let loaderService: jest.Mocked<MpcLoaderService>;
  let next: HttpHandler;
  let request: HttpRequest<any>;

  beforeEach(() => {
    loaderService = {
      show: jest.fn(),
      hide: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        MpcHttpLoaderInterceptor,
        { provide: MpcLoaderService, useValue: loaderService }
      ]
    });
    interceptor = TestBed.inject(MpcHttpLoaderInterceptor);
    next = {
      handle: jest.fn()
    } as any;
    request = { url: '/teste', method: 'GET' } as HttpRequest<any>;
  });

  it('deve exibir o loader antes da requisição', () => {
    (next.handle as jest.Mock).mockReturnValue(of({} as HttpEvent<any>));
    interceptor.intercept(request, next).subscribe();
    expect(loaderService.show).toHaveBeenCalledTimes(1);
    expect(next.handle).toHaveBeenCalledWith(request);
  });

  it('deve ocultar o loader após a resposta (sucesso)', fakeAsync(() => {
    (next.handle as jest.Mock).mockReturnValue(of({} as HttpEvent<any>));
    interceptor.intercept(request, next).subscribe();
    tick();
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  }));

  it('deve ocultar o loader mesmo em caso de erro', fakeAsync(() => {
    (next.handle as jest.Mock).mockReturnValue(throwError(() => new Error('Erro de teste')));
    interceptor.intercept(request, next).subscribe({
      error: () => {
        // erro esperado
      }
    });
    tick();
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  }));

  it('deve chamar next.handle com a requisição recebida', () => {
    (next.handle as jest.Mock).mockReturnValue(of({} as HttpEvent<any>));
    interceptor.intercept(request, next).subscribe();
    expect(next.handle).toHaveBeenCalledWith(request);
  });
}); 