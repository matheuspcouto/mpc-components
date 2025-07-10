/**
 * @Componente MpcCardComponent
 * 
 * Este componente é responsável por exibir cards com layout vertical e horizontal,
 * suportando imagens, títulos, subtítulos, descrições e links com design customizável.
 * 
 * @Propriedades
 * @Input() id {string} - ID do card (obrigatório)
 * @Input() tabIndex {number} - Índice do card (opcional)
 * @Input() ariaLabel {string} - Label do card (opcional)
 * @Input() titulo {string} - Título do card (obrigatório)
 * @Input() subtitulo {string} - Subtítulo do card (opcional)
 * @Input() descricao {string} - Descrição do card (opcional)
 * @Input() imagem {string} - URL da imagem (opcional)
 * @Input() links {CardLink[]} - Array de links do card (opcional)
 * @Input() tipo {string} - Tipo do card ('vertical' | 'horizontal') (opcional, padrão: 'vertical')
 * 
 * @Exemplo
 * ```html
 * <!-- Card Vertical Básico -->
 * <mpc-card
 *   titulo="Título do Card"
 *   subtitulo="Subtítulo"
 *   descricao="Descrição do card"
 *   imagem="/assets/img/exemplo.jpg"
 *   id="card-exemplo"
 *   [tabIndex]="0"
 *   ariaLabel="Card de exemplo" />
 * 
 * <!-- Card Horizontal com Links -->
 * <mpc-card
 *   titulo="Card Horizontal"
 *   subtitulo="Subtítulo"
 *   descricao="Descrição do card horizontal"
 *   imagem="/assets/img/exemplo.jpg"
 *   [tipo]="'horizontal'"
 *   [links]="linksCard"
 *   id="card-horizontal"
 *   [tabIndex]="0"
 *   ariaLabel="Card horizontal com links" />
 * ```
 * 
 * @Interfaces
 * CardLink: Interface para links do card
 * - url: string - URL do link
 * - icone: string - Classe do ícone (ex: 'bi bi-facebook')
 * 
 * @Variáveis CSS
 * --mpc-bg-card: Cor de fundo do card (padrão: white)
 * --mpc-border-color-card: Cor da borda do card (padrão: var(--mpc-color-primary))
 * --mpc-bg-links-card: Cor de fundo dos links (padrão: var(--mpc-color-primary))
 * --mpc-color-links-card: Cor dos links (padrão: white)
 * --mpc-color-text-title-card: Cor do título do card (padrão: var(--mpc-color-primary))
 * --mpc-color-text-subtitle-card: Cor do subtítulo do card (padrão: var(--mpc-color-primary))
 * --mpc-color-text-description-card: Cor da descrição do card (padrão: var(--mpc-color-primary))
 * --mpc-color-bar-card: Cor da barra do card (padrão: var(--mpc-color-primary))
 * --mpc-font-title-card: Fonte do título do card (padrão: var(--mpc-font-title))
 * --mpc-font-subtitle-card: Fonte do subtítulo do card (padrão: var(--mpc-font-subtitle))
 * --mpc-font-description-card: Fonte da descrição do card (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 10/07/2025
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
