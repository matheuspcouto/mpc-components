/**
 * @Componente MpcInputSelectComponent
 * Este componente é responsável por exibir um campo select com uma lista de strings.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * disabled {boolean}: (opcional) Indica se o campo está desabilitado.
 * options {string[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-select label="Sexo" [options]="options" [required]="true" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-select>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 04/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}

@Component({
  selector: 'mpc-input-select',
  imports: [],
  templateUrl: './mpc-input-select.component.html',
  styleUrl: './mpc-input-select.component.css'
})
export class MpcInputSelectComponent implements OnInit {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() label: string = '';
  @Input() disabled?: boolean = false;

  @Input() options: SelectOption[] = [];

  // Validators
  @Input() required?: boolean = false;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected opcaoSelecionada?: SelectOption;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  /**
   * Inicializa o componente e define a opção selecionada.
   */
  ngOnInit(): void {
    this.opcaoSelecionada = this.options.find(option => option.selected);

    // Se não há opção selecionada, adiciona a opção "Selecione"
    if (!this.opcaoSelecionada) {
      const opcaoSelecione: SelectOption = { label: 'Selecione', value: '', selected: true };
      this.options.unshift(opcaoSelecione);
      this.opcaoSelecionada = opcaoSelecione;

    } else {
      // Se há uma opção selecionada, emite o valor
      this.valor.emit(this.opcaoSelecionada.value);
    }

    this.isCampoValido();
  }

  /**
   * Marca o campo como tocado e valida.
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido();
  }

  /**
   * Atualiza a opção selecionada e emite se válido.
   */
  setValue(option: any): void {
    this.opcaoSelecionada = option as SelectOption;
    if (this.isCampoValido()) { this.valor.emit(this.opcaoSelecionada?.value) }
  }

  /**
   * Valida o campo.
   */
  private isCampoValido(): boolean {
    if (this.disabled) return true;

    if (this.isCampoObrigatorio()) {
      this.error.emit({ required: true });
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   */
  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required &&
      (!this.opcaoSelecionada ||
        this.opcaoSelecionada.value === '' ||
        this.opcaoSelecionada.value === 'Selecione');
  }
}
