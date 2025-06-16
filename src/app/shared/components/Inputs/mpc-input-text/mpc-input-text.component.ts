/**
 * @Componente MpcInputTextComponent
 * Este componente é responsável por exibir um campo de texto.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * value {string}: (opcional) Valor do campo.
 * readonly {boolean}: (opcional) Campo somente leitura.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * min {string}: (opcional) Número mínimo de caracteres.
 * max {string}: (opcional) Número máximo de caracteres.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-text label="Nome" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-text>
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
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  @Input() value?: string = '';

  // Validators
  @Input() required: boolean = false;
  @Input() min: string = '';
  @Input() max: string = '';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
  }

  get Value(): string {
    return this.value as string;
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

  setValue(event: any): void {
    this.Value = event.target.value as string;
    this.onChange(this.Value);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.validaRequired()) {
      this.errorMessage = `O campo ${this.label} é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaMin()) {
      this.errorMessage = `O campo ${this.label} deve ter no mínimo ${this.min} caracteres`;
      this.error.emit({ min: true });
      return false;
    }

    if (this.validaMax()) {
      this.errorMessage = `O campo ${this.label} deve ter no máximo ${this.max} caracteres`;
      this.error.emit({ max: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaMin(): boolean {
    if (this.min) {
      let minNumber = parseInt(this.min);
      return this.Value ? this.Value.length < minNumber : false;
    }
    return false;
  }

  validaMax(): boolean {
    if (this.max) {
      let maxNumber = parseInt(this.max);
      return this.Value ? this.Value.length > maxNumber : false;
    }
    return false;
  }

  validaRequired(): boolean {
    return this.campoTocado && (this.required! || this.min.length > 0) && this.Value.length === 0;
  }
}
