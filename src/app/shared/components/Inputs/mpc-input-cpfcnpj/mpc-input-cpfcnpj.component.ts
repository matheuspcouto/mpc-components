/**
 * @Componente MpcInputCpfcnpjComponent
 * Este componente é responsável por exibir um campo de entrada de CPF ou CNPJ.
 *
 * id {string}: (opcional) Id do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {string}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-cpfcnpj [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" [value]="value" (valor)="setvalor($event)"></mpc-input-cpfcnpj>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { CpfCnpjMaskPipe } from './cpf-cnpj-mask.pipe';

// TODO: Corrigir recuperação de Dados
@Component({
  selector: 'mpc-input-cpfcnpj',
  imports: [],
  templateUrl: './mpc-input-cpfcnpj.component.html',
  styleUrl: './mpc-input-cpfcnpj.component.css'
})
export class MpcInputCpfcnpjComponent implements OnChanges {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: string = '';
  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() required: boolean = false;

  @Output() valor: EventEmitter<string> = new EventEmitter<string>();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter<ValidationErrors>();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  private readonly cpfCnpjMaskPipe = new CpfCnpjMaskPipe();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
      if (this.value) {
        this.isCampoValido(this.value);
      }
    }
  }

  get valorFormatado(): string {
    return this.cpfCnpjMaskPipe.transform(this.value);
  }

  protected onBlur(): void {
    this.onTouched();
    this.isCampoValido(this.value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.onChange(this.value);
    this.onTouched();
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value.replace(/\D/g, '')); }
  }

  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) {
      return true;
    }

    if (this.validaRequired(value)) {
      this.errorMessage = `O campo CPF/CNPJ é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (!this.isValidCpfOrCnpj(value)) {
      this.errorMessage = `O formato do CPF/CNPJ não é válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaRequired(value: string | undefined): boolean {
    return this.required && (!value || value.length === 0);
  }

  private isValidCPF(cpf: string | undefined): boolean {
    cpf = cpf ? cpf.replace(/\D/g, '') : '';

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

  private isValidCNPJ(cnpj: string | undefined): boolean {
    cnpj = cnpj ? cnpj.replace(/[^\d]+/g, '') : '';

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

  private isValidCpfOrCnpj(value: string | undefined): boolean {
    if (value && value.length !== 11) {
      return this.isValidCPF(value);
    } else {
      return this.isValidCNPJ(value);
    }
  }
}
