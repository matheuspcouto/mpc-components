/**
 * @Componente MpcSectionComponent
 * Este componente é responsável por exibir seções padronizadas com título e subtítulo.
 *
 * @Exemplo de utilização:
 * <mpc-section
 *   [titulo]="'Título Principal'"
 *   [subtitulo]="'Subtítulo da Seção'"
 *   [tituloDestaque]="'Destaque'">
 *   <!-- Conteúdo da seção -->
 * </mpc-section>
 *
 * @Inputs:
 * @property {string} titulo - Define o texto do título principal da seção.
 *   Exemplo: [titulo]="'Título Principal'"
 * @property {string} tituloDestaque - Define o texto em destaque no título (aparece em cor diferente).
 *   Exemplo: [tituloDestaque]="'Destaque'"
 * @property {string} subtitulo - Define o subtítulo exibido acima do título principal.
 *   Exemplo: [subtitulo]="'Subtítulo da Seção'"
 *
 * @Variáveis CSS customizáveis:
 *   --mpc-section-color-titulo: Cor do título principal. (default: var(--mpc-color-primary))
 *   --mpc-section-color-titulo-destaque: Cor do texto de destaque do título. (default: var(--mpc-color-secondary))
 *   --mpc-section-color-subtitulo: Cor do subtítulo. (default: var(--mpc-color-tertiary))
 *   --mpc-section-font-titulo: Fonte do título principal. (default: var(--mpc-font-subtitle))
 *   --mpc-section-font-titulo-destaque: Fonte do texto de destaque do título. (default: var(--mpc-font-subtitle))
 *   --mpc-section-font-subtitulo: Fonte do subtítulo. (default: var(--mpc-font-default))
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
  styleUrls: ['./mpc-section.component.scss']
})
export class MpcSectionComponent {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Titulo da seção */
  @Input() titulo: string = '';
  /** Titulo de destaque da seção (em cor diferente) */
  @Input() tituloDestaque: string = '';
  /** Subtitulo da seção */
  @Input() subtitulo: string = '';
} 