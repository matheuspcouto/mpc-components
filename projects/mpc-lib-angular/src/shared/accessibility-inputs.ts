/**
 * @Class AccessibilityInputs
 * Classe que define propriedades de acessibilidade para componentes MPC
 * 
 * @Properties
 * id: string - ID único da seção para acessibilidade (opcional)
 * ariaLabel: string - Rótulo para leitores de tela (opcional)
 * tabIndex: number - TabIndex para navegação por teclado (opcional)
 * 
 * @author Matheus Pimentel Do Couto
 * @created 09/07/2025
 * @updated 09/07/2025
 */

import { Component, Input } from '@angular/core';


@Component({
    selector: 'mpc-accessibility-inputs',
    template: '',
})
export class AccessibilityInputs {
    /** 
     * ID único da seção para acessibilidade
     * 
     * Identificador único usado para navegação por teclado e associação
     * com leitores de tela. Deve ser único em toda a página.
     */
    @Input() id?: string;

    /** 
     * Rótulo para leitores de tela
     * 
     * Descrição textual que será anunciada por leitores de tela,
     * fornecendo contexto sobre o propósito e conteúdo do elemento.
     */
    @Input() ariaLabel?: string;

    /** 
     * TabIndex para navegação por teclado
     * 
     * Define a ordem e prioridade na navegação por teclado.
     */
    @Input() tabIndex?: number;
}