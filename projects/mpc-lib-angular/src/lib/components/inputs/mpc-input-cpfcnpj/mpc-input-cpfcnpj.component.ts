/**
 * @Componente MpcInputCpfcnpjComponent
 * 
 * Este componente exibe um campo de CPF/CNPJ customizado com validação automática
 * e máscara dinâmica, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() id {string} - ID do campo (obrigatório)
 * @Input() tabIndex {number} - Índice do campo (opcional)
 * @Input() ariaLabel {string} - Label do campo (opcional)
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Exemplo
 * ```html
 * <!-- Input CPF/CNPJ Básico -->
 * <mpc-input-cpfcnpj 
 *   label="CPF/CNPJ"
 *   [(ngModel)]="documento">
 * </mpc-input-cpfcnpj>
 * 
 * <!-- Input CPF/CNPJ Somente Leitura -->
 * <mpc-input-cpfcnpj 
 *   label="Documento"
 *   [readonly]="true"
 *   [(ngModel)]="documento">
 * </mpc-input-cpfcnpj>
 * 
 * <!-- Input CPF/CNPJ Desabilitado -->
 * <mpc-input-cpfcnpj 
 *   label="CPF/CNPJ"
 *   [disabled]="true"
 *   [(ngModel)]="documento">
 * </mpc-input-cpfcnpj>
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
import { CpfCnpjMaskPipe } from '../../../pipes/cpf-cnpj/cpf-cnpj-mask.pipe';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

@Component({
  selector: 'mpc-input-cpfcnpj',
  imports: [],
  templateUrl: './mpc-input-cpfcnpj.component.html',
  styleUrl: './mpc-input-cpfcnpj.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputCpfcnpjComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputCpfcnpjComponent),
      multi: true
    }
  ]
})
export class MpcInputCpfcnpjComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

  // Validators
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Serviços
  private readonly cpfCnpjMaskPipe = new CpfCnpjMaskPipe();

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
   * Retorna o valor do campo formatado como CPF ou CNPJ.
   * @returns string
   */
  get valorFormatado(): string {
    return this.cpfCnpjMaskPipe.transform(this.value);
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo a partir do evento de input, aplica máscara e notifica o Angular Forms.
   * @param event Evento de input do campo.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.value = this.value.replace(/\D/g, '');
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Valida o campo conforme regras de obrigatório e formato de CPF/CNPJ.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.readonly || this.disabled) { return null; }
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo CPF/CNPJ é obrigatório`;
      }
      return { required: true };
    }
    if (!this.isCpfCnpjValido(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O formato do CPF/CNPJ não é válido`;
      }
      return { regex: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    return this.required && (!value || value.length === 0);
  }

  /**
   * Valida se o valor informado é um CPF válido.
   * @param cpf Valor do campo.
   * @returns boolean
   */
  private isCPFValido(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let sum: number = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit: number = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit: number = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
    return secondDigit === parseInt(cpf.charAt(10));
  }

  /**
   * Valida se o valor informado é um CNPJ válido.
   * @param cnpj Valor do campo.
   * @returns boolean
   */
  private isCNPJValido(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }
    const calc = (base: number[]): number => {
      let sum: number = 0;
      const factors: number[] = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      for (let i = 0; i < base.length; i++) {
        sum += base[i] * factors[i];
      }
      const result: number = sum % 11;
      return result < 2 ? 0 : 11 - result;
    };
    const numbers: number[] = cnpj.split('').map(Number);
    const base: number[] = numbers.slice(0, 12);
    const digit1: number = calc(base);
    const digit2: number = calc([...base, digit1]);
    return digit1 === numbers[12] && digit2 === numbers[13];
  }

  /**
   * Verifica se o valor informado é um CPF ou CNPJ válido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCpfCnpjValido(value: string): boolean {
    if (value.length <= 11) {
      return this.isCPFValido(value);
    } else {
      return this.isCNPJValido(value);
    }
  }
}
