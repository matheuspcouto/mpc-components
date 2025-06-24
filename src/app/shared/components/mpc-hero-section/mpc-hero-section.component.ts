/**
 * @Componente MpcHeroSectionComponent
 * Este componente é responsável por exibir uma seção hero/capa com título e subtítulo.
 *
 * titulo {string}: Título principal da seção.
 * subtitulo {string}: (opcional) Subtítulo da seção.
 * id {string}: (opcional) ID da seção.
 * imagem {string}: imagem de fundo do hero.
 *
 * Exemplo de utilização:
 * <mpc-hero-section titulo="Redes &" subtitulo="Células" id="capa" imagem="capa"></mpc-hero-section>
 *
 * @author Matheus Pimentel Do Couto
 * @created 23/06/2025
 * @updated 23/06/2025
 */

import { Component, Input } from '@angular/core';

// TODO: Adicionar Pagina e exibição
@Component({
  selector: 'mpc-hero-section',
  imports: [],
  templateUrl: './mpc-hero-section.component.html',
  styleUrl: './mpc-hero-section.component.css'
})
export class MpcHeroSectionComponent {

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
