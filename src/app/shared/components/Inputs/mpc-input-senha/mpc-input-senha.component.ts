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
 * regexSenha {string}: (opcional) Regex para validação da senha.
 * value {string}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-senha [value]="value" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-senha>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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

  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() required?: boolean = false;
  @Input() regexSenha?: string = '';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  @Input() value?: string;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;
  protected ocultarSenha: boolean = true;

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  protected setValue(event: any): void {
    this.value = event.target.value;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isCampoObrigatorio(value)) {
      this.errorMessage = `O campo senha é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.isSenhaInvalida(value)) {
      this.errorMessage = `A senha não está em um formato válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private isSenhaInvalida(value: string | undefined): boolean {
    if (!this.regexSenha) return false;
    if (!value) return true;
    return this.regexSenha.length > 0 && !new RegExp(this.regexSenha).test(value);
  }

  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }

}
