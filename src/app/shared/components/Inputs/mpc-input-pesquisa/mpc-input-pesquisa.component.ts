/**
 * @Componente MpcInputPesquisaComponent
 * Este componente é responsável por exibir um campo de entrada de pesquisa.
 *
 * id {string}: (opcional) Id do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {string}: Valor Inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-pesquisa [value]="value" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-pesquisa>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-pesquisa',
  imports: [],
  templateUrl: './mpc-input-pesquisa.component.html',
  styleUrl: './mpc-input-pesquisa.component.css'
})
export class MpcInputPesquisaComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;
  @Input() label: string = '';

  @Output() pesquisarEvent = new EventEmitter<void>();

  // Validators
  @Input() min?: string = '';

  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  @Input() value?: string;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  /**
   * Inicializa a validação do campo.
   */
  ngOnInit(): void {
    this.isCampoValido(this.value);
  }

  /**
   * Retorna o valor mínimo como número.
   */
  get minLength(): number {
    return parseInt(this.min || '0');
  }

  /**
   * Emite o evento de pesquisa.
   */
  protected pesquisar(): void {
    this.pesquisarEvent.emit();
  }

  /**
   * Marca o campo como tocado e valida.
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  /**
   * Atualiza o valor do campo e valida.
   */
  protected setValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.isCampoValido(this.value);
  }

  /**
   * Valida o campo.
   */
  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isMenorQueValorMinimo(value)) {
      this.error.emit({ min: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo deve ter no mínimo ${this.min} caracteres`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  /**
   * Verifica se o valor é menor que o mínimo.
   */
  private isMenorQueValorMinimo(value: string | undefined): boolean {
    if (!this.minLength) return false;
    if (!value || value.length === 0) return true;
    return value.length < this.minLength;
  }

  /**
   * Limpa o valor do campo.
   */
  protected limparPesquisa(): void {
    this.value = '';
  }
}
