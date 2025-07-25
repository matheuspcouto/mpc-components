
/**
 * @Componente MpcPaginationDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de paginação da biblioteca MPC,
 * demonstrando como paginar listas de itens e controlar índices de exibição.
 *
 * @Propriedades
 * @protected itensTotais {any[]} - Lista de itens para paginação
 * @protected indiceInicial {number} - Índice inicial da página atual
 * @protected indiceFinal {number} - Índice final da página atual
 *
 * @Exemplo
 * ```html
 * <app-paginacao></app-paginacao>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component } from '@angular/core';
import { MpcSectionComponent } from 'mpc-lib-angular';
import { MpcPaginationComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-paginacao',
  imports: [MpcPaginationComponent, MpcSectionComponent],
  templateUrl: './mpc-pagination-doc.component.html',
  styleUrl: './mpc-pagination-doc.component.scss'
})
export class MpcPaginationDocComponent {

  /**
   * Lista de itens para paginação.
   */
  itensTotais = [
    { id: 1, nome: 'Item 1' },
    { id: 2, nome: 'Item 2' },
    { id: 3, nome: 'Item 3' },
    { id: 4, nome: 'Item 4' },
    { id: 5, nome: 'Item 5' },
    { id: 6, nome: 'Item 6' },
    { id: 7, nome: 'Item 7' },
    { id: 8, nome: 'Item 8' },
    { id: 9, nome: 'Item 9' },
    { id: 10, nome: 'Item 10' },
    { id: 11, nome: 'Item 11' },
    { id: 12, nome: 'Item 12' },
    { id: 13, nome: 'Item 13' },
    { id: 14, nome: 'Item 14' },
    { id: 15, nome: 'Item 15' },
    { id: 16, nome: 'Item 16' },
    { id: 17, nome: 'Item 17' },
    { id: 18, nome: 'Item 18' },
    { id: 19, nome: 'Item 19' },
    { id: 20, nome: 'Item 20' },
    { id: 21, nome: 'Item 21' },
    { id: 22, nome: 'Item 22' },
    { id: 23, nome: 'Item 23' },
    { id: 24, nome: 'Item 24' },
    { id: 25, nome: 'Item 25' },
    { id: 26, nome: 'Item 26' },
    { id: 27, nome: 'Item 27' },
    { id: 28, nome: 'Item 28' },
    { id: 29, nome: 'Item 29' },
    { id: 30, nome: 'Item 30' },
    { id: 31, nome: 'Item 31' },
    { id: 32, nome: 'Item 32' },
    { id: 33, nome: 'Item 33' },
    { id: 34, nome: 'Item 34' },
    { id: 35, nome: 'Item 35' },
    { id: 36, nome: 'Item 36' },
    { id: 37, nome: 'Item 37' },
    { id: 38, nome: 'Item 38' },
    { id: 39, nome: 'Item 39' },
    { id: 40, nome: 'Item 40' },
    { id: 41, nome: 'Item 41' },
    { id: 42, nome: 'Item 42' },
    { id: 43, nome: 'Item 43' },
    { id: 44, nome: 'Item 44' },
    { id: 45, nome: 'Item 45' },
    { id: 46, nome: 'Item 46' },
    { id: 47, nome: 'Item 47' },
    { id: 48, nome: 'Item 48' },
    { id: 49, nome: 'Item 49' },
    { id: 50, nome: 'Item 50' },
  ];

  /**
   * Opcoes de qtd de Itens por Página
   */
  opcoesSeletorItensPorPagina: number[] = [6, 12, 24, 50, 100];

  /**
   * Índice inicial da página atual.
   */
  indiceInicial: number = 0;
  /**
   * Índice final da página atual.
   */
  indiceFinal: number = 0;

  /**
   * Atualiza os índices de exibição da lista conforme a página selecionada.
   * @param event Objeto contendo os índices inicial e final
   */
  definirIndiceLista(event: any) {
    const { indiceInicial, indiceFinal } = event;
    this.indiceInicial = indiceInicial;
    this.indiceFinal = indiceFinal;
  }

}
