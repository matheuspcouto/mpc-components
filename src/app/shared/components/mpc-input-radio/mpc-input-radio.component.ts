/**
 * @Componente MpcInputRadioComponent
 * Este componente é responsável por exibir um campo select do tipo radio.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * options {RadioOption[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-radio label="Sexo" [id]="sexo" [tabIndex]="0" [ariaLabel]="Campo de Sexo" [options]="sexos" [required]="true" (valorCampo)="setValorCampo($event)"></mpc-input-radio>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface RadioOption {
  label: string;
  value: string;
  checked?: boolean;
}

@Component({
  selector: 'mpc-input-radio',
  imports: [CommonModule],
  templateUrl: './mpc-input-radio.component.html',
  styleUrl: './mpc-input-radio.component.css'
})
export class MpcInputRadioComponent implements OnInit {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() options: RadioOption[] = [];
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;
  @Input() value?: string;

  // Validators
  @Input() required?: boolean = false;

  @Output() valorCampo: EventEmitter<string> = new EventEmitter();

  protected error?: string;
  protected campoTocado: boolean = false;

  ngOnInit(): void {
    const optionSelecionada = this.options.find(option => option.checked);

    if (optionSelecionada) {
      this.valorCampo.emit(optionSelecionada.value);
    }
  }

  get Label(): string {
    return this.label.toLowerCase();
  }

  set Value(option: string) {
    this.value = option;
    if (this.isCampoValido()) { this.valorCampo.emit(this.Value); }
  }

  get Value(): string {
    return this.value!;
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.Value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: RadioOption): void {
    this.options.forEach(v => v.checked = false);
    option.checked = true;
    this.Value = option.value;
    this.onChange(this.Value);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo ${this.Label} é obrigatório`; return false; }

    this.error = undefined;
    return true;
  }

  validaRequired(): boolean {
    return this.required! && this.campoTocado && this.Value.length === 0;
  }
}
