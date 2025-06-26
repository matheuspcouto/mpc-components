/**
 * @Componente McpCardComponent
 * Este componente é responsável por exibir um card com título, subtitulo, descrição, imagem e links.
 *
 * titulo {string}: Título do card.
 * subtitulo {string}: (opcional) Subtítulo do card.
 * descricao {string}: (opcional) Descrição do card.
 * imagem {string}: Imagem do card.
 * links {CardLinks[]}: (opcional) Links do card.
 * layout {string}: (opcional) Layout do card.
 *
 * Exemplo de utilização:
 * <mpc-card layout="vertical" titulo="Título do Card" subtitulo="Subtítulo do Card" descricao="Descrição do Card" imagem="imagem.jpg" [links]="[{url: 'https://www.example.com', icone: 'bi bi-link'}]" tamanhoCard="MD"></mpc-card>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 24/06/2025
 */

import { Component, Input } from '@angular/core';

export interface CardLinks {
  url: string;
  icone: string;
}

// TODO: Ajustar altura do card
@Component({
  selector: 'mpc-card',
  imports: [],
  templateUrl: './mpc-card.component.html',
  styleUrl: './mpc-card.component.css'
})
export class MpcCardComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() descricaoUm: string = '';
  @Input() descricaoDois: string = '';
  @Input() imagem?: string = '';
  @Input() links: CardLinks[] = [];
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  protected getImagemCard(): string {
    return this.imagem ? `${this.imagem}` : 'no-image.jpg';
  }

  protected isVertical(): boolean {
    return this.layout === 'vertical';
  }

  protected isHorizontal(): boolean {
    return this.layout === 'horizontal';
  }
}
