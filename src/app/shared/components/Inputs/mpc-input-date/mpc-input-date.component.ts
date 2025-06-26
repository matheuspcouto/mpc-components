/**
 * @Componente MpcInputDateComponent
 * Este componente é responsável por exibir um campo de entrada de data.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * minDate {date}: (opcional) Data mínima permitida.
 * maxDate {date}: (opcional) Data máxima permitida.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {string}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-date [value]="value" label="Data de Nascimento" [minDate]="minDate" [maxDate]="maxDate" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-date>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-date',
  imports: [],
  templateUrl: './mpc-input-date.component.html',
  styleUrl: './mpc-input-date.component.css'
})
export class MpcInputDateComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: string = '';
  @Input() label: string = '';
  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() required?: boolean = false;
  @Input() minDate?: string = '';
  @Input() maxDate?: string = '';

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

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  protected onBlur(): void {
    this.onTouched();
    this.isCampoValido(this.Value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.Value);
  }

  registerOnChange(fn: (value: string) => void): void {
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

    if (this.validaRequired(value)) {
      this.errorMessage = `O campo ${this.label} é obrigatório`;
      this.error.emit({ 'required': true });
      return false;
    }

    if (this.validaMinDate(value) && this.minDate) {
      this.errorMessage = `A data deve ser maior ou igual a ${this.formatarData(this.minDate)}`;
      this.error.emit({ 'minDate': true });
      return false;
    }

    if (this.validaMaxDate(value) && this.maxDate) {
      this.errorMessage = `A data deve ser menor ou igual a ${this.formatarData(this.maxDate)}`;
      this.error.emit({ 'maxDate': true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaMinDate(value: string): boolean {
    if (!this.minDate) return false;
    return new Date(value) < new Date(this.minDate);
  }

  private validaMaxDate(value: string): boolean {
    if (!this.maxDate) return false;
    return new Date(value) > new Date(this.maxDate);
  }

  private validaRequired(value: string): boolean {
    return this.campoTocado && this.required! && value.length === 0;
  }

  private formatarData(data: string): string {
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];
    return `${dia}/${mes}/${ano}`;
  }

}
