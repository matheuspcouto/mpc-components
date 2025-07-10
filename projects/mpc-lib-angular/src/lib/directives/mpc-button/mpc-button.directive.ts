/**
 * @Diretiva MpcButtonDirective
 * Esta diretiva transforma qualquer elemento em um botão estilizado, permitindo a inclusão de ícones (esquerda/direita) e personalização via propriedades.
 *
 * @Propriedades
 * - posicaoIcone: 'esquerda' | 'direita' (padrão: 'direita')
 * - icone: string (classes do Bootstrap Icons ou outra biblioteca)
 *
 * @Exemplo de uso:
 * <button mpcButton [icone]="'bi bi-check'" [posicaoIcone]="'esquerda'" texto="Salvar"></button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 04/07/2025
 * @updated 10/07/2025
 */

import { Directive, Input, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';

/**
 * Enum que define as posições possíveis para o ícone no botão
 */
enum PosicoesIcone {
    ESQUERDA = 'esquerda',
    DIREITA = 'direita',
}

// TODO: Talvez transformar em um component para facilitar a utilização
@Directive({
    selector: '[mpcButton]',
    standalone: true
})
export class MpcButtonDirective implements OnInit, OnChanges {

    /**
     * Define a posição do ícone no botão
     * @default 'direita'
     */
    @Input() posicaoIcone: string = PosicoesIcone.DIREITA;

    /**
     * Classes CSS do ícone a ser exibido (ex: 'bi bi-check')
     * @default ''
     */
    @Input() icone: string = '';

    /**
     * Texto a ser exibido no botão
     * @default ''
     */
    @Input() texto: string = '';

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

    /**
     * Mapa contendo todos os estilos CSS aplicados ao botão
     * Define a aparência padrão do botão MPC
     */
    private readonly MPC_BTN_STYLES = new Map<string, string>([
        ['display', 'flex'],
        ['position', 'relative'],
        ['padding-block', '0.5rem'],
        ['padding-inline', '1.25rem'],
        ['border-radius', '9999px'],
        ['align-items', 'center'],
        ['justify-content', 'center'],
        ['cursor', 'pointer'],
        ['outline', 'none'],
        ['overflow', 'hidden'],
        ['font-size', '15px'],
        ['font-weight', '700'],
        ['min-width', '30vh'],
        ['max-width', '50vh'],
        ['text-decoration', 'none'],
        ['border', 'none'],
    ]);

    /**
     * Método executado quando a diretiva é inicializada
     * Aplica os estilos padrão do botão e inclui o ícone inicial
     */
    ngOnInit() {
        this.MPC_BTN_STYLES.forEach((value, key) => this.renderer.setStyle(this.el.nativeElement, key, value));
        this.incluirIcone();
    }

    /**
     * Método executado quando as propriedades de entrada (@Input) são alteradas
     * Reaplica a lógica de inclusão do ícone quando necessário
     * @param changes - Objeto contendo as mudanças nas propriedades
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.incluirIcone();
    }

    /**
     * Método privado responsável por criar e posicionar o ícone e texto no botão
     * Limpa o conteúdo atual do elemento e recria a estrutura com ícone e texto
     * na posição especificada pela propriedade posicaoIcone
     */
    private incluirIcone(): void {
        // Limpa o conteúdo atual
        this.el.nativeElement.innerHTML = '';

        let iconElem: HTMLElement | null = null;
        if (this.icone !== undefined && this.icone !== null && this.icone.trim() !== '') {
            iconElem = this.renderer.createElement('i');
            const classes = this.icone.trim().split(' ').filter(cls => cls.length > 0);
            classes.forEach(cls => this.renderer.addClass(iconElem, cls));
            this.renderer.setStyle(iconElem, 'vertical-align', 'middle');
        }
        let textElem: any = null;
        if (this.texto !== undefined && this.texto !== null) {
            textElem = this.renderer.createText(this.texto);
        }

        // Adiciona na ordem correta
        if (this.posicaoIcone === PosicoesIcone.ESQUERDA) {
            if (iconElem) {
                this.renderer.appendChild(this.el.nativeElement, iconElem);
                this.renderer.setStyle(iconElem, 'margin-right', '0.5rem');
            }
            if (textElem) {
                this.renderer.appendChild(this.el.nativeElement, textElem);
            }
        } else {
            if (textElem) {
                this.renderer.appendChild(this.el.nativeElement, textElem);
            }
            if (iconElem) {
                this.renderer.appendChild(this.el.nativeElement, iconElem);
                this.renderer.setStyle(iconElem, 'margin-left', '0.5rem');
            }
        }
    }
} 