/**
 * @Componente MpcPageDividerImgComponent
 * 
 * Este componente é responsável por exibir um divisor de página com imagem de fundo,
 * título e subtítulo, ideal para separar seções com visual impactante.
 * 
 * @Propriedades
 * @Input() titulo {string} - Título do divisor (obrigatório)
 * @Input() subtitulo {string} - Subtítulo do divisor (opcional)
 * @Input() imagemFundo {string} - Imagem de funco do divisor (obrigatorio)
 * 
 * @Exemplo
 * ```html
 * <!-- Page Divider Básico -->
 * <mpc-page-divider-img
 *   titulo="Nossa Missão"
 *   subtitulo="Transformar vidas através do amor"
 *   id="divider-missao"
 *   [tabIndex]="0"
 *   imagemFundo="/assets/img/no-image.jpg"
 *   ariaLabel="Divisor da seção Nossa Missão" />
 * ```
 * 
 * @Variáveis CSS
 * --mpc-font-title-page-divider-img: Fonte do título
 * --mpc-font-subtitle-page-divider-img: Fonte do subtítulo 
 * --mpc-color-title-page-divider-img: Cor do título 
 * --mpc-color-subtitle-page-divider-img: Cor do subtítulo
 * --mpc-font-size-title-page-divider-img: 2rem;
 * --mpc-font-size-subtitle-page-divider-img: 2rem;
 * --mpc-bg-position-page-divider-img: center;
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 10/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-page-divider-img',
  imports: [],
  templateUrl: './mpc-page-divider-img.component.html',
  styleUrl: './mpc-page-divider-img.component.css'
})
export class MpcPageDividerImgComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Título principal da seção */
  @Input() titulo: string = 'Mpc Components';
  /** Subtítulo da seção */
  @Input() subtitulo?: string;
  /** Imagem de fundo da seção */
  @Input() imagemFundo?: string;


  // ===== MÉTODOS PROTEGIDOS =====

  /**
  * Verifica e retorna a imagem de fundo escurecida.
  * @returns {string} imagem de fundo escurecida
  */
  protected getBackgroundImage(): string {
    return this.imagemFundo && this.imagemFundo.length > 0 ?
      `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${this.imagemFundo})` :
      "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/assets/img/no-image.jpg)";
  }

  /**
   * Verifica se a seção possui título.
   * @returns {boolean} true se houver título
   */
  protected hasTitulo(): boolean {
    return Boolean(this.titulo && this.titulo.trim().length > 0);
  }

  /**
   * Verifica se a seção possui subtítulo.
   * @returns {boolean} true se houver subtítulo
   */
  protected hasSubtitulo(): boolean {
    return Boolean(this.subtitulo && this.subtitulo.trim().length > 0);
  }
}
