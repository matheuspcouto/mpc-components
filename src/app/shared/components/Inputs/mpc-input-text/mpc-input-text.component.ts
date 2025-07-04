/**
 * @Componente MpcInputTextComponent
 * Este componente é responsável por exibir um campo de texto.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * value {string}: Valor do campo.
 * readonly {boolean}: (opcional) Campo somente leitura.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * min {string}: (opcional) Número mínimo de caracteres.
 * max {string}: (opcional) Número máximo de caracteres.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-text [value]="value" label="Nome" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-text>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-text',
  imports: [],
  templateUrl: './mpc-input-text.component.html',
  styleUrl: './mpc-input-text.component.css'
})
export class MpcInputTextComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() label: string = '';
  @Input() readonly?: boolean = false;
  @Input() disabled?: boolean = false;

  @Input() value?: string;

  // Validators
  @Input() min?: string = '';
  @Input() max?: string = '';

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  /**
   * Inicializa a validação do campo.
   */
  ngOnInit(): void {
    this.isCampoValido(this.value);
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
    if (this.isCampoValido(this.value)) { this.valor.emit(this.value); }
  }

  /**
   * Valida o campo.
   */
  private isCampoValido(value: string | undefined): boolean {
    if (this.readonly || this.disabled) { return true; }

    if (this.isMenorQueValorMinimo(value)) {
      this.error.emit({ min: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} deve ter no mínimo ${this.min} caracteres`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  /**
   * Verifica se o valor é menor que o mínimo.
   */
  private isMenorQueValorMinimo(value: string | undefined): boolean {
    if (!this.min) return false;
    if (isNaN(parseInt(this.min))) return false;
    if (!value || value.length === 0) return true;
    return value.length < parseInt(this.min);
  }
}
