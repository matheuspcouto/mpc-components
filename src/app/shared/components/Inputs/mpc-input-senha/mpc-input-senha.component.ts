/**
 * @Componente MpcInputSenhaComponent
 * Este componente é responsável por exibir um campo de entrada de senha.
 *
 * id {string}: (opcional) Id do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 *
 * Exemplo de utilização:
 * <mpc-input-senha [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-senha>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

// TODO: Corrigir recuperação de Dados
@Component({
  selector: 'mpc-input-senha',
  imports: [],
  templateUrl: './mpc-input-senha.component.html',
  styleUrl: './mpc-input-senha.component.css'
})
export class MpcInputSenhaComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validators
  @Input() required: boolean = false;
  @Input() regexSenha: string = '';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected value?: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;
  protected ocultarSenha: boolean = true;

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
  }

  isCampoValido(): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.validaRequired()) {
      this.errorMessage = `O campo senha é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex()) {
      this.errorMessage = `A senha não está em um formato válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    return this.regexSenha.length > 0 && !new RegExp(this.regexSenha).test(this.Value);
  }

  validaRequired(): boolean {
    return this.required! && this.Value.length === 0;
  }

}
