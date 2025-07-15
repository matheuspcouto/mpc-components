/**
 * @Componente MpcInputDateComponent
 * 
 * Este componente exibe um campo de data customizado com validação de formato
 * e data mínima/máxima, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() min {string} - Data mínima permitida (opcional, formato: YYYY-MM-DD)
 * @Input() max {string} - Data máxima permitida (opcional, formato: YYYY-MM-DD)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Date Básico -->
 * <mpc-input-date 
 *   label="Data de Nascimento"
 *   [(ngModel)]="dataNascimento">
 * </mpc-input-date>
 * 
 * <!-- Input Date com Validação -->
 * <mpc-input-date 
 *   label="Data de Início"
 *   [min]="2024-01-01"
 *   [max]="2024-12-31"
 *   [(ngModel)]="dataInicio">
 * </mpc-input-date>
 * 
 * <!-- Input Date Somente Leitura -->
 * <mpc-input-date 
 *   label="Data de Cadastro"
 *   [readonly]="true"
 *   [(ngModel)]="dataCadastro">
 * </mpc-input-date>
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

@Component({
  selector: 'mpc-input-date',
  imports: [],
  templateUrl: './mpc-input-date.component.html',
  styleUrls: ['./mpc-input-date.component.scss'],
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
export class MpcInputDateComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Label do campo */
  @Input() label: string = '';
  /** Campo somente leitura */
  @Input() readonly: boolean = false;
  /** Campo desabilitado */
  @Input() disabled: boolean = false;
  /** Campo obrigatório */
  @Input() required: boolean = false;
  /** Data mínima permitida (formato yyyy-MM-dd) */
  @Input() minDate?: string = '';
  /** Data máxima permitida (formato yyyy-MM-dd) */
  @Input() maxDate?: string = '';

  // ===== PROPRIEDADES PRIVADAS =====
  /** Valor atual do campo */
  public value: string = '';
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

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se o valor do campo é menor que a data mínima permitida.
   * @param value Valor do campo
   * @returns {boolean} true se a data for menor que o mínimo
   */
  private isMenorQueDataMinima(value: string | undefined): boolean {
    if (!this.minDate) return false;
    if (!value) return false;
    return new Date(value) < new Date(this.minDate);
  }

  /**
   * Verifica se o valor do campo é maior que a data máxima permitida.
   * @param value Valor do campo
   * @returns {boolean} true se a data for maior que o máximo
   */
  private isMaiorQueDataMaxima(value: string | undefined): boolean {
    if (!this.maxDate) return false;
    if (!value) return false;
    return new Date(value) > new Date(this.maxDate);
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

  /**
   * Formata a data para o padrão dd/MM/yyyy.
   * @param data Data no formato yyyy-MM-dd
   * @returns {string} Data formatada
   */
  private formatarData(data: string | undefined): string {
    if (!data) return '';
    const ano = data.split('-')[0];
    const mes = data.split('-')[1];
    const dia = data.split('-')[2];
    return `${dia}/${mes}/${ano}`;
  }
}
