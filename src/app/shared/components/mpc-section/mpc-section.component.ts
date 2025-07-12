/**
 * @Componente MpcSectionComponent
 * Este componente é responsável por exibir seções padronizadas com título e subtítulo.
 *
 * @Exemplo de utilização:
 * <mpc-section class="buttons-float" [titulo]="'experimente o componente'" [subtitulo]="'MPC'" [tituloDestaque]="'Btn Float'">
 *   <!-- Conteúdo da seção -->
 * </mpc-section>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mpc-section',
  standalone: true,
  imports: [],
  templateUrl: './mpc-section.component.html',
  styleUrls: ['./mpc-section.component.css']
})
export class MpcSectionComponent {
  @Input() titulo: string = '';
  @Input() tituloDestaque: string = '';
  @Input() subtitulo: string = '';
} 