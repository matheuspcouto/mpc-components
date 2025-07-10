/**
 * @Diretiva MpcBtnFloatDirective
 * Esta diretiva transforma qualquer elemento em um botão flutuante para rolar a página ao topo,
 * permitindo personalização via propriedades.
 *
 * Propriedades:
 * - icone: string (classes do Bootstrap Icons ou outra biblioteca)
 *
 * Exemplo de uso:
 * <button mpcBtnFloat [icone]="'bi bi-arrow-up-short'" [style.background-color]="'black'" [style.color]="'white'"></button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 04/07/2025
 */

import { Directive, Input, ElementRef, Renderer2, OnInit, inject } from '@angular/core';

// TODO: Talvez transformar em um component para facilitar a utilização
@Directive({
    selector: '[mpcBtnFloat]',
    standalone: true
})
export class MpcBtnFloatDirective implements OnInit {

    /**
     * Classes CSS do ícone a ser exibido (ex: 'bi bi-arrow-up-short')
     * @default ''
     */
    @Input() icone: string = '';

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    /**
     * Mapa contendo todos os estilos CSS aplicados ao botão flutuante
     * Define a aparência padrão do botão flutuante MPC
     */
    private readonly MPC_BTN_FLOAT_STYLES = new Map<string, string>([
        ['visibility', 'hidden'],
        ['position', 'fixed'],
        ['right', '15px'],
        ['bottom', '15px'],
        ['z-index', '998'],
        ['width', '44px'],
        ['height', '44px'],
        ['border-radius', '50px'],
        ['border', '0'],
        ['transition', 'all ease-in 0.4s'],
        ['display', 'flex'],
        ['align-items', 'center'],
        ['justify-content', 'center'],
        ['box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)'],
        ['cursor', 'pointer'],
        ['outline', 'none'],
    ]);

    /**
     * Método executado quando a diretiva é inicializada
     * Aplica os estilos padrão do botão flutuante, inclui o ícone e configura o listener de scroll
     */
    ngOnInit() {
        this.MPC_BTN_FLOAT_STYLES.forEach((value, key) => this.renderer.setStyle(this.el.nativeElement, key, value));
        this.incluirIcone();
    }

    /**
     * Método privado responsável por criar e adicionar o ícone ao botão
     */
    private incluirIcone(): void {
        // Limpa o conteúdo atual
        this.el.nativeElement.innerHTML = '';

        if (this.icone) {
            const iconElem = this.renderer.createElement('i');
            const classes = this.icone.split(' ');
            classes.forEach(cls => this.renderer.addClass(iconElem, cls));
            this.renderer.setStyle(iconElem, 'font-size', '24px');
            this.renderer.setStyle(iconElem, 'line-height', '0');
            this.renderer.appendChild(this.el.nativeElement, iconElem);
        }
    }
} 