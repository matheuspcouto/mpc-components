/**
 * @Componente MpcCardComponent
 * 
 * Componente responsável por exibir cards customizáveis com layout vertical ou horizontal,
 * suportando imagens, títulos, subtítulos, descrições e links com ícones.
 *
 * @Inputs
 * @Input() imagem?: string - URL da imagem do card (opcional)
 * @Input() links: CardLinks[] - Array de links com ícones (opcional)
 * @Input() layout: 'vertical' | 'horizontal' - Layout do card (opcional, padrão: 'vertical')
 *
 * @Exemplo
 * ```html
 * <!-- Card Vertical Básico -->
 * <mpc-card [imagem]="'/assets/img/exemplo.jpg'" [layout]="'vertical'">
 *   <h3 titulo>Título customizado</h3>
 *   <h4 subtitulo>Subtítulo customizado</h4>
 *   <p descricao>Descrição customizada com <b>ng-content</b>.</p>
 * </mpc-card>
 *
 * <!-- Card Horizontal com Links e conteúdo customizado -->
 * <mpc-card
 *   [imagem]="'/assets/img/exemplo.jpg'"
 *   [layout]="'horizontal'"
 *   [links]="[
 *     { url: 'https://facebook.com', icone: 'bi bi-facebook' },
 *     { url: 'https://instagram.com', icone: 'bi bi-instagram' }
 *   ]">
 *   <div>
 *     <h3 titulo>Título customizado</h3>
 *     <h4 subtitulo>Subtítulo customizado</h4>
 *     <p>Texto customizado para o layout horizontal.</p>
 *   </div>
 * </mpc-card>
 * ```
 *
 * @Interface CardLinks
 * - url: string - URL do link
 * - icone: string - Classe do ícone (ex: 'bi bi-facebook')
 *
 * @Variáveis CSS disponíveis
 * --mpc-bg-card: Cor de fundo do card (padrão: white)
 * --mpc-border-color-card: Cor da borda do card (padrão: var(--mpc-color-primary))
 * --mpc-bg-links-card: Cor de fundo dos links (padrão: var(--mpc-color-primary))
 * --mpc-color-links-card: Cor dos links (padrão: white)
 * --mpc-color-bar-card: Cor da barra do card (padrão: var(--mpc-color-primary))
 *
 * @Métodos públicos
 * - getImagemCard(): retorna a URL da imagem ou uma imagem padrão caso não exista
 * - isVertical(): retorna true se o layout for vertical
 * - isHorizontal(): retorna true se o layout for horizontal
 * - hasLinks(): retorna true se houver links
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2024
 * @updated 10/07/2024
 */

import { Component, Input } from '@angular/core';

export interface CardLinks {
  /** URL do link */
  url: string;
  /** Classe do ícone (ex: 'bi bi-linkedin') */
  icone: string;
}

@Component({
  selector: 'mpc-card',
  imports: [],
  templateUrl: './mpc-card.component.html',
  styleUrl: './mpc-card.component.css'
})
export class MpcCardComponent {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() imagem?: string = '';
  /** Array de links com ícones */
  @Input() links: CardLinks[] = [];
  /** Layout do card: 'vertical' ou 'horizontal' */
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  // ===== MÉTODOS PÚBLICOS =====

  /**
   * Retorna a URL da imagem do card ou uma imagem padrão caso não exista.
   * @returns {string} URL da imagem
   */
  protected getImagemCard(): string {
    return this.imagem ? `${this.imagem}` : 'no-image.jpg';
  }

  /**
   * Verifica se o layout do card é vertical.
   * @returns {boolean} true se o layout for vertical
   */
  protected isVertical(): boolean {
    return this.layout === 'vertical';
  }

  /**
   * Verifica se o layout do card é horizontal.
   * @returns {boolean} true se o layout for horizontal
   */
  protected isHorizontal(): boolean {
    return this.layout === 'horizontal';
  }

  /**
   * Verifica se o card possui links.
   * @returns {boolean} true se houver links
   */
  protected hasLinks(): boolean {
    return this.links && this.links.length > 0;
  }
}
