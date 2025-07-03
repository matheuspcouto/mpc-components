/**
 * @Componente MpcPageHeaderComponent
 * Este componente é responsável por exibir uma seção hero/capa com título e subtítulo.
 *
 * titulo {string}: Título principal da seção.
 * subtitulo {string}: (opcional) Subtítulo da seção.
 * id {string}: (opcional) ID da seção.
 * imagem {string}: imagem de fundo do header.
 *
 * Exemplo de utilização:
 * <mpc-page-header titulo="Redes &" subtitulo="Células" id="capa" imagem="capa"></mpc-page-header>
 *
 * @author Matheus Pimentel Do Couto
 * @created 23/06/2025
 * @updated 23/06/2025
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
