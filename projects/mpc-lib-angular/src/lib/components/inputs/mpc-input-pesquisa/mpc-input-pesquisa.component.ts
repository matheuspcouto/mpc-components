/**
 * @Componente MpcInputPesquisaComponent
 * 
 * Este componente exibe um campo de pesquisa customizado com ícone de busca
 * e funcionalidade de limpar, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() placeholder {string} - Texto de placeholder (opcional)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Eventos
 * @Output() pesquisar {EventEmitter<string>} - Emite o termo de pesquisa
 * @Output() limpar {EventEmitter<void>} - Emite quando o campo é limpo
 * 
 * @Exemplo
 * ```html
 * <!-- Input Pesquisa Básico -->
 * <mpc-input-pesquisa 
 *   label="Pesquisar"
 *   placeholder="Digite para pesquisar..."
 *   [(ngModel)]="termoPesquisa"
 *   (pesquisar)="onPesquisar($event)"
 *   (limpar)="onLimpar()">
 * </mpc-input-pesquisa>
 * 
 * <!-- Input Pesquisa com Placeholder -->
 * <mpc-input-pesquisa 
 *   label="Buscar"
 *   placeholder="Nome, email ou telefone..."
 *   [(ngModel)]="busca"
 *   (pesquisar)="realizarBusca($event)">
 * </mpc-input-pesquisa>
 * ```
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
 * --mpc-color-border: Cor da borda do campo (padrão: var(--mpc-color-tertiary))
 * --mpc-color-border-success: Cor da borda de sucesso (padrão: var(--mpc-color-secondary))
 * --mpc-font-text: Fonte do campo (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

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
export class MpcInputPesquisaComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

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
