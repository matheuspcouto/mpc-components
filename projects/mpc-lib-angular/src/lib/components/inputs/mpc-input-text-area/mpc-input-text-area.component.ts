/**
 * @Componente MpcInputTextAreaComponent
 * Este componente exibe uma área de texto customizada com contagem de caracteres, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input readonly {boolean}: (opcional) Campo somente leitura.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input min {number}: (opcional) Número mínimo de caracteres.
 * @Input max {number}: (opcional) Número máximo de caracteres.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-text-area [formControl]="control" label="Descrição" [min]="10" [max]="200" [required]="true" [tabIndex]="1" [ariaLabel]="'Descrição'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 07/07/2025
 */

import { Component, Input, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mpc-input-text-area',
  imports: [],
  templateUrl: './mpc-input-text-area.component.html',
  styleUrl: './mpc-input-text-area.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputTextAreaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputTextAreaComponent),
      multi: true
    }
  ]
})
export class MpcInputTextAreaComponent implements ControlValueAccessor, Validator, AfterViewInit {

  @ViewChild('textarea', { static: false }) textareaRef!: ElementRef<HTMLTextAreaElement>;

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

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

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
    // Ajusta a altura quando o valor é definido programaticamente
    setTimeout(() => {
      if (this.textareaRef) {
        this.ajustarAltura(this.textareaRef.nativeElement);
      }
    });
  }

  ngAfterViewInit(): void {
    // Ajusta a altura inicial se houver valor
    if (this.value && this.textareaRef) {
      setTimeout(() => {
        this.ajustarAltura(this.textareaRef.nativeElement);
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Retorna a quantidade de caracteres digitados no campo.
   * @returns number
   */
  get qtdCaracteres(): number {
    return this.value ? this.value.length : 0;
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
    this.ajustarAltura(event.target);
  }

  /**
   * Ajusta automaticamente a altura do textarea conforme o conteúdo.
   * @param textarea Elemento textarea.
   */
  private ajustarAltura(textarea: HTMLTextAreaElement): void {
    // Reset da altura para calcular corretamente
    textarea.style.height = 'auto';
    // Define a nova altura baseada no scrollHeight
    textarea.style.height = textarea.scrollHeight + 'px';
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
        this.errorMessage = `O campo ${this.label} deve ter no mínimo ${this.min} caracteres`;
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
    if (!this.min) return false;
    if (!value || value.length === 0) return true;
    return value.length < this.min;
  }
} 