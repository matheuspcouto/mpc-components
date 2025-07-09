/**
 * @Componente MpcInputSenhaComponent
 * Este componente exibe um campo de senha customizado, com validação de regex, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 * @Input regexSenha {string}: (opcional) Regex para validação da senha.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-senha [formControl]="control" label="Senha" [required]="true" [tabIndex]="1" [ariaLabel]="'Senha'" [regexSenha]="'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mpc-input-senha',
  imports: [],
  templateUrl: './mpc-input-senha.component.html',
  styleUrl: './mpc-input-senha.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputSenhaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputSenhaComponent),
      multi: true
    }
  ]
})
export class MpcInputSenhaComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() regexSenha: string = '';

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;
  protected ocultarSenha: boolean = true;

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
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Valida o campo conforme regras de obrigatório e regex.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo senha é obrigatório`;
      }
      return { required: true };
    }
    if (this.isSenhaInvalida(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `A senha não está em um formato válido`;
      }
      return { regex: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor do campo é inválido conforme regex.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isSenhaInvalida(value: string | undefined): boolean {
    if (!this.regexSenha || this.regexSenha.length === 0) return false;
    if (!value) return true;
    return !new RegExp(this.regexSenha).test(value);
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
