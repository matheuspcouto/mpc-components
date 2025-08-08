/**
 * @Componente MpcInputCheckboxComponent
 * 
 * Este componente exibe um grupo de checkboxes customizados com validação,
 * implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do grupo (obrigatório)
 * @Input() opcoes {CheckboxOption[]} - Array de opções do checkbox (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Checkbox Básico -->
 * <mpc-input-checkbox 
 *   label="Interesses"
 *   [opcoes]="opcoesInteresses">
 * </mpc-input-checkbox>
 * 
 * <!-- Input Checkbox com Opções -->
 * <mpc-input-checkbox 
 *   label="Permissões"
 *   [opcoes]="opcoesPermissoes">
 * </mpc-input-checkbox>
 * 
 * <!-- Configuração das Opções -->
 * const opcoesInteresses: CheckboxOption[] = [
 *   { label: 'Tecnologia', value: 'tech', checked: false },
 *   { label: 'Esportes', value: 'sports', checked: true },
 *   { label: 'Música', value: 'music', checked: false }
 * ];
 * ```
 * 
 * @Interfaces
 * CheckboxOption: Interface para opções do checkbox
 * - label: string - Texto exibido na opção
 * - value: string - Valor da opção
 * - checked: boolean - Se a opção está marcada
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: string[]): void - Define o valor do campo
 * - registerOnChange(fn: any): void - Registra função de mudança
 * - registerOnTouched(fn: any): void - Registra função de toque
 * 
 * @Variáveis CSS
 * --mpc-color-text: Cor do texto do campo (padrão: var(--mpc-color-primary))
 * --mpc-color-error: Cor de erro (padrão: #DC3545)
 * --mpc-font-text: Fonte do campo (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 08/08/2025
 * @updated 08/08/2025
 */

import { Component, EventEmitter, Input, Output, forwardRef, OnInit } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

export interface CheckboxOption {
  label: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'mpc-input-checkbox',
  imports: [],
  templateUrl: './mpc-input-checkbox.component.html',
  styleUrls: ['./mpc-input-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputCheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputCheckboxComponent),
      multi: true
    }
  ]
})
export class MpcInputCheckboxComponent extends AccessibilityInputs implements ControlValueAccessor, Validator, OnInit {

  // Validators
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  // Variáveis
  @Input() options: CheckboxOption[] = [];
  public value: string[] = [];
  protected opcoesSelecionadas: CheckboxOption[] = [];
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Outputs
  @Output() valueChange = new EventEmitter<string[]>();

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string[]): void {
    this.value = value || [];
    this.opcoesSelecionadas = this.options.filter(option => 
      this.value.includes(option.value)
    );
    // Atualiza o estado checked das opções
    this.options.forEach(option => {
      option.checked = this.value.includes(option.value);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.opcoesSelecionadas = this.options.filter(option => option.checked);
    this.value = this.opcoesSelecionadas.map(option => option.value);
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
   * @param option Opção selecionada do checkbox.
   */
  protected setValue(option: CheckboxOption): void {
    if (this.readonly || this.disabled) return;

    option.checked = !option.checked;
    
    if (option.checked) {
      this.opcoesSelecionadas.push(option);
    } else {
      this.opcoesSelecionadas = this.opcoesSelecionadas.filter(
        selected => selected.value !== option.value
      );
    }

    this.value = this.opcoesSelecionadas.map(option => option.value);
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  /**
   * Verifica se uma opção está selecionada.
   * @param option Opção a ser verificada.
   * @returns boolean
   */
  protected isOptionSelected(option: CheckboxOption): boolean {
    return this.opcoesSelecionadas.some(selected => selected.value === option.value);
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
    return this.required && this.opcoesSelecionadas.length === 0;
  }

  /**
   * Agrupa as opções em colunas com no máximo 3 opções por coluna.
   * @returns CheckboxOption[][]
   */
  protected getColumns(): CheckboxOption[][] {
    const columns: CheckboxOption[][] = [];
    const maxOptionsPerColumn = 3;
    
    for (let i = 0; i < this.options.length; i += maxOptionsPerColumn) {
      const column = this.options.slice(i, i + maxOptionsPerColumn);
      columns.push(column);
    }
    
    return columns;
  }
}
