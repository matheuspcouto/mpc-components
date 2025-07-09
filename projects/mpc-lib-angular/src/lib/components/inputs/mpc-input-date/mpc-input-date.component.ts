/**
 * @Componente MpcInputDateComponent
 * Este componente exibe um campo de data customizado, com validação de mínimo e máximo, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 * @Input minDate {string}: (opcional) Data mínima permitida (formato yyyy-MM-dd).
 * @Input maxDate {string}: (opcional) Data máxima permitida (formato yyyy-MM-dd).
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-date [formControl]="control" label="Data de Nascimento" [minDate]="'2000-01-01'" [maxDate]="'2025-12-31'" [required]="true" [tabIndex]="1" [ariaLabel]="'Data de Nascimento'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mpc-input-date',
  imports: [],
  templateUrl: './mpc-input-date.component.html',
  styleUrl: './mpc-input-date.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputDateComponent),
      multi: true
    }
  ]
})
export class MpcInputDateComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false; 
  @Input() required: boolean = false;
  @Input() minDate?: string = '';
  @Input() maxDate?: string = '';

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // ControlValueAccessor
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
    this.value = event.target.value as string;
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
    if (this.isMenorQueDataMinima(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `A data deve ser maior ou igual a ${this.formatarData(this.minDate)}`;
      }
      return { minDate: true };
    }
    if (this.isMaiorQueDataMaxima(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `A data deve ser menor ou igual a ${this.formatarData(this.maxDate)}`;
      }
      return { maxDate: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor do campo é menor que a data mínima permitida.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isMenorQueDataMinima(value: string | undefined): boolean {
    if (!this.minDate) return false;
    if (!value) return false;
    return new Date(value) < new Date(this.minDate);
  }

  /**
   * Verifica se o valor do campo é maior que a data máxima permitida.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isMaiorQueDataMaxima(value: string | undefined): boolean {
    if (!this.maxDate) return false;
    if (!value) return false;
    return new Date(value) > new Date(this.maxDate);
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }

  /**
   * Formata a data para o padrão dd/MM/yyyy.
   * @param data Data no formato yyyy-MM-dd.
   * @returns string
   */
  private formatarData(data: string | undefined): string {
    if (!data) return '';
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];
    return `${dia}/${mes}/${ano}`;
  }
}
