/**
 * @Componente MpcInputEmailComponent
 * 
 * Este componente exibe um campo de email customizado com validação automática
 * de formato de email e ícone de validação visual, implementando ControlValueAccessor.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Email Básico -->
 * <mpc-input-email 
 *   label="Email"
 *   [(ngModel)]="email">
 * </mpc-input-email>
 * 
 * <!-- Input Email Somente Leitura -->
 * <mpc-input-email 
 *   label="Email"
 *   [readonly]="true"
 *   [(ngModel)]="email">
 * </mpc-input-email>
 * 
 * <!-- Input Email Desabilitado -->
 * <mpc-input-email 
 *   label="Email"
 *   [disabled]="true"
 *   [(ngModel)]="email">
 * </mpc-input-email>
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
import { EmailMaskPipe } from '../../../pipes/email/email-mask.pipe';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

/** Expressão regular para validação de e-mail */
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
export class MpcInputEmailComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Label do campo */
  @Input() label: string = '';
  /** Campo somente leitura */
  @Input() readonly: boolean = false;
  /** Campo desabilitado */
  @Input() disabled: boolean = false;
  /** Campo obrigatório */
  @Input() required: boolean = false;

  // ===== PROPRIEDADES PRIVADAS =====
  /** Valor atual do campo */
  public value: string = '';
  /** Mensagem de erro de validação */
  protected errorMessage?: string;
  /** Controla se o campo foi tocado */
  protected campoTocado: boolean = false;

  // ===== SERVIÇOS =====
  /** Pipe para formatação de e-mail */
  private readonly emailMaskPipe = new EmailMaskPipe();

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

  // ===== GETTERS =====

  /**
   * Retorna o valor do campo formatado como e-mail.
   * @returns {string} Valor formatado
   */
  get valorFormatado(): string {
    return this.emailMaskPipe.transform(this.value);
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
    this.value = event.target.value as string;
    this.onChange(this.value);
    this.onTouched();
  }

  // ===== MÉTODOS DO VALIDATOR =====

  /**
   * Valida o campo baseado nas regras de obrigatório e formato de e-mail.
   * @param control Controle do formulário
   * @returns ValidationErrors | null - Erros de validação ou null se válido
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

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se o valor do campo é um e-mail inválido.
   * @param value Valor do campo
   * @returns {boolean} true se o e-mail for inválido
   */
  private isEmailInvalido(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_EMAIL).test(value);
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo
   * @returns {boolean} true se o campo for obrigatório e estiver vazio
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }
}
