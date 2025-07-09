/**
 * @Componente MpcInputRadioComponent
 * Este componente exibe um campo do tipo radio customizado, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 * @Input options {RadioOption[]}: Lista de opções do radio.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-radio [formControl]="control" label="Sexo" [options]="options" [required]="true" [tabIndex]="1" [ariaLabel]="'Sexo'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

export interface RadioOption {
  label: string;
  value: string;
  checked?: boolean;
}

@Component({
  selector: 'mpc-input-radio',
  imports: [],
  templateUrl: './mpc-input-radio.component.html',
  styleUrl: './mpc-input-radio.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputRadioComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputRadioComponent),
      multi: true
    }
  ]
})
export class MpcInputRadioComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  // Variáveis
  @Input() options: RadioOption[] = [];
  public value: string = '';
  protected opcaoSelecionada?: RadioOption;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Outputs
  @Output() valueChange = new EventEmitter<any>();

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
    this.opcaoSelecionada = this.options.find(option => option.value === value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.opcaoSelecionada = this.options.find(option => option.checked);
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza a opção selecionada e notifica o Angular Forms.
   * @param option Opção selecionada do radio.
   */
  protected setValue(option: RadioOption): void {
    this.options.forEach(v => v.checked = false);
    option.checked = true;
    this.opcaoSelecionada = option;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  /**
   * Valida o campo conforme regras de obrigatório.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio()) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return { required: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @returns boolean
   */
  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required && !this.opcaoSelecionada;
  }
}
