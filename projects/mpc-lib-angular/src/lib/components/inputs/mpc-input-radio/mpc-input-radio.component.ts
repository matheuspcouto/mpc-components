/**
 * @Componente MpcInputRadioComponent
 * 
 * Este componente exibe um grupo de botões de rádio customizados com validação,
 * implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do grupo (obrigatório)
 * @Input() opcoes {RadioOption[]} - Array de opções do rádio (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Radio Básico -->
 * <mpc-input-radio 
 *   label="Sexo"
 *   [opcoes]="opcoesSexo"
 *   [(ngModel)]="sexo">
 * </mpc-input-radio>
 * 
 * <!-- Input Radio com Opções -->
 * <mpc-input-radio 
 *   label="Status"
 *   [opcoes]="opcoesStatus"
 *   [(ngModel)]="status">
 * </mpc-input-radio>
 * 
 * <!-- Configuração das Opções -->
 * const opcoesSexo: RadioOption[] = [
 *   { label: 'Masculino', value: 'M' },
 *   { label: 'Feminino', value: 'F' }
 * ];
 * ```
 * 
 * @Interfaces
 * RadioOption: Interface para opções do rádio
 * - label: string - Texto exibido na opção
 * - value: string - Valor da opção
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: string): void - Define o valor do campo
 * - registerOnChange(fn: any): void - Registra função de mudança
 * - registerOnTouched(fn: any): void - Registra função de toque
 * 
 * @Variáveis CSS
 * --mpc-color-text: Cor do texto do campo (padrão: var(--mpc-color-primary))
 * --mpc-color-error: Cor de erro (padrão: #DC3545)
 * --mpc-font-text: Fonte do campo (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

export interface RadioOption {
  label: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'mpc-input-radio',
  imports: [],
  templateUrl: './mpc-input-radio.component.html',
  styleUrls: ['./mpc-input-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputRadioComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputRadioComponent),
      multi: true
    }
  ]
})
export class MpcInputRadioComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  // Variáveis
  @Input() options: RadioOption[] = [];
  public value: string = '';
  protected opcaoSelecionada?: RadioOption;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Outputs
  @Output() valueChange = new EventEmitter<any>();

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
    this.opcaoSelecionada = this.options.find(option => option.value === value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.opcaoSelecionada = this.options.find(option => option.checked);
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza a opção selecionada e notifica o Angular Forms.
   * @param option Opção selecionada do radio.
   */
  protected setValue(option: RadioOption): void {
    this.options.forEach(v => v.checked = false);
    option.checked = true;
    this.opcaoSelecionada = option;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  /**
   * Valida o campo conforme regras de obrigatório.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio()) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return { required: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @returns boolean
   */
  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required && !this.opcaoSelecionada;
  }
}
