/**
 * @Componente MpcInputRadioComponent
 * Este componente é responsável por exibir um campo select do tipo radio.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * options {RadioOption[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-radio label="Sexo" [options]="options" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-radio>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AccessibilityInputs } from '../../core/accessibility-inputs';

export interface RadioOption {
  label: string;
  value: string;
  checked?: boolean;
}

@Component({
  selector: 'mpc-input-radio',
  imports: [],
  templateUrl: './mpc-input-radio.component.html',
  styleUrl: './mpc-input-radio.component.css'
})
export class MpcInputRadioComponent extends AccessibilityInputs implements OnInit {

  public label = input.required<string>();
  protected readonly = input<boolean>(false);
  protected disabled = input<boolean>(false);
  @Input() options: RadioOption[] = [];

  // Validators
  public required = input<boolean>(false);

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
      this.errorMessage = `O campo ${this.label()} é obrigatório`;
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
