/**
 * @Componente MpcInputSelectComponent
 * 
 * Este componente exibe um campo select customizado com opções dinâmicas,
 * implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() opcoes {any[]} - Array de opções do select (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input Select Básico -->
 * <mpc-input-select 
 *   label="Estado"
 *   [opcoes]="estados"
 *   [(ngModel)]="estadoSelecionado">
 * </mpc-input-select>
 * 
 * <!-- Input Select com Opções Customizadas -->
 * <mpc-input-select 
 *   label="Categoria"
 *   [opcoes]="categorias"
 *   [(ngModel)]="categoriaSelecionada">
 * </mpc-input-select>
 * 
 * <!-- Input Select Desabilitado -->
 * <mpc-input-select 
 *   label="País"
 *   [opcoes]="paises"
 *   [disabled]="true"
 *   [(ngModel)]="paisSelecionado">
 * </mpc-input-select>
 * ```
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: any): void - Define o valor do campo
 * - registerOnChange(fn: any): void - Registra função de mudança
 * - registerOnTouched(fn: any): void - Registra função de toque
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

import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

export interface SelectOption {
  /** Texto exibido na opção */
  label: string;
  /** Valor da opção */
  value: string;
  /** Indica se a opção está selecionada */
  selected: boolean;
}

@Component({
  selector: 'mpc-input-select',
  imports: [],
  templateUrl: './mpc-input-select.component.html',
  styleUrls: ['./mpc-input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputSelectComponent),
      multi: true
    }
  ]
})
export class MpcInputSelectComponent extends AccessibilityInputs implements ControlValueAccessor, Validator, OnInit {

  // ===== PROPRIEDADES PÚBLICAS =====
  /** Label do campo */
  @Input() label: string = '';
  /** Campo obrigatório */
  @Input() required: boolean = false;
  /** Campo desabilitado */
  @Input() disabled: boolean = false;
  /** Lista de opções do select */
  @Input() options: SelectOption[] = [];

  // ===== EVENTOS =====
  /** Evento emitido quando o valor muda */
  @Output() valueChange = new EventEmitter<any>();

  // ===== PROPRIEDADES PRIVADAS =====
  /** Valor atual do campo */
  public value: string = '';
  /** Opção atualmente selecionada */
  protected opcaoSelecionada?: SelectOption;
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
    this.atualizarOpcaoSelecionada();
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

  // ===== MÉTODOS DO CICLO DE VIDA =====

  /**
   * Inicializa o componente adicionando a opção "Selecione" se necessário.
   */
  ngOnInit(): void {
    // Cria uma cópia das opções para não modificar o array original
    let optionsCopy = [...this.options];

    // Verifica se já existe a opção 'Selecione' (label e value)
    const existeSelecione = optionsCopy.some(
      option => option.label === 'Selecione' && option.value === ''
    );

    // Se não existe, adiciona 'Selecione' na primeira posição
    if (!existeSelecione) {
      optionsCopy.unshift({ label: 'Selecione', value: '', selected: true });
    }

    this.options = optionsCopy;
    this.atualizarOpcaoSelecionada();
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Atualiza a opção selecionada com base no valor atual.
   */
  private atualizarOpcaoSelecionada(): void {
    if (this.options && this.options.length > 0) {
      this.opcaoSelecionada = this.options.find(option => option.value === this.value)
        || this.options.find(option => option.selected)
        || this.options[0];
    }
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
   * Atualiza a opção selecionada e notifica o Angular Forms.
   * @param option Opção selecionada do select
   */
  setValue(option: any): void {
    this.opcaoSelecionada = option;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  // ===== MÉTODOS DO VALIDATOR =====

  /**
   * Valida o campo baseado nas regras de obrigatório.
   * @param control Controle do formulário
   * @returns ValidationErrors | null - Erros de validação ou null se válido
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.disabled) return null;
    
    if (this.isCampoObrigatorio()) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return { required: true };
    }
    
    this.errorMessage = undefined;
    return null;
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @returns {boolean} true se o campo for obrigatório e estiver vazio
   */
  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required && (!this.opcaoSelecionada || this.opcaoSelecionada.value === '' || this.opcaoSelecionada.value === 'Selecione');
  }
}
