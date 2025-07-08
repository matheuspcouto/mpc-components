/**
 * @Componente ErrorComponent
 * Este componente é responsável por exibir uma tela de erro com informações detalhadas.
 * É chamado pelo ErrorService e exibe uma mensagem de erro com um botão para voltar e outro para copiar a mensagem de erro.
 * Utiliza Signal para receber o estado do erro automaticamente.
 *
 * @author Matheus Pimentel Do Couto
 * @created 01/07/2025
 * @updated 04/07/2025
 */

import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './error.service';
import { MpcButtonDirective } from 'mpc-lib-angular';

@Component({
    selector: 'mpc-error',
    standalone: true,
    imports: [MpcButtonDirective],
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    private router = inject(Router);
    private notificationService = inject(ToastrService);
    private errorService = inject(ErrorService);

    /**
     * Computed signal que verifica se há erro para exibir.
     */
    protected readonly exibirErro = computed(() => this.errorService.erro() !== null);

    /**
     * Computed signal que retorna o erro atual.
     */
    protected readonly erro = computed(() => this.errorService.erro());

    /**
     * Computed signal que retorna a imagem do erro ou imagem padrão.
     */
    protected readonly imagemErro = computed(() => {
        const erroAtual = this.erro();
        return erroAtual?.imagem || 'assets/img/modal/error.png';
    });

    protected isCopiado: boolean = false;

    /**
     * Navega para a rota de retorno e limpa o erro.
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
     */
    protected copiarMensagem(mensagem: string | undefined): void {
        if (!mensagem) return;
        navigator.clipboard.writeText(mensagem);
        this.isCopiado = true;
        this.notificationService.info('Copiado para área de transferência', '');
        setTimeout(() => { this.isCopiado = false; }, 3000);
    }
} 