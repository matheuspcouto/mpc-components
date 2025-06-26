/**
 * @Componente MpcInputTextComponent
 * Este componente é responsável por exibir um campo de texto.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * value {string}: Valor do campo.
 * readonly {boolean}: (opcional) Campo somente leitura.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * min {string}: (opcional) Número mínimo de caracteres.
 * max {string}: (opcional) Número máximo de caracteres.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-text [value]="value" label="Nome" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-text>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-text',
  imports: [],
  templateUrl: './mpc-input-text.component.html',
  styleUrl: './mpc-input-text.component.css'
})
export class MpcInputTextComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() label: string = '';
  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;

  @Input() value?: string = '';

  // Validators
  @Input() min?: string = '';
  @Input() max?: string = '';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  get Value(): string {
    return this.value as string;
  }

  protected onBlur(): void {
    this.onTouched();
    this.isCampoValido(this.Value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.Value);
  }

  onChange: (value?: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected setValue(event: any): void {
    this.Value = event.target.value as string;
    this.onChange(this.Value);
    this.onTouched();
  }

  private isCampoValido(value: string): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.validaMin(value)) {
      this.errorMessage = `O campo ${this.label} deve ter no mínimo ${this.min} caracteres`;
      this.error.emit({ min: true });
      return false;
    }

    if (this.validaMax(value)) {
      this.errorMessage = `O campo ${this.label} deve ter no máximo ${this.max} caracteres`;
      this.error.emit({ max: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaMin(value: string): boolean {
    if (this.min) {
      let minNumber = parseInt(this.min);
      return value ? value.length < minNumber : false;
    }
    return false;
  }

  private validaMax(value: string): boolean {
    if (this.max) {
      let maxNumber = parseInt(this.max);
      return value ? value.length > maxNumber : false;
    }
    return false;
  }
}
