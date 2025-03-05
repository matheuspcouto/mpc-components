/**
 * @Componente McpCardComponent
 * Este componente é responsável por exibir um card com título, subtitulo, descrição, imagem e links.
 *
 * titulo {string}: Título do card.
 * subtitulo {string}: (opcional) Subtítulo do card.
 * descricao {string}: (opcional) Descrição do card.
 * imagem {string}: Imagem do card.
 * links {CardLinks[]}: (opcional) Links do card.
 * tamanhoCard {string}: (opcional) Tamanho do card. Valores possíveis: 'XS', 'SM', 'MD', 'LG', 'XL', 'XXL'.
 * tabIndex {number}: (opcional) Índice de tabulação do card.
 * ariaLabel {string}: (opcional) Rótulo de acessibilidade do card.
 *
 * Exemplo de utilização:
 * <mpc-card titulo="Título do card" subtitulo="Subtítulo do card" descricao="Descrição do card" imagem="imagem.jpg" [links]="[]" tamanhoCard="MD"></mpc-card>
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
  selector: 'mpc-card',
  imports: [CommonModule],
  templateUrl: './mpc-card.component.html',
  styleUrl: './mpc-card.component.css'
})
export class MpcCardComponent {
  @Input() titulo: string = '';
  @Input() subtitulo?: string = '';
  @Input() descricao?: string = '';
  @Input() imagem: string = '';
  @Input() links?: CardLinks[] = [];
  @Input() tamanhoCard: string = TamanhoCards.get('MD')!;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = '';

  getImagemCard(): string {
    return this.imagem ? `img/${this.imagem}` : 'img/no-image.jpg';
  }

  getTamanhoCard(): string {
    return TamanhoCards.get(this.tamanhoCard) || TamanhoCards.get('MD')!;
  }
}
