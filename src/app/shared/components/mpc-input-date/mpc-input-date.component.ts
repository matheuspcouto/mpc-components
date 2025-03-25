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
 *
 * Exemplo de utilização:
 * <mpc-input-date label="Data de Nascimento" [minDate]="minDate" [maxDate]="maxDate" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valorCampo)="setValorCampo($event)"></mpc-input-date>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mpc-input-date',
  imports: [CommonModule],
  templateUrl: './mpc-input-date.component.html',
  styleUrl: './mpc-input-date.component.css'
})
export class MpcInputDateComponent implements OnInit {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() required?: boolean = false;

  @Output() valorCampo: EventEmitter<string> = new EventEmitter();

  value: string = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
  error: string = '';
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  ngOnInit(): void {
    this.value = this.maxDate ? this.maxDate : this.getDataHtmlFormatada(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();

    if (this.isCampoValido()) {
      this.valorCampo.emit(this.value);
    }
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo ${this.label} é obrigatório`; return false; }
    if (this.validaMinDate() && this.minDate) { this.error = `A data deve ser maior ou igual a ${this.formatarData(this.minDate)}`; return false; }
    if (this.validaMaxDate() && this.maxDate) { this.error = `A data deve ser menor ou igual a ${this.formatarData(this.maxDate)}`; return false; }
    return true;
  }

  validaMinDate(): boolean {
    if (!this.minDate) return false;
    return new Date(this.value) < new Date(this.minDate);
  }

  validaMaxDate(): boolean {
    if (!this.maxDate) return false;
    return new Date(this.value) > new Date(this.maxDate);
  }

  validaRequired(): boolean {
    return this.required! && !this.value;
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
