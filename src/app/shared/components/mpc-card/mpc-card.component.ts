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
 *
 * Exemplo de utilização:
 * <mpc-card titulo="Título do Card" subtitulo="Subtítulo do Card" descricao="Descrição do Card" imagem="imagem.jpg" [links]="[{url: 'https://www.example.com', icone: 'bi bi-link'}]" tamanhoCard="MD"></mpc-card>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AccessibilityInputs } from '../../core/accessibility-inputs';

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
export class MpcCardComponent extends AccessibilityInputs {

  titulo = input.required<string>();
  subtitulo = input<string>('');
  descricao = input<string>('');
  imagem = input.required<string>();
  links = input<CardLinks[]>([]);
  tamanhoCard = input<string>(TamanhoCards.get('MD')!);

  getImagemCard(): string {
    return this.imagem ? `img/${this.imagem()}` : 'img/no-image.jpg';
  }

  getTamanhoCard(): string {
    return TamanhoCards.get(this.tamanhoCard()) || TamanhoCards.get('MD')!;
  }
}
