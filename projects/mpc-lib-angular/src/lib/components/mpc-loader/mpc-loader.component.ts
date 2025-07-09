/**
 * @Componente MpcLoaderComponent
 * Este componente é responsável por exibir um loader na tela.
 * 
 * Características:
 * - Componente standalone (não requer CommonModule)
 * - Utiliza signals para reatividade
 * - Controlado via MpcLoaderService
 * - Permite customização de cores via inputs
 *
 * Exemplo de utilização:
 * <mpc-loader></mpc-loader>
 * 
 * Exemplo com customização de cores:
 * <mpc-loader backgroundColor="#f5f5f5" color="#007bff"></mpc-loader>
 *
 * Para controlar o loader:
 * - this.loaderService.show() - Exibe o loader
 * - this.loaderService.hide() - Oculta o loader
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, inject, Input } from '@angular/core';
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

  /**
   * Cor de fundo do loader.
   * @default string vazio (usa cor padrão do CSS)
   * @example "#f5f5f5", "rgba(0,0,0,0.5)", "transparent"
   */
  @Input() backgroundColor: string = '';

  /**
   * Cor do spinner do loader.
   * @default string vazio (usa cor padrão do CSS)
   * @example "#007bff", "#28a745", "#dc3545"
   */
  @Input() color: string = '';

}
