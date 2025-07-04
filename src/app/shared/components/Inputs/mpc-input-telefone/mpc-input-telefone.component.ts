/**
 * @Componente MpcInputTelefoneComponent
 * Este componente é responsável por exibir um campo de telefone com validação e máscara.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * readonly {boolean}: (opcional) Indica se o campo é somente leitura.
 * value {string}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-telefone [value]="value" label="Telefone" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-telefone>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TelefoneMaskPipe } from './telefone-mask.pipe';

export const REGEX_TELEFONE = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

@Component({
  selector: 'mpc-input-telefone',
  imports: [],
  templateUrl: './mpc-input-telefone.component.html',
  styleUrl: './mpc-input-telefone.component.css'
})
export class MpcInputTelefoneComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  // Validators
  @Input() required?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() readonly?: boolean = false;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  @Input() value?: string;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  private readonly telefoneMaskPipe = new TelefoneMaskPipe();

  /**
   * Inicializa a validação do campo.
   */
  ngOnInit(): void {
    this.isCampoValido(this.value);
  }

  /**
   * Retorna o valor formatado do telefone.
   */
  get valorFormatado(): string {
    return this.telefoneMaskPipe.transform(this.value);
  }

  /**
   * Marca o campo como tocado e valida.
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  /**
   * Atualiza o valor do campo e emite se válido.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.value = this.value.replace(/\D/g, '');
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  /**
   * Valida o campo.
   */
  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isCampoObrigatorio(value)) {
      this.error.emit({ required: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo telefone é obrigatório`;
      }
      return false;
    }

    if (this.isTelefoneInvalido(value)) {
      this.error.emit({ pattern: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo telefone não está em um formato válido. Tente (00) 00000-0000`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  /**
   * Verifica se o telefone é inválido.
   */
  private isTelefoneInvalido(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_TELEFONE).test(value);
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    return this.required && (!value || value.length === 0);
  }

}
