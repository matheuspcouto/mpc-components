/**
 * @Componente MpcErrorComponent
 * 
 * Responsável por exibir uma tela de erro detalhada.
 * É chamado pelo MpcErrorService e exibe uma mensagem de erro com opções para voltar ou copiar a mensagem.
 * Utiliza Signals para reatividade automática do estado do erro.
 *
 * @Propriedades
 * @property {Signal<boolean>} exibirErro Indica se há erro para exibir
 * @property {Signal<MpcErro|null>} erro Retorna o erro atual
 * @property {Signal<string>} imagemErro Caminho da imagem do erro ou padrão
 * @property {boolean} isCopiado Indica se a mensagem foi copiada
 * 
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */

import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MpcButtonComponent } from 'mpc-lib-angular';
import { MpcErrorService } from './mpc-error.service';

export interface MpcErro {
    titulo: string;
    mensagem: string;
    rotaRetorno: string;
    imagem?: string;
}

@Component({
    selector: 'mpc-error',
    imports: [MpcButtonComponent],
    templateUrl: './mpc-error.component.html',
    styleUrls: ['./mpc-error.component.css']
})
export class MpcErrorComponent {

    // Injeções
    private readonly router = inject(Router);
    private readonly errorService = inject(MpcErrorService);

    /**
     * Computed signal que verifica se há erro para exibir.
     * @returns {boolean} true se houver erro
     */
    protected readonly exibirErro = computed(() => this.errorService.erro() !== null);

    /**
     * Computed signal que retorna o erro atual.
     * @returns {MpcErro|null} Objeto de erro atual
     */
    protected readonly erro = computed(() => this.errorService.erro());

    /**
     * Computed signal que retorna a imagem do erro ou imagem padrão.
     * @returns {string} Caminho da imagem do erro
     */
    protected readonly imagemErro = computed(() => {
        const erroAtual = this.erro();
        return erroAtual?.imagem || 'assets/img/modal/error.png';
    });

    /**
     * Indica se a mensagem de erro foi copiada para a área de transferência.
     * @type {boolean}
     */
    protected isCopiado: boolean = false;

    /**
     * Navega para a rota de retorno e limpa o erro.
     * @returns {void}
     */
    protected voltar(): void {
        const erroAtual = this.erro();
        if (erroAtual) {
            this.router.navigate([erroAtual.rotaRetorno]);
            this.errorService.limparErro();
        }
    }

    /**
     * Copia a mensagem de erro para a área de transferência e exibe notificação.
     * @param {string | undefined} mensagem Mensagem de erro a ser copiada
     * @returns {void}
     */
    protected copiarMensagem(mensagem: string | undefined): void {
        if (!mensagem) return;
        navigator.clipboard.writeText(mensagem);
        this.isCopiado = true;
        setTimeout(() => { this.isCopiado = false; }, 3000);
    }
} 