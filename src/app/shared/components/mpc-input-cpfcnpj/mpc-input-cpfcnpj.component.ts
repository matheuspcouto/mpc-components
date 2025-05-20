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

  @Input() value?: string = '';
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);

  // Validators
  public required = input<boolean>(false);
  private regexCPF: any = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  private regexCNPJ: any = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  private mascaraCPF: string = '000.000.000-00';
  private mascaraCNPJ: string = '00.000.000/0000-00';
  protected mascara: string = this.mascaraCNPJ;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
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
    this.Value = event.target.value;
    this.onChange(this.Value);
    this.onTouched();
    this.atualizarMascara();
  }

  atualizarMascara(): void {
    if (!this.Value || this.Value.length === 0) return;
    const valorSemCaracteresEspeciais = this.removerCaracteresEspeciais(this.Value);
    this.mascara = valorSemCaracteresEspeciais.length > 11 ? this.mascaraCNPJ : this.mascaraCPF;
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo CPF/CNPJ é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex()) {
      this.errorMessage = `O formato do CPF/CNPJ não é válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    if (!this.Value || this.Value.length === 0) return false;

    const valorSemCaracteresEspeciais = this.removerCaracteresEspeciais(this.Value);

    if (valorSemCaracteresEspeciais.length > 11) {
      return !this.regexCNPJ.test(this.Value);
    } else {
      return !this.regexCPF.test(this.Value);
    }
  }

  validaRequired(): boolean {
    return this.required() && (!this.Value || this.Value.length === 0);
  }

  removerCaracteresEspeciais(cpfCnpj: string): string {
    // Remove todos os caracteres não numéricos (espaços, parênteses, traços, etc.)
    return cpfCnpj.replace(/\D/g, '');
  }
}
