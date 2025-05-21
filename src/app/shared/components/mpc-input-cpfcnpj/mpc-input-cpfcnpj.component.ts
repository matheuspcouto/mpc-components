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
 *
 * Exemplo de utilização:
 * <mpc-input-cpfcnpj [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-cpfcnpj>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AccessibilityInputs } from '../../core/accessibility-inputs';

@Component({
  selector: 'mpc-input-cpfcnpj',
  imports: [NgxMaskDirective],
  templateUrl: './mpc-input-cpfcnpj.component.html',
  styleUrl: './mpc-input-cpfcnpj.component.css'
})
export class MpcInputCpfcnpjComponent extends AccessibilityInputs {

  @Input() value?: string;
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);

  // Validators
  public required = input<boolean>(false);
  private mascaraCPF: string = '000.000.000-009';
  private mascaraCNPJ: string = '00.000.000/0000-00';
  protected mascara: string = this.mascaraCPF;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value.replace(/\D/g, '')); }
  }

  get Value(): string {
    return this.value as string;
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

  setValue(event: any): void {
    this.Value = event.target.value as string;
    this.onChange(this.Value);
    this.onTouched();
    this.atualizarMascara();
  }

  atualizarMascara(): void {
    if (!this.Value || this.Value.length === 0) return;
    const valorSemCaracteresEspeciais = this.Value.replace(/\D/g, '');
    this.mascara = valorSemCaracteresEspeciais.length > 11 ? this.mascaraCNPJ : this.mascaraCPF;
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo CPF/CNPJ é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (!this.isValidCpfOrCnpj()) {
      this.errorMessage = `O formato do CPF/CNPJ não é válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRequired(): boolean {
    return this.required() && (!this.Value || this.Value.length === 0);
  }

  isValidCPF(): boolean {
    let cpf = this.Value.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) firstDigit = 0;
    if (firstDigit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) secondDigit = 0;
    return secondDigit === parseInt(cpf.charAt(10));
  }

  isValidCNPJ(): boolean {
    let cnpj = this.Value.replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    const calc = (base: number[]) => {
      let sum = 0;
      const factors = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      for (let i = 0; i < base.length; i++) {
        sum += base[i] * factors[i];
      }
      const result = sum % 11;
      return result < 2 ? 0 : 11 - result;
    };

    const numbers = cnpj.split('').map(Number);
    const base = numbers.slice(0, 12);
    const digit1 = calc(base);
    const digit2 = calc([...base, digit1]);

    return digit1 === numbers[12] && digit2 === numbers[13];
  }

  isValidCpfOrCnpj(): boolean {
    const valorLimpo = this.Value.replace(/\D/g, '');
    if (valorLimpo.length <= 11) {
      return this.isValidCPF();
    } else {
      return this.isValidCNPJ();
    }
  }



}
