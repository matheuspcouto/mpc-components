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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-date',
  imports: [],
  templateUrl: './mpc-input-date.component.html',
  styleUrl: './mpc-input-date.component.css'
})
export class MpcInputDateComponent implements OnInit {

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

  ngOnInit(): void {
    this.isCampoValido(this.value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  protected setValue(event: any): void {
    this.value = event.target.value as string;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isCampoObrigatorio(value)) {
      this.error.emit({ 'required': true });
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return false;
    }

    if (this.isMenorQueDataMinima(value)) {
      this.error.emit({ 'minDate': true });
      if (this.campoTocado) {
        this.errorMessage = `A data deve ser maior ou igual a ${this.formatarData(this.minDate)}`;
      }
      return false;
    }

    if (this.isMaiorQueDataMaxima(value)) {
      this.error.emit({ 'maxDate': true });
      if (this.campoTocado) {
        this.errorMessage = `A data deve ser menor ou igual a ${this.formatarData(this.maxDate)}`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private isMenorQueDataMinima(value: string | undefined): boolean {
    if (!this.minDate) return false;
    if (!this.required) return false;
    if (!value) return true;
    return new Date(value) < new Date(this.minDate);
  }

  private isMaiorQueDataMaxima(value: string | undefined): boolean {
    if (!this.maxDate) return false;
    if (!this.required) return false;
    if (!value) return true;
    return new Date(value) > new Date(this.maxDate);
  }

  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }

  private formatarData(data: string | undefined): string {
    if (!data) return '';
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];
    return `${dia}/${mes}/${ano}`;
  }

}
