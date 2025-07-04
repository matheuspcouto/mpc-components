/**
 * @Componente MpcLoaderComponent
 * Este componente é responsável por exibir um loader na tela.
 *
 * Exemplo de utilização:
 * <mpc-loader></mpc-loader>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component } from '@angular/core';
import { MpcLoaderService } from './mpc-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mpc-loader',
  imports: [ CommonModule ],
  templateUrl: './mpc-loader.component.html',
  styleUrls: ['./mpc-loader.component.css']
})
export class MpcLoaderComponent {

  /**
   * Injeta o serviço de loader para controle de exibição.
   * @param loaderService Serviço de controle do loader
   */
  constructor(public loaderService: MpcLoaderService) { }

}
