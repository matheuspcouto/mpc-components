/**
 * @Componente MpcInputTextComponent
 * Este componente exibe um campo de texto customizado com validação de mínimo e máximo de caracteres.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input min {number}: (opcional) Número mínimo de caracteres.
 * @Input max {number}: (opcional) Número máximo de caracteres.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';


// TODO: vincular form.control.touched com o campoTocado
@Component({
  selector: 'mpc-input-text',
  imports: [],
  templateUrl: './mpc-input-text.component.html',
  styleUrl: './mpc-input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputTextComponent),
      multi: true
    }
  ]
})
export class MpcInputTextComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() min?: number;
  @Input() max?: number;

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  /**
   * Marca o campo como tocado.
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo, emite se válido e notifica o formulário.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Métodos do ControlValueAccessor
   */
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Valida o campo.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) return null;
    if (this.isMenorQueValorMinimo(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} deve ter no mínimo ${this.min} caracteres`;
      }
      return { min: true };
    }
    if (this.isMaiorQueValorMaximo(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} deve ter no máximo ${this.max} caracteres`;
      }
      return { max: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor é menor que o mínimo.
   */
  private isMenorQueValorMinimo(value: string | undefined): boolean {
    if (this.min == null || this.min == undefined) return false;
    if (!value || value.length === 0) return this.min > 0;
    return value.length < this.min;
  }

  /**
   * Verifica se o valor é maior que o máximo.
   */
  private isMaiorQueValorMaximo(value: string | undefined): boolean {
    if (this.max == null) return false;
    if (!value) return false;
    return value.length > this.max;
  }
}
