/**
 * @Componente MpcPageHeaderComponent
 * Este componente é responsável por exibir o cabeçalho de página.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-page-header',
  imports: [],
  templateUrl: './mpc-page-header.component.html',
  styleUrl: './mpc-page-header.component.css'
})
export class MpcPageHeaderComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() imagem: string = '';

  getBackgroundImage(): string {
    return `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${this.imagem})`;
  }
}
