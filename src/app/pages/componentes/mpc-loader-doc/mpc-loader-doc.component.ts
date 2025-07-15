import { Component, inject } from '@angular/core';
import { MpcLoaderService, MpcButtonComponent, MpcSectionComponent } from 'mpc-lib-angular';

/**
 * @Componente MpcLoaderDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de loader da biblioteca MPC,
 * demonstrando como exibir e ocultar o loader programaticamente.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-loaders></app-loaders>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-loaders',
  imports: [MpcSectionComponent, MpcButtonComponent],
  templateUrl: './mpc-loader-doc.component.html',
  styleUrl: './mpc-loader-doc.component.css'
})
export class MpcLoaderDocComponent {

  private readonly mpcLoaderService = inject(MpcLoaderService);

  /**
   * Exibe o loader por 5 segundos.
   */
  abrirLoading() {
    this.mpcLoaderService.show();
    setTimeout(() => this.mpcLoaderService.hide(), 5000);
  }

}
