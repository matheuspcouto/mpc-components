/**
 * @Componente MpcInputTelefoneComponent
 * Este componente exibe um campo de telefone customizado com máscara e validação, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-telefone [formControl]="control" label="Telefone" [required]="true" [tabIndex]="1" [ariaLabel]="'Telefone'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { TelefoneMaskPipe } from '../../../pipes/telefone/telefone-mask.pipe';

export const REGEX_TELEFONE = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

@Component({
  selector: 'mpc-input-telefone',
  imports: [],
  templateUrl: './mpc-input-telefone.component.html',
  styleUrl: './mpc-input-telefone.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputTelefoneComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputTelefoneComponent),
      multi: true
    }
  ]
})
export class MpcInputTelefoneComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Serviços
  private readonly telefoneMaskPipe = new TelefoneMaskPipe();

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
   * Retorna o valor do telefone formatado com máscara.
   * @returns string
   */
  get valorFormatado(): string {
    return this.telefoneMaskPipe.transform(this.value);
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo a partir do evento de input, aplica máscara e notifica o Angular Forms.
   * @param event Evento de input do campo.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.value = this.value.replace(/\D/g, '');
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Valida o campo conforme regras de obrigatório e formato de telefone.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo telefone é obrigatório`;
      }
      return { required: true };
    }
    if (this.isTelefoneInvalido(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo telefone não está em um formato válido. Tente (00) 00000-0000`;
      }
      return { pattern: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor do telefone é inválido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isTelefoneInvalido(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_TELEFONE).test(value);
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    return this.required && (!value || value.length === 0);
  }
}
