/**
 * @Componente DocumentacaoGeralComponent
 *
 * Este componente exibe a documentação geral da biblioteca MPC, incluindo requisitos, instalação e lista de componentes disponíveis.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-documentacao-geral></app-documentacao-geral>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component } from '@angular/core';
import { MpcSectionComponent } from 'mpc-lib-angular';

@Component({
  selector: 'app-documentacao-geral',
  templateUrl: './documentacao-geral.component.html',
  styleUrl: './documentacao-geral.component.scss',
  imports: [MpcSectionComponent],
})
export class DocumentacaoGeralComponent { } 