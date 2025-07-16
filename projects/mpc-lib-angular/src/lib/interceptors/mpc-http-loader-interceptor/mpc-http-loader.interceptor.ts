/**
 * @Interceptor MpcHttpLoaderInterceptor
 *
 * Interceptor responsável por exibir e ocultar um loader global durante requisições HTTP.
 * Utilizado para melhorar a experiência do usuário durante operações assíncronas.
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MpcLoaderService } from '../../components/mpc-loader/mpc-loader.service';

@Injectable()
export class MpcHttpLoaderInterceptor implements HttpInterceptor {
  /**
   * Serviço responsável por exibir e ocultar o loader global.
   * @type {MpcLoaderService}
   * @private
   */
  private readonly loaderService = inject(MpcLoaderService);

  /**
   * Intercepta requisições HTTP para exibir e ocultar o loader global.
   * Exibe o loader antes de enviar a requisição e o oculta ao finalizar (sucesso ou erro).
   *
   * @param {HttpRequest<any>} request Requisição HTTP interceptada
   * @param {HttpHandler} next Próximo manipulador da cadeia de interceptação
   * @returns {Observable<HttpEvent<any>>} Observable do evento HTTP
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show(); // Exibe o loader antes de fazer a requisição

    return next.handle(request).pipe( 
      finalize(() => {
        this.loaderService.hide(); // Oculta o loader após a resposta ser recebida
      })
    );
  }
}
