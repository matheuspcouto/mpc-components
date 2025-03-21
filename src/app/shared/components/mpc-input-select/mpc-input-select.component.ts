/**
 * @Componente MpcInputSelectComponent
 * Este componente é responsável por exibir um campo select com uma lista de strings.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * options {string[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-select label="Estado Civil" [id]="estado-civil" [tabIndex]="0" [ariaLabel]="Campo de Estado Civil" [options]="estadosCivis" [required]="true" (valorCampo)="setValorCampo($event)"></mpc-input-select>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'mpc-input-select',
  imports: [CommonModule],
  templateUrl: './mpc-input-select.component.html',
  styleUrl: './mpc-input-select.component.css'
})
export class MpcInputSelectComponent {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;

  @Output() valorCampo: EventEmitter<string> = new EventEmitter();

  value?: string;
  error: string = '';
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: string): void {
    this.value = option;
    this.onChange(this.value);
    this.onTouched();
    this.valorCampo.emit(this.value);
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo ${this.label} é obrigatório`; return false; }

    return true;
  }

  validaRequired(): boolean {
    return this.required! && !this.value;
  }

}
