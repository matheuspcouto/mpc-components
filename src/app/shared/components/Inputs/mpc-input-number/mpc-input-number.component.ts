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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-number',
  imports: [],
  templateUrl: './mpc-input-number.component.html',
  styleUrl: './mpc-input-number.component.css'
})
export class MpcInputNumberComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: number = 0;
  @Input() label: string = '';
  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() required?: boolean = false;
  @Input() min?: string = '';
  @Input() max?: string = '';

  @Output() valor: EventEmitter<number> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: number) {
    this.value = value;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  get Value(): number {
    return this.value as number;
  }

  onChange: (value?: number) => void = () => { };
  onTouched: () => void = () => { };

  protected onBlur(): void {
    this.onTouched();
    this.isCampoValido(this.Value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.Value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected setValue(event: any): void {
    this.Value = event.target.value as number;
    this.onChange(this.Value);
    this.onTouched();
  }

  private isCampoValido(value: number): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.validaRequired(value)) {
      this.errorMessage = `O campo ${this.label} é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaMin(value)) {
      this.errorMessage = `O valor mínimo para o campo ${this.label} é ${this.min}`;
      this.error.emit({ min: true });
      return false;
    }

    if (this.validaMax(value)) {
      this.errorMessage = `O valor máximo para o campo ${this.label} é ${this.max}`;
      this.error.emit({ max: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaMin(value: number): boolean {
    if (this.min) {
      let minNumber = parseInt(this.min);
      return value ? value < minNumber : false;
    }
    return false;
  }

  private validaMax(value: number): boolean {
    if (this.max) {
      let maxNumber = parseInt(this.max);
      return value ? value > maxNumber : false;
    }
    return false;
  }

  private validaRequired(value: number): boolean {
    return this.campoTocado && this.required! && value === 0;
  }

}
