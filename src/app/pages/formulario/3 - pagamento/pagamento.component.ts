/**
 * @Componente PagamentoComponent
 * Este componente é responsável por exibir e gerenciar o formulário de pagamento.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */
import { SelectOption } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputSelectComponent } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';
import { ErrorService } from '../../../shared/error/error.service';

@Component({
  selector: 'app-pagamento',
  imports: [
    MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcButtonComponent, MpcInputSelectComponent, MpcFormProgressBarComponent, MpcInputTextComponent
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent implements OnInit {

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly errorService = inject(ErrorService);

  protected formasPagamento: SelectOption[] = [
    { label: 'Cartão', value: 'Cartão', selected: false },
    { label: 'Pix', value: 'Pix', selected: false },
    { label: 'Dinheiro', value: 'Dinheiro', selected: false }
  ];

  protected form = this.formBuilder.group({
    formaPagamento: [''],
    valor: [100]
  });

  /**
   * Inicializa o formulário e atualiza os dados se já existirem.
   */
  ngOnInit(): void {
    this.atualizarForm()
  }

  /**
   * Atualiza o formulário com os dados salvos, se existirem.
   */
  private atualizarForm(): void {
    try {
      const dadosInscricao = this.inscricaoService.getDadosInscricao();

      if (this.inscricaoService.isPagamentoCompleto()) {
        this.form.reset();
        this.form.patchValue({ valor: dadosInscricao.valor });

        if (dadosInscricao.formaPagamento) {
          this.formasPagamento.forEach(forma => {
            if (forma.value === dadosInscricao.formaPagamento) {
              forma.selected = true;
              this.form.patchValue({ formaPagamento: forma.value });
            }
          });
        }
      }
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Calcula o valor total de acordo com a forma de pagamento.
   */
  private calcularValorTotal(): void {
    const valorNormal = 100.00;
    const valorComTaxa = valorNormal as number * 1.05;
    const valorTotal = this.form.value.formaPagamento === 'Cartão' ? valorComTaxa : valorNormal;
    this.form.patchValue({ valor: valorTotal });
  }

  /**
   * Atualiza a forma de pagamento e recalcula o valor.
   */
  protected atualizarFormaPagamento(formaPagamento: any): void {
    this.form.patchValue({ formaPagamento });
    this.calcularValorTotal();
  }

  /**
   * Formata o valor para o padrão monetário brasileiro.
   */
  protected formatarValor(valor: any): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Avança para a próxima etapa do formulário.
   */
  protected proximaEtapa(): void {
    try {
      if (this.form.invalid) return;
      this.inscricaoService.atualizarDadosInscricao(this.form.value, 4);
      this.router.navigate([Rotas.CONFIRMACAO]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Volta para a etapa anterior do formulário.
   */
  protected etapaAnterior(): void {
    try {
      this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
      this.router.navigate([Rotas.CONTATO]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }
}
