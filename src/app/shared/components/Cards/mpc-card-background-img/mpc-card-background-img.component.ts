/**
 * @Componente MpcCardProgramacaoComponent
 * Este componente é responsável por exibir um card de programação com título, horário, descrição e imagem de fundo.
 *
 * titulo {string}: Título da programação.
 * horario {string}: Horário da programação.
 * descricao {string}: Descrição da programação.
 * imagemFundo {string}: URL da imagem de fundo.
 *
 * Exemplo de utilização:
 * <mpc-card-background-img titulo="Culto de Adoração" horario="Domingo às 17H & 19:30H" descricao="Venha nos conhecer e traga sua família para prestar culto conosco !" imagemFundo="assets/img/home/culto-adoracao.jpg" [delay]="100"></mpc-card-programacao>
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 04/07/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-card-background-img',
  imports: [],
  templateUrl: './mpc-card-background-img.component.html',
  styleUrl: './mpc-card-background-img.component.css'
})
export class MpcCardBackGroundImgComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string = '';

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() descricao: string = '';
  @Input() imagemFundo: string = '';

  /**
   * Retorna o estilo de background-image com gradiente escuro sobre a imagem de fundo.
   * @returns {string} CSS para background-image
   */
  getBackgroundImage(): string {
    return `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${this.imagemFundo})`;
  }
}
