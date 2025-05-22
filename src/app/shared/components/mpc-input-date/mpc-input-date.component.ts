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
 *
 * Exemplo de utilização:
 * <mpc-input-date label="Data de Nascimento" [minDate]="minDate" [maxDate]="maxDate" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-date>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AccessibilityInputs } from '../../core/accessibility-inputs';

@Component({
  selector: 'mpc-input-date',
  imports: [],
  templateUrl: './mpc-input-date.component.html',
  styleUrl: './mpc-input-date.component.css'
})
export class MpcInputDateComponent extends AccessibilityInputs {

  public label = input.required<string>();
  public readonly = input<boolean>(false);
  public disabled = input<boolean>(false);
  @Input() value?: string = "";

  // Validators
  public minDate = input<string>('');
  public maxDate = input<string>('');
  public required = input<boolean>(false);

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string = '';
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
  }

  get Value(): string {
    return this.value as string;
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  registerOnChange(fn: (value: string) => void): void {
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
    if (this.readonly() || this.disabled()) { return true; }

    if (this.validaRequired()) {
      this.errorMessage = `O campo ${this.label()} é obrigatório`;
      this.error.emit({ 'required': true });
      return false;
    }

    if (this.validaMinDate() && this.minDate) {
      this.errorMessage = `A data deve ser maior ou igual a ${this.formatarData(this.minDate())}`;
      this.error.emit({ 'minDate': true });
      return false;
    }

    if (this.validaMaxDate() && this.maxDate) {
      this.errorMessage = `A data deve ser menor ou igual a ${this.formatarData(this.maxDate())}`;
      this.error.emit({ 'maxDate': true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaMinDate(): boolean {
    if (!this.minDate) return false;
    return new Date(this.Value) < new Date(this.minDate());
  }

  validaMaxDate(): boolean {
    if (!this.maxDate) return false;
    return new Date(this.Value) > new Date(this.maxDate());
  }

  validaRequired(): boolean {
    return this.campoTocado && this.required()! && this.Value.length === 0;
  }

  getDataHtmlFormatada(date: string): string {
    const ano = date.split('/')[2];
    const mes = date.split('/')[1];
    const dia = date.split('/')[0];
    return `${ano}-${mes}-${dia}`;
  }

  formatarData(data: string): string {
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];
    return `${dia}/${mes}/${ano}`;
  }

}
