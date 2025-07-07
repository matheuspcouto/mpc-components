/**
 * @Componente MpcInputPesquisaComponent
 * Este componente exibe um campo de pesquisa customizado, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input label {string}: (opcional) Label do campo.
 * @Input min {string}: (opcional) Número mínimo de caracteres.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-pesquisa [formControl]="control" label="Pesquisar" [min]="3" [tabIndex]="1" [ariaLabel]="'Pesquisar'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mpc-input-pesquisa',
  imports: [],
  templateUrl: './mpc-input-pesquisa.component.html',
  styleUrl: './mpc-input-pesquisa.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputPesquisaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputPesquisaComponent),
      multi: true
    }
  ]
})
export class MpcInputPesquisaComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';  

  // Validators
  @Input() label: string = '';
  @Input() min?: number = 0;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Outputs
  @Output() acao = new EventEmitter<string>();

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
   * Retorna o valor mínimo de caracteres como número.
   * @returns number
   */
  get minLength(): number {
    return this.min || 0;
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
  protected setValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Valida o campo conforme regras de mínimo de caracteres.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isMenorQueValorMinimo(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo deve ter no mínimo ${this.min} caracteres`;
      }
      return { min: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor é menor que o mínimo de caracteres permitido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isMenorQueValorMinimo(value: string | undefined): boolean {
    if (!this.minLength) return false;
    if (!value || value.length === 0) return true;
    return value.length < this.minLength;
  }

  /**
   * Limpa o valor do campo de pesquisa.
   */
  protected limparPesquisa(): void {
    this.value = '';
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Emite o valor do campo de pesquisa.
   */
  protected pesquisar(): void {
    this.acao.emit(this.value);
  }
}
