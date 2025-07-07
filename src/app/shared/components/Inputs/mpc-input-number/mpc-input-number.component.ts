/**
 * @Componente MpcInputNumberComponent
 * Este componente exibe um campo de número customizado com validação de mínimo e máximo, integração total com Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input min {number}: (opcional) Valor mínimo permitido.
 * @Input max {number}: (opcional) Valor máximo permitido.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-number [formControl]="control" label="Idade" [min]="0" [max]="100" [required]="true" [tabIndex]="1" [ariaLabel]="'Idade'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mpc-input-number',
  imports: [],
  templateUrl: './mpc-input-number.component.html',
  styleUrl: './mpc-input-number.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputNumberComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputNumberComponent),
      multi: true
    }
  ]
})
export class MpcInputNumberComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';
  @Input() label: string = '';

  // Validators
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() min?: number;
  @Input() max?: number;
  @Input() required: boolean = false;

  // Variáveis
  public value: number = 0.00;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo a partir do evento de input e notifica o Angular Forms.
   * @param event Evento de input do campo.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as number;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Valida o campo conforme regras de mínimo, máximo e obrigatório.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return { required: true };
    }
    if (this.isMenorQueValorMinimo(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O valor mínimo para o campo ${this.label} é ${this.min}`;
      }
      return { min: true };
    }
    if (this.isMaiorQueValorMaximo(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O valor máximo para o campo ${this.label} é ${this.max}`;
      }
      return { max: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor é menor que o mínimo permitido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isMenorQueValorMinimo(value: number | undefined): boolean {
    if (this.min == null || this.min == undefined) return false;
    if (value == null || value == undefined) return true;
    return value < this.min;
  }

  /**
   * Verifica se o valor é maior que o máximo permitido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isMaiorQueValorMaximo(value: number | undefined): boolean {
    if (this.max == null || this.max == undefined) return false;
    if (value == null || value == undefined) return false;
    return value > this.max;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCampoObrigatorio(value: number | undefined): boolean {
    if (!this.required) return false;
    return value == null;
  }
}
