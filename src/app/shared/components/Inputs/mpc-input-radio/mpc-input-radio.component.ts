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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
export class MpcInputRadioComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() label: string = '';
  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;

  @Input() options: RadioOption[] = [];

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
      this.opcaoSelecionada = optionSelecionada;
      this.valor.emit(optionSelecionada.value);
    }

    this.isCampoValido();
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido();
  }

  protected setValue(option: RadioOption): void {
    this.options.forEach(v => v.checked = false);
    option.checked = true;
    this.opcaoSelecionada = option;
    if (this.isCampoValido()) { this.valor.emit(this.opcaoSelecionada.value); }
  }

  private isCampoValido(): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isCampoObrigatorio()) {
      this.error.emit({ required: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required && !this.opcaoSelecionada;
  }
}
