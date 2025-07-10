/**
 * @Componente MpcInputNumberComponent
 * 
 * Este componente exibe um campo numérico customizado com validação de valor mínimo
 * e máximo, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() min {number} - Valor mínimo permitido (opcional)
 * @Input() max {number} - Valor máximo permitido (opcional)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Number Básico -->
 * <mpc-input-number 
 *   label="Idade"
 *   [(ngModel)]="idade">
 * </mpc-input-number>
 * 
 * <!-- Input Number com Validação -->
 * <mpc-input-number 
 *   label="Quantidade"
 *   [min]="1"
 *   [max]="100"
 *   [(ngModel)]="quantidade">
 * </mpc-input-number>
 * 
 * <!-- Input Number Somente Leitura -->
 * <mpc-input-number 
 *   label="Código"
 *   [readonly]="true"
 *   [(ngModel)]="codigo">
 * </mpc-input-number>
 * ```
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: number): void - Define o valor do campo
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
export class MpcInputNumberComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Label do campo */
  @Input() label: string = '';
  /** Campo somente leitura */
  @Input() readonly: boolean = false;
  /** Campo desabilitado */
  @Input() disabled: boolean = false;
  /** Valor mínimo permitido */
  @Input() min?: number;
  /** Valor máximo permitido */
  @Input() max?: number;
  /** Campo obrigatório */
  @Input() required: boolean = false;

  // ===== PROPRIEDADES PRIVADAS =====
  /** Valor atual do campo */
  public value: number = 0.00;
  /** Mensagem de erro de validação */
  protected errorMessage?: string;
  /** Controla se o campo foi tocado */
  protected campoTocado: boolean = false;

  // ===== MÉTODOS DO CONTROLVALUEACCESSOR =====
  /** Função de mudança do ControlValueAccessor */
  onChange = (_: any) => { };
  /** Função de toque do ControlValueAccessor */
  onTouched = () => { };

  /**
   * Define o valor do campo.
   * @param value Valor a ser definido
   */
  writeValue(value: number): void {
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
    this.value = event.target.value as number;
    this.onChange(this.value);
    this.onTouched();
  }

  // ===== MÉTODOS DO VALIDATOR =====

  /**
   * Valida o campo baseado nas regras de mínimo, máximo e obrigatório.
   * @param control Controle do formulário
   * @returns ValidationErrors | null - Erros de validação ou null se válido
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

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se o valor é menor que o mínimo permitido.
   * @param value Valor do campo
   * @returns {boolean} true se o valor for menor que o mínimo
   */
  private isMenorQueValorMinimo(value: number | undefined): boolean {
    if (this.min == null || this.min == undefined) return false;
    if (value == null || value == undefined) return true;
    return value < this.min;
  }

  /**
   * Verifica se o valor é maior que o máximo permitido.
   * @param value Valor do campo
   * @returns {boolean} true se o valor for maior que o máximo
   */
  private isMaiorQueValorMaximo(value: number | undefined): boolean {
    if (this.max == null || this.max == undefined) return false;
    if (value == null || value == undefined) return false;
    return value > this.max;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo
   * @returns {boolean} true se o campo for obrigatório e estiver vazio
   */
  private isCampoObrigatorio(value: number | undefined): boolean {
    if (!this.required) return false;
    return value == null;
  }
}
