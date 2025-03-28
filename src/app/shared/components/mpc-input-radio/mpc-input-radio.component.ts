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
 * <mpc-input-radio label="Sexo" [id]="sexo" [tabIndex]="0" [ariaLabel]="Campo de Sexo" [options]="sexos" [required]="true" (valor)="setvalor($event)"></mpc-input-radio>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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

  // Validators
  @Input() required?: boolean = false;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected opcaoSelecionada?: RadioOption;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  ngOnInit(): void {
    const optionSelecionada = this.options.find(option => option.checked);

    if (optionSelecionada) {
      this.valor.emit(optionSelecionada.value);
    }
  }

  get Label(): string {
    return this.label.toLowerCase();
  }

  set OpcaoSelecionada(option: RadioOption) {
    this.opcaoSelecionada = option;
    if (this.isCampoValido()) { this.valor.emit(this.OpcaoSelecionada.value); }
  }

  get OpcaoSelecionada(): RadioOption {
    return this.opcaoSelecionada!;
  }

  onChange: (option: RadioOption) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(option: RadioOption): void {
    this.OpcaoSelecionada = option;
  }

  registerOnChange(fn: (value: RadioOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: RadioOption): void {
    this.options.forEach(v => v.checked = false);
    option.checked = true;
    this.OpcaoSelecionada = option;
    this.onChange(this.OpcaoSelecionada);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo ${this.Label} é obrigatório`;
      this.error.emit({ 'required': true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRequired(): boolean {
    return this.required! && this.campoTocado && !this.OpcaoSelecionada;
  }
}
