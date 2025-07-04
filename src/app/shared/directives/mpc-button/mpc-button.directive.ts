/**
 * @Diretiva MpcButtonDirective
 * Esta diretiva transforma qualquer elemento em um botão estilizado, permitindo a inclusão de ícones (esquerda/direita) e personalização via propriedades.
 *
 * Propriedades:
 * - posicaoIcone: 'esquerda' | 'direita' (padrão: 'direita')
 * - icone: string (classes do Bootstrap Icons ou outra biblioteca)
 *
 * Exemplo de uso:
 * <button mpcButton [icone]="'bi bi-check'" [posicaoIcone]="'esquerda'" texto="Salvar"></button>
 *
 * @author Matheus Pimentel Do Couto
 * @created 04/07/2025
 */

import { Directive, Input, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';

enum PosicoesIcone {
    ESQUERDA = 'esquerda',
    DIREITA = 'direita',
}

@Directive({
    selector: '[mpcButton]'
})
export class MpcButtonDirective implements OnInit, OnChanges {

    @Input() posicaoIcone: string = PosicoesIcone.DIREITA;
    @Input() icone: string = '';
    @Input() texto: string = '';

    private readonly el = inject(ElementRef);
    private readonly renderer = inject(Renderer2);

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

    ngOnInit() {
        this.MPC_BTN_STYLES.forEach((value, key) => this.renderer.setStyle(this.el.nativeElement, key, value));
        this.incluirIcone();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.incluirIcone();
    }

    private incluirIcone(): void {
        // Limpa o conteúdo atual
        this.el.nativeElement.innerHTML = '';

        let iconElem: HTMLElement | null = null;
        if (this.icone) {
            iconElem = this.renderer.createElement('i');
            const classes = this.icone.split(' ');
            classes.forEach(cls => this.renderer.addClass(iconElem, cls));
            this.renderer.setStyle(iconElem, 'vertical-align', 'middle');
        }
        let textElem: any = null;
        if (this.texto) {
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