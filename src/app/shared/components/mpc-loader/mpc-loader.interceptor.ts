import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MpcLoaderService } from './mpc-loader.service';

@Injectable()
export class MpcLoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: MpcLoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show(); // Show the loader before making the request

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide(); // Hide the loader after the response is received
      })
    );
  }
}
