/**
 * @Componente MpcLoaderComponent
 * Este componente é responsável por exibir um loader na tela.
 * 
 * @Propriedades
 * - Utiliza signals para reatividade
 * - Controlado via MpcLoaderService
 *
 * @Exemplo de utilização:
 * <mpc-loader id="loader-exemplo" />
 *
 * Para controlar o loader:
 * - this.loaderService.show() - Exibe o loader
 * - this.loaderService.hide() - Oculta o loader
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, inject } from '@angular/core';
import { MpcLoaderService } from './mpc-loader.service';

@Component({
  selector: 'mpc-loader',
  templateUrl: './mpc-loader.component.html',
  styleUrls: ['./mpc-loader.component.css']
})
export class MpcLoaderComponent {

  /**
   * Injeta o serviço de loader para controle de exibição.
   * @param loaderService Serviço de controle do loader
   */
  protected readonly loaderService = inject(MpcLoaderService);
}
