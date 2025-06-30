/**
 * @Componente MpcInputNumberComponent
 * Este componente é responsável por exibir um campo de entrada de numero.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * min {string}: (opcional) Valor mínimo permitido.
 * max {string}: (opcional) Valor máximo permitido.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {number}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-number [value]="value" label="Idade" [min]="0" [max]="100" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-number>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-number',
  imports: [],
  templateUrl: './mpc-input-number.component.html',
  styleUrl: './mpc-input-number.component.css'
})
export class MpcInputNumberComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: number;
  @Input() label: string = '';
  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() min?: number;
  @Input() max?: number;

  @Output() valor: EventEmitter<number> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  ngOnInit(): void {
    this.isCampoValido(this.value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  protected setValue(event: any): void {
    this.value = event.target.value as number;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  private isCampoValido(value: number | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isMenorQueValorMinimo(value)) {
      this.error.emit({ min: true });
      if (this.campoTocado) {
        this.errorMessage = `O valor mínimo para o campo ${this.label} é ${this.min}`;
      }
      return false;
    }

    if (this.isMaiorQueValorMaximo(value)) {
      this.error.emit({ max: true });
      if (this.campoTocado) {
        this.errorMessage = `O valor máximo para o campo ${this.label} é ${this.max}`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private isMenorQueValorMinimo(value: number | undefined): boolean {
    if (!this.min) return false;
    if (!value) return true;
    return value < this.min;
  }

  private isMaiorQueValorMaximo(value: number | undefined): boolean {
    if (!this.max) return false;
    if (!value) return true;
    return value > this.max;
  }

}
