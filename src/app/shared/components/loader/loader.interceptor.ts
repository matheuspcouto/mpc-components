import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if (typeof window !== 'undefined') {
      return window
    }
    return new Window();
  }
});

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  window = inject(WINDOW);

  constructor(public loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader(); // Show the loader before making the request

    return next.handle(request).pipe(
      finalize(() => {
        this.window.scrollTo(0, 0);
        this.loaderService.hideLoader(); // Hide the loader after the response is received
      })
    );
  }
}
