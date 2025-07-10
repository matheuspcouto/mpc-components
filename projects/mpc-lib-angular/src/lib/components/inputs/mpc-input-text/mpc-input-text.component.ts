/**
 * @Componente MpcInputTextComponent
 * 
 * Este componente exibe um campo de texto customizado com validação de mínimo e máximo
 * de caracteres, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() min {number} - Número mínimo de caracteres (opcional)
 * @Input() max {number} - Número máximo de caracteres (opcional)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Text Básico -->
 * <mpc-input-text 
 *   label="Nome"
 *   [(ngModel)]="nome">
 * </mpc-input-text>
 * 
 * <!-- Input Text com Validação -->
 * <mpc-input-text 
 *   label="Senha"
 *   [min]="6"
 *   [max]="20"
 *   [(ngModel)]="senha">
 * </mpc-input-text>
 * 
 * <!-- Input Text Somente Leitura -->
 * <mpc-input-text 
 *   label="Código"
 *   [readonly]="true"
 *   [(ngModel)]="codigo">
 * </mpc-input-text>
 * ```
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: string): void - Define o valor do campo
 * - registerOnChange(fn: any): void - Registra função de mudança
 * - registerOnTouched(fn: any): void - Registra função de toque
 * 
 * Validator: Interface para validação de campos
 * - validate(control: AbstractControl): ValidationErrors | null - Valida o campo
 * 
 * @Variáveis CSS
 * --mpc-color-text: Cor do texto do campo (padrão: var(--mpc-color-primary))
 * --mpc-color-error: Cor de erro (padrão: #DC3545)
 * --mpc-color-border: Cor da borda do campo (padrão: var(--mpc-color-tertiary))
 * --mpc-color-border-success: Cor da borda de sucesso (padrão: var(--mpc-color-secondary))
 * --mpc-font-text: Fonte do campo (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
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

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Label do campo */
  @Input() label: string = '';
  /** Campo somente leitura */
  @Input() readonly: boolean = false;
  /** Campo desabilitado */
  @Input() disabled: boolean = false;
  /** Número mínimo de caracteres */
  @Input() min?: number;
  /** Número máximo de caracteres */
  @Input() max?: number;

  // ===== PROPRIEDADES PRIVADAS =====
  /** Valor atual do campo */
  public value: string = '';
  /** Mensagem de erro de validação */
  protected errorMessage?: string;
  /** Controla se o campo foi tocado */
  protected campoTocado: boolean = false;

  // ===== MÉTODOS PROTEGIDOS =====

  /**
   * Marca o campo como tocado quando recebe foco.
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo, emite se válido e notifica o formulário.
   * @param event Evento de input
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.onChange(this.value);
    this.onTouched();
  }

  // ===== MÉTODOS DO CONTROLVALUEACCESSOR =====

  /** Função de mudança do ControlValueAccessor */
  onChange = (_: any) => { };
  /** Função de toque do ControlValueAccessor */
  onTouched = () => { };

  /**
   * Define o valor do campo.
   * @param value Valor a ser definido
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   * Registra a função de mudança.
   * @param fn Função de mudança
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra a função de toque.
   * @param fn Função de toque
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ===== MÉTODOS DO VALIDATOR =====

  /**
   * Valida o campo baseado nas regras de mínimo e máximo de caracteres.
   * @param control Controle do formulário
   * @returns ValidationErrors | null - Erros de validação ou null se válido
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

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se o valor é menor que o mínimo definido.
   * @param value Valor a ser verificado
   * @returns {boolean} true se o valor for menor que o mínimo
   */
  private isMenorQueValorMinimo(value: string | undefined): boolean {
    if (this.min == null || this.min == undefined) return false;
    if (!value || value.length === 0) return this.min > 0;
    return value.length < this.min;
  }

  /**
   * Verifica se o valor é maior que o máximo definido.
   * @param value Valor a ser verificado
   * @returns {boolean} true se o valor for maior que o máximo
   */
  private isMaiorQueValorMaximo(value: string | undefined): boolean {
    if (this.max == null) return false;
    if (!value) return false;
    return value.length > this.max;
  }
}
