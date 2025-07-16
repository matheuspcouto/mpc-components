/**
 * @Componente MpcPageDividerImgComponent
 *
 * Componente Angular responsável por exibir um divisor de página com imagem de fundo escurecida.
 * Ideal para separar seções do site com visual impactante, podendo receber uma imagem customizada.
 *
 * @Propriedades
  * @property {string} [imagemFundo] Imagem de fundo da seção
 *
 * @Exemplo de uso:
 * ```html
 * <mpc-page-divider-img [imagemFundo]="'/assets/img/home/capa.jpg'">
 *   <span titulo>Minha Seção</span>
 *   <span subtitulo>Descrição da seção</span>
 * </mpc-page-divider-img>
 * ```
 *
 * @detalhes
 * - Caso nenhuma imagem seja informada, será utilizada uma imagem padrão.
 * - A imagem de fundo recebe um gradiente escuro para melhor contraste do conteúdo.
 * - Utilize as tags <ng-content select="[titulo]"></ng-content> e <ng-content select="[subtitulo]"></ng-content> para inserir título e subtítulo customizados.
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
  styleUrl: './mpc-page-divider-img.component.scss'
})
export class MpcPageDividerImgComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
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
}
