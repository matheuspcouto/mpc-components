/**
 * @Componente MpcInputTextAreaComponent
 * 
 * Este componente exibe um campo de área de texto customizado com contador de caracteres
 * e validação de mínimo e máximo, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() min {number} - Número mínimo de caracteres (opcional)
 * @Input() max {number} - Número máximo de caracteres (opcional)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Text Area Básico -->
 * <mpc-input-text-area 
 *   label="Descrição"
 *   [(ngModel)]="descricao">
 * </mpc-input-text-area>
 * 
 * <!-- Input Text Area com Validação -->
 * <mpc-input-text-area 
 *   label="Comentário"
 *   [min]="10"
 *   [max]="500"
 *   [(ngModel)]="comentario">
 * </mpc-input-text-area>
 * 
 * <!-- Input Text Area Somente Leitura -->
 * <mpc-input-text-area 
 *   label="Observações"
 *   [readonly]="true"
 *   [(ngModel)]="observacoes">
 * </mpc-input-text-area>
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

import { Component, Input, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

@Component({
  selector: 'mpc-input-text-area',
  imports: [],
  templateUrl: './mpc-input-text-area.component.html',
  styleUrls: ['./mpc-input-text-area.component.scss'],
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
export class MpcInputTextAreaComponent extends AccessibilityInputs implements ControlValueAccessor, Validator, AfterViewInit {

  @ViewChild('textarea', { static: false }) textareaRef!: ElementRef<HTMLTextAreaElement>;

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