/**
 * @Componente MpcFooterDocComponent
 *
 * Este componente exibe exemplos e documentação do componente de rodapé (footer) que não faz parte da biblioteca MPC.
 *
 * @Propriedades
 * Nenhuma propriedade de entrada.
 *
 * @Exemplo
 * ```html
 * <app-footer></app-footer>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
import { Component } from '@angular/core';
import { MpcSectionComponent } from '../../../shared/components/mpc-section/mpc-section.component';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [MpcSectionComponent]
})
export class FooterComponent {}
