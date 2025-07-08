/**
 * @Componente PagamentoComponent
 * Este componente é responsável por exibir e gerenciar o formulário de pagamento.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { InscricaoService } from '../service/inscricao.service';
import { ErrorService } from '../../../shared/error/error.service';
import {
  MpcButtonDirective, MpcInputSelectComponent, MpcFormProgressBarComponent,
  MpcLoaderService, SelectOption
} from 'mpc-lib-angular';

@Component({
  selector: 'app-pagamento',
  imports: [
    FormsModule,
    ReactiveFormsModule, MpcButtonDirective, MpcInputSelectComponent, MpcFormProgressBarComponent,
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent implements OnInit {

  // Injeções
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly errorService = inject(ErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  // Variáveis
  protected formasPagamento: SelectOption[] = [
    { label: 'Cartão', value: 'Cartão', selected: false },
    { label: 'Pix', value: 'Pix', selected: false },
    { label: 'Dinheiro', value: 'Dinheiro', selected: false }
  ];

  protected valorInscricao: number = 100.00;

  protected form = this.formBuilder.group({
    formaPagamento: [''],
    valor: [0.00]
  });

  /**
 * Formata o valor para o padrão monetário brasileiro.
 */
  get valorFormatado(): string {
    return this.valorInscricao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Inicializa o formulário e atualiza os dados se já existirem.
   */
  ngOnInit(): void {
    this.atualizarForm();
  }

  /**
   * Atualiza o formulário com os dados salvos, se existirem.
   */
  private atualizarForm(): void {
    try {
      this.loaderService.show();
      const dadosInscricao = this.inscricaoService.getDadosInscricao();

      if (this.inscricaoService.isPagamentoCompleto()) {
        this.form.reset();
        this.valorInscricao = dadosInscricao.valor;

        if (dadosInscricao.formaPagamento) {
          this.formasPagamento.forEach(forma => {
            if (forma.value === dadosInscricao.formaPagamento) {
              forma.selected = true;
              this.form.controls.formaPagamento.setValue(forma.value);
            }
          });
        }
      }
    } catch (error) {
      this.errorService.construirErro(error);
    } finally {
      this.loaderService.hide();
    }
  }

  /**
   * Calcula o valor total de acordo com a forma de pagamento.
   */
  protected calcularValorTotal(): void {
    const valorNormal = 100.00;
    const valorComTaxa = valorNormal as number * 1.05;
    const valorTotal = this.form.controls.formaPagamento.value === 'Cartão' ? valorComTaxa : valorNormal;
    this.valorInscricao = valorTotal;
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
      this.form.controls.valor.setValue(this.valorInscricao);
      this.inscricaoService.atualizarDadosInscricao({ novosDados: this.form.value, proximaEtapa: 4 });
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
      this.inscricaoService.atualizarDadosInscricao({ novosDados: this.form.value, proximaEtapa: 2 });
      this.router.navigate([Rotas.CONTATO]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }
}
