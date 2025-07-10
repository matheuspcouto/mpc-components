/**
 * @Service MpcLoaderService
 * Serviço responsável por controlar a exibição do loader global da aplicação.
 * 
 * @Propriedades
 * - Utiliza signals para reatividade
 * - Controlado via MpcLoaderService
 *
 * @Exemplo
 * Para controlar o loader:
 * - this.loaderService.show() - Exibe o loader
 * - this.loaderService.hide() - Oculta o loader
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MpcLoaderService {
  private apiCount = 0;
  private _isLoading = signal<boolean>(false);

  /**
   * Signal público somente leitura para controle de exibição do loader.
   * Pode ser usado diretamente em templates: loaderService.isLoading()
   */
  readonly isLoading = this._isLoading.asReadonly();

  /**
   * Exibe o loader na tela.
   * Se já estiver ativo, incrementa o contador interno.
   */
  show() {
    if (this.apiCount === 0) {
      this._isLoading.set(true);
    }
    this.apiCount++;
  }

  /**
   * Oculta o loader da tela.
   * Só oculta quando o contador interno chegar a zero.
   */
  hide() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this._isLoading.set(false);
    }
  }
}
