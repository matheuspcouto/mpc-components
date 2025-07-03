import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InscricaoService } from '../service/inscricao.service';
import { Inscricao } from '../model/inscricao.model';
import { take } from 'rxjs';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcInputPesquisaComponent } from '../../../shared/components/Inputs/mpc-input-pesquisa/mpc-input-pesquisa.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-pesquisa',
    imports: [ReactiveFormsModule, FormsModule, MpcInputPesquisaComponent],
    templateUrl: './pesquisa.component.html',
    styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
    private readonly router = inject(Router);
    private readonly inscricaoService = inject(InscricaoService);
    private readonly formBuilder = inject(NonNullableFormBuilder);
    private readonly notificacaoService = inject(ToastrService);

    protected form = this.formBuilder.group({ pesquisa: [''] });

    protected pesquisar(): void {
        this.inscricaoService.detalharInscricao(this.form.controls.pesquisa.value)
            .pipe(take(1))
            .subscribe({
                next: (response: Inscricao) => {
                    this.inscricaoService.atualizarDadosInscricao(response);
                    this.notificacaoService.success('Inscrição encontrada com sucesso, redirecionando para a tela de detalhes', 'Sucesso');
                    this.router.navigate([Rotas.DETALHES_INSCRICAO]);
                },
                error: () => {
                    this.notificacaoService.error('Não foi encontrado nenhum resultado para a pesquisa', 'Erro');
                }
            })
    }
} 