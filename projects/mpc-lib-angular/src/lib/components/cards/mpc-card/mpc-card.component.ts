/**
 * @Componente MpcCardComponent
 * 
 * Componente responsável por exibir cards customizáveis com layout vertical ou horizontal,
 * suportando imagens, títulos, subtítulos, descrições e links com ícones.
 *
 * @Inputs
 * @Input() imagem?: string - URL da imagem do card (opcional)
 * @Input() links: CardLinks[] - Array de links com ícones (opcional)
 * @Input() layout: 'vertical' | 'horizontal' | 'dinamico' - Layout do card (opcional, padrão: 'vertical').
 *   - 'vertical': sempre vertical
 *   - 'horizontal': sempre horizontal
 *   - 'dinamico': horizontal em telas grandes (>= 992px), vertical em telas pequenas (< 992px)
 *
 * @Exemplo
 * ```html
 * <!-- Card Dinâmico (horizontal em desktop, vertical em mobile) -->
 * <mpc-card [imagem]="'/assets/img/exemplo.jpg'" [layout]="'dinamico'">
 *  <div card-body>
 *   <h3>Título customizado</h3>
 *   <h4>Subtítulo customizado</h4>
 *   <p>Descrição customizada com <b>ng-content</b>.</p>
 * </div>
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
  styleUrls: ['./mpc-card.component.scss']
})
export class MpcCardComponent {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() imagem?: string = '';
  /** Array de links com ícones */
  @Input() links: CardLinks[] = [];
  /** Layout do card: 'vertical', 'horizontal' ou 'dinamico' */
  @Input() layout: 'vertical' | 'horizontal' | 'dinamico' = 'vertical';

  // ===== MÉTODOS =====

  /**
 * Getter para saber se o layout é dinâmico
 */
  get isDinamico(): boolean {
    return this.layout === 'dinamico';
  }

  /**
   * Retorna a URL da imagem do card ou uma imagem padrão caso não exista.
   * @returns {string} URL da imagem
   */
  protected getImagemCard(): string {
    return this.imagem ? `${this.imagem}` : 'no-image.jpg';
  }

  /**
   * Verifica se o layout do card é vertical.
   * No modo dinâmico, retorna true se a tela for pequena.
   * @returns {boolean} true se o layout for vertical
   */
  protected isVertical(): boolean {
    if (this.layout === 'vertical') return true;
    if (this.layout === 'dinamico') {
      return window.innerWidth < 992;
    }
    return false;
  }

  /**
   * Verifica se o layout do card é horizontal.
   * No modo dinâmico, retorna true se a tela for grande.
   * @returns {boolean} true se o layout for horizontal
   */
  protected isHorizontal(): boolean {
    if (this.layout === 'horizontal') return true;
    if (this.layout === 'dinamico') {
      return window.innerWidth >= 992;
    }
    return false;
  }

  /**
   * Verifica se o card possui links.
   * @returns {boolean} true se houver links
   */
  protected hasLinks(): boolean {
    return this.links && this.links.length > 0;
  }
}
