/**
 * @Componente MpcInputSelectComponent
 * Este componente é responsável por exibir um campo select com uma lista de strings.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * options {string[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-select label="Sexo" [options]="options" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-select>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AccessibilityInputs } from '../../../core/accessibility-inputs';

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}

@Component({
  selector: 'mpc-input-select',
  imports: [],
  templateUrl: './mpc-input-select.component.html',
  styleUrl: './mpc-input-select.component.css'
})
export class MpcInputSelectComponent extends AccessibilityInputs implements OnInit {

  public label = input.required<string>();
  public disabled = input<boolean>(false);

  @Input() options: SelectOption[] = [];

  // Validators
  public required = input<boolean>(false);

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected opcaoSelecionada?: SelectOption;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  ngOnInit(): void {
    this.opcaoSelecionada = this.options.find(option => option.selected);

    // Se não há opção selecionada, adiciona a opção "Selecione"
    if (!this.opcaoSelecionada) {
      const opcaoSelecione: SelectOption = { label: 'Selecione', value: '', selected: true };
      this.options.unshift(opcaoSelecione);
      this.opcaoSelecionada = opcaoSelecione;

      // Se o campo é obrigatório, emite erro imediatamente
      if (this.required()) {
        this.error.emit({ required: true });
      }
    } else {
      // Se há uma opção selecionada, emite o valor
      this.valor.emit(this.opcaoSelecionada.value);
    }
  }

  set OpcaoSelecionada(option: SelectOption) {
    this.opcaoSelecionada = option;
    this.campoTocado = true;

    if (this.isCampoValido()) {
      this.valor.emit(this.opcaoSelecionada?.value);
    }
  }

  get OpcaoSelecionada(): SelectOption {
    return this.opcaoSelecionada!;
  }

  onChange: (option: SelectOption) => void = () => { };
  onTouched: () => void = () => { };

  registerOnChange(fn: (option: SelectOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: any): void {
    this.OpcaoSelecionada = option as SelectOption;
    this.onChange(this.OpcaoSelecionada);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.disabled()) {
      return true;
    }

    if (this.validaRequired()) {
      this.errorMessage = `O campo ${this.label()} é obrigatório`;
      this.error.emit({ 'required': true });
      return false;
    }

    this.errorMessage = undefined;
    this.error.emit({});
    return true;
  }

  validaRequired(): boolean {
    return this.required() && this.campoTocado &&
      (!this.OpcaoSelecionada ||
        this.OpcaoSelecionada.value === '' ||
        this.OpcaoSelecionada.value === 'Selecione');
  }
}
