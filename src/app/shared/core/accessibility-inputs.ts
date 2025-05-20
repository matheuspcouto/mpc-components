/**
 * @Componente AcessibilityInputs
 * @description
 * Esta class é responsável por fornecer propriedades de acessibilidade para os componentes.
 *
 * id {string}: (opcional) ID do botão.
 * tabIndex {number}: (opcional) Índice de tabulação do botão.
 * ariaLabel {string}: (opcional) Rótulo de acessibilidade do botão.
 *
 * Exemplo de utilização:
 * SeuComponent extends AcessibilityInputs
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, input } from "@angular/core";

@Component({
  selector: 'accessibility-inputs',
  template: ''
})
export class AccessibilityInputs {
  id = input<string>('');
  tabIndex = input<number>(0);
  ariaLabel = input<string>('');
}
