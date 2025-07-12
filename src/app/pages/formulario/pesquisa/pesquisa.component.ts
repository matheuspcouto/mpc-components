/**
 * @Componente PesquisaComponent
 *
 * Este componente é responsável por exibir e gerenciar a pesquisa de inscrições.
 * Permite ao usuário buscar inscrições pelo campo de pesquisa e navegar para os detalhes do resultado encontrado.
 *
 * @Propriedades
 * @protected form {FormGroup} - Formulário reativo de pesquisa
 *
 * @Exemplo
 * ```html
 * <app-pesquisa></app-pesquisa>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InscricaoService } from '../service/inscricao.service';
import { Inscricao } from '../model/inscricao.model';
import { take } from 'rxjs';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { ToastrService } from 'ngx-toastr';
import { MpcInputPesquisaComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from '../../../shared/components/mpc-section/mpc-section.component';

@Component({
    selector: 'app-pesquisa',
    imports: [ReactiveFormsModule, FormsModule, MpcInputPesquisaComponent, MpcSectionComponent],
    templateUrl: './pesquisa.component.html',
    styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {

    // Serviços
    private readonly router = inject(Router);
    private readonly inscricaoService = inject(InscricaoService);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly notificacaoService = inject(ToastrService);

    /**
     * Formulário reativo de pesquisa.
     */
    protected form = this.formBuilder.group({ pesquisa: [''] });

    /**
     * Realiza a pesquisa da inscrição pelo valor do campo.
     */
    protected pesquisar(): void {
        this.inscricaoService.detalharInscricao(this.form.controls.pesquisa.value)
            .pipe(take(1))
            .subscribe({
                next: (response: Inscricao) => {
                    this.inscricaoService.atualizarDadosInscricao({ novosDados: response });
                    this.router.navigate([Rotas.DETALHES_INSCRICAO]);
                },
                error: () => {
                    this.notificacaoService.error('Não foi encontrado nenhum resultado para a pesquisa', 'Erro');
                }
            })
    }
} 