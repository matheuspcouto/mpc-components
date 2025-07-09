/**
 * @Componente MpcCardComponent
 * 
 * Este componente é responsável por exibir cards personalizados com diferentes layouts,
 * suportando conteúdo rico incluindo imagens, títulos, subtítulos, descrições e links.
 * 
 * @Propriedades
 * @Input() titulo {string} - Título principal do card (obrigatório)
 * @Input() subtitulo {string} - Subtítulo do card (opcional)
 * @Input() descricaoUm {string} - Primeira descrição do card (opcional)
 * @Input() descricaoDois {string} - Segunda descrição do card (opcional)
 * @Input() imagem {string} - URL da imagem do card (opcional, usa imagem padrão se não fornecida)
 * @Input() links {CardLinks[]} - Array de links com ícones (opcional)
 * @Input() layout {'vertical' | 'horizontal'} - Layout do card (padrão: 'vertical')
 * 
 * @Exemplo de uso
 * ```html
 * <!-- Card Vertical Básico -->
 * <mpc-card 
 *   titulo="Título do Card" 
 *   subtitulo="Subtítulo" 
 *   descricaoUm="Primeira descrição"
 *   descricaoDois="Segunda descrição"
 *   imagem="/assets/img/card-image.jpg"
 *   layout="vertical">
 * </mpc-card>
 * 
 * <!-- Card Horizontal com Links -->
 * <mpc-card 
 *   titulo="Card Horizontal" 
 *   subtitulo="Com Links" 
 *   descricaoUm="Descrição do card"
 *   imagem="/assets/img/card-image.jpg"
 *   [links]="[
 *     {url: 'https://linkedin.com', icone: 'bi bi-linkedin'},
 *     {url: 'https://github.com', icone: 'bi bi-github'}
 *   ]"
 *   layout="horizontal">
 * </mpc-card>
 * ```
 * 
 * @Interfaces
 * CardLinks: Interface para links do card
 * - url: string - URL do link
 * - icone: string - Classe do ícone (ex: 'bi bi-linkedin')
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 09/07/2025
 */

import { Component, Input } from '@angular/core';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

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
export class MpcCardComponent extends AccessibilityInputs {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Título principal do card */
  @Input() titulo: string = '';
  /** Subtítulo do card */
  @Input() subtitulo: string = '';
  /** Primeira descrição do card */
  @Input() descricaoUm: string = '';
  /** Segunda descrição do card */
  @Input() descricaoDois: string = '';
  /** URL da imagem do card */
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

  /**
   * Verifica se o card possui título.
   * @returns {boolean} true se houver título
   */
  protected hasTitulo(): boolean {
    return Boolean(this.titulo && this.titulo.trim().length > 0);
  }

  /**
   * Verifica se o card possui subtítulo.
   * @returns {boolean} true se houver subtítulo
   */
  protected hasSubtitulo(): boolean {
    return Boolean(this.subtitulo && this.subtitulo.trim().length > 0);
  }

  /**
   * Verifica se o card possui primeira descrição.
   * @returns {boolean} true se houver primeira descrição
   */
  protected hasDescricaoUm(): boolean {
    return Boolean(this.descricaoUm && this.descricaoUm.trim().length > 0);
  }

  /**
   * Verifica se o card possui segunda descrição.
   * @returns {boolean} true se houver segunda descrição
   */
  protected hasDescricaoDois(): boolean {
    return Boolean(this.descricaoDois && this.descricaoDois.trim().length > 0);
  }

  /**
   * Retorna o aria-label do card ou um fallback baseado no título.
   * @returns {string} aria-label do card
   */
  protected getAriaLabel(): string {
    return this.ariaLabel || this.titulo || 'Card';
  }
}
