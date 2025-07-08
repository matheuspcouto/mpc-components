import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MpcLoaderService } from 'mpc-lib-angular';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private readonly loaderService = inject(MpcLoaderService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show(); // Exibe o loader antes de fazer a requisição

    return next.handle(request).pipe( 
      finalize(() => {
        this.loaderService.hide(); // Oculta o loader após a resposta ser recebida
      })
    );
  }
}
