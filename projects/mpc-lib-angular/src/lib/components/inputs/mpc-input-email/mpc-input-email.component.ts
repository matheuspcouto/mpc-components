/**
 * @Componente MpcInputEmailComponent
 * Este componente exibe um campo de e-mail customizado, com validação de formato, integrado ao Angular Forms.
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
 * <mpc-input-email [formControl]="control" label="E-mail" [required]="true" [tabIndex]="1" [ariaLabel]="'E-mail'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { EmailMaskPipe } from '../../../pipes/email/email-mask.pipe';

export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
@Component({
  selector: 'mpc-input-email',
  imports: [],
  templateUrl: './mpc-input-email.component.html',
  styleUrl: './mpc-input-email.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputEmailComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputEmailComponent),
      multi: true
    }
  ]
})
export class MpcInputEmailComponent implements ControlValueAccessor, Validator {

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
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Serviços
  private readonly emailMaskPipe = new EmailMaskPipe();

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
   * Retorna o valor do campo formatado como e-mail (pode aplicar máscara se necessário).
   * @returns string
   */
  get valorFormatado(): string {
    return this.emailMaskPipe.transform(this.value);
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
   * Valida o campo conforme regras de obrigatório e formato de e-mail.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo e-mail é obrigatório`;
      }
      return { required: true };
    }
    if (this.isEmailInvalido(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo e-mail não está em um formato válido`;
      }
      return { pattern: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor do campo é um e-mail inválido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isEmailInvalido(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_EMAIL).test(value);
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
}
