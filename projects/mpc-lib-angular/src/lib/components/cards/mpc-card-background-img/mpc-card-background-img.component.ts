/**
 * @component MpcCardBackGroundImgComponent
 *
 * Componente responsável por exibir cards com imagem de fundo e gradiente escuro,
 * ideal para destacar informações importantes de forma visualmente impactante. O card permite
 * inserir conteúdo customizado via <ng-content>.
 *
 * @Inputs
 * @Input() imagemFundo {string} - Caminho da imagem de fundo do card
 *
 * @Exemplo
 * <!-- Card com imagem de fundo customizada e conteúdo extra -->
 * <mpc-card-background-img imagemFundo="/assets/img/eventos/capa-eventos.JPG">
 *   <h3 titulo>Eventos Especiais</h3>
 *   <h4 subtitulo>Eventos Especiais</h4>
 *   <p descricao>Confira nossa programação de eventos!</p>
 * </mpc-card-background-img>
 *
 *
 * @Observação
 * Se a propriedade <code>imagemFundo</code> for informada, ela será usada como imagem de fundo com gradiente escuro.
 * Caso contrário, será utilizada a imagem padrão definida no CSS (<code>--mpc-img-card-bg</code>) ou "/assets/img/no-image.jpg".
 * O conteúdo passado entre as tags <mpc-card-background-img> será exibido dentro do card, utilizando <ng-content>.
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2024
 * @updated 10/07/2024
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-card-background-img',
  imports: [],
  templateUrl: './mpc-card-background-img.component.html',
  styleUrl: './mpc-card-background-img.component.css'
})
export class MpcCardBackGroundImgComponent {

  // ===== PROPRIEDADES PRINCIPAIS =====
  /** Imagem de fundo do card */
  @Input() imagemFundo: string = '';

  // ===== MÉTODOS PÚBLICOS =====
  /**
   * Retorna a imagem de fundo escurecida com gradiente.
   * @returns {string} background-image CSS
   */
  protected getBackgroundImage(): string {
    return this.imagemFundo && this.imagemFundo.length > 0
      ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${this.imagemFundo})`
      : "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/img/no-image.jpg)";
  }
}
