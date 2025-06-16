/**
 * @Componente McpCardVerticalComponent
 * Este componente é responsável por exibir um card com título, subtitulo, descrição, imagem e links.
 *
 * titulo {string}: Título do card.
 * subtitulo {string}: (opcional) Subtítulo do card.
 * descricao {string}: (opcional) Descrição do card.
 * imagem {string}: Imagem do card.
 * links {CardLinks[]}: (opcional) Links do card.
 * tamanhoCard {string}: (opcional) Tamanho do card. Valores possíveis: 'XS', 'SM', 'MD', 'LG', 'XL', 'XXL'.
 *
 * Exemplo de utilização:
 * <mpc-card-vertical titulo="Título do Card" subtitulo="Subtítulo do Card" descricao="Descrição do Card" imagem="imagem.jpg" [links]="[{url: 'https://www.example.com', icone: 'bi bi-link'}]" tamanhoCard="MD"></mpc-card-vertical>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface CardLinks {
  url: string;
  icone: string;
}

const TamanhoCards = new Map<string, string>([
  ['XS', 'card-xs'],
  ['SM', 'card-sm'],
  ['MD', 'card-md'],
  ['LG', 'card-lg'],
  ['XL', 'card-xl'],
  ['XXL', 'card-xxl']
]);


@Component({
  selector: 'mpc-card-vertical',
  imports: [CommonModule],
  templateUrl: './mpc-card-vertical.component.html',
  styleUrl: './mpc-card-vertical.component.css'
})
export class MpcCardVerticalComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() descricao: string = '';
  @Input() imagem: string = '';
  @Input() links: CardLinks[] = [];
  @Input() tamanhoCard: string = 'MD';

  getImagemCard(): string {
    return this.imagem ? `${this.imagem}` : 'no-image.jpg';
  }

  getTamanhoCard(): string {
    return TamanhoCards.get(this.tamanhoCard) || TamanhoCards.get('MD')!;
  }
}
