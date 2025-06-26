/**
 * @Componente MpcInputEmailComponent
 * Este componente é responsável por exibir um campo de entrada de e-mail.
 *
 * id {string}: (opcional) Id do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Indica se o campo é obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {string}: Valor Inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-email [value]="value" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-email>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { EmailMaskPipe } from './email-mask.pipe';

@Component({
  selector: 'mpc-input-email',
  imports: [],
  templateUrl: './mpc-input-email.component.html',
  styleUrl: './mpc-input-email.component.css'
})
export class MpcInputEmailComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() required?: boolean = false;
  private regexEmail: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  @Input() value?: string;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  private readonly emailMaskPipe = new EmailMaskPipe();

  get valorFormatado(): string {
    return this.emailMaskPipe.transform(this.value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  protected setValue(event: any): void {
    this.value = event.target.value as string;
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.validaRequired(value)) {
      this.errorMessage = `O campo e-mail é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex(value)) {
      this.errorMessage = `O campo e-mail não está em um formato válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaRegex(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(this.regexEmail).test(value);
  }

  private validaRequired(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }

}
