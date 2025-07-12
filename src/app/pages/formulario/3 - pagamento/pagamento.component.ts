/**
 * @Componente PagamentoComponent
 *
 * Este componente é responsável por exibir e gerenciar o formulário de pagamento do usuário,
 * incluindo seleção de forma de pagamento, cálculo e formatação do valor da inscrição.
 *
 * @Propriedades
 * @protected formasPagamento {SelectOption[]} - Opções de formas de pagamento
 * @protected valorInscricao {number} - Valor da inscrição
 * @protected form {FormGroup} - Formulário reativo de pagamento
 *
 * @Exemplo
 * ```html
 * <app-pagamento></app-pagamento>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { InscricaoService } from '../service/inscricao.service';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
import { MpcInputSelectComponent, SelectOption, MpcFormProgressBarComponent, MpcLoaderService, MpcButtonComponent } from 'mpc-lib-angular';
import { MpcSectionComponent } from '../../../shared/components/mpc-section/mpc-section.component';

@Component({
  selector: 'app-pagamento',
  imports: [
    FormsModule,
    ReactiveFormsModule, MpcInputSelectComponent, MpcFormProgressBarComponent,
    MpcButtonComponent, MpcSectionComponent
],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent implements OnInit {

  // Injeções
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly mpcErrorService = inject(MpcErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  /**
   * Opções de formas de pagamento disponíveis.
   */
  protected formasPagamento: SelectOption[] = [
    { label: 'Cartão', value: 'Cartão', selected: false },
    { label: 'Pix', value: 'Pix', selected: false },
    { label: 'Dinheiro', value: 'Dinheiro', selected: false }
  ];

  /**
   * Valor da inscrição.
   */
  protected valorInscricao: number = 100.00;

  /**
   * Formulário reativo de pagamento.
   */
  protected form = this.formBuilder.group({
    formaPagamento: [''],
    valor: [0.00]
  });

  /**
   * Retorna o valor formatado em moeda brasileira.
   * @returns {string} Valor formatado em moeda brasileira
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
      this.mpcErrorService.construirErro(error);
    } finally {
      this.loaderService.hide();
    }
  }

  /**
   * Calcula o valor total de acordo com a forma de pagamento selecionada.
   */
  protected calcularValorTotal(): void {
    const valorNormal = 100.00;
    const valorComTaxa = valorNormal as number * 1.05;
    const valorTotal = this.form.controls.formaPagamento.value === 'Cartão' ? valorComTaxa : valorNormal;
    this.valorInscricao = valorTotal;
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
      this.mpcErrorService.construirErro(error);
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
      this.mpcErrorService.construirErro(error);
    }
  }
}
