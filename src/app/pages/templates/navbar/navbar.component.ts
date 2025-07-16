/**
 * @Componente MpcNavbarDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de barra de navegação (navbar) que não faz parte da biblioteca MPC.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-navbar></app-navbar>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component } from '@angular/core';
import { MpcSectionComponent } from 'mpc-lib-angular';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [MpcSectionComponent]
})
export class NavbarComponent { }
