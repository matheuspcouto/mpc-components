/**
 * @Componente MpcInputSelectComponent
 * Este componente é responsável por exibir um campo select com uma lista de strings.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * options {string[]}: Opções do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-select label="Estado Civil" [id]="estado-civil" [tabIndex]="0" [ariaLabel]="Campo de Estado Civil" [options]="estadosCivis" [required]="true" (valorCampo)="setValorCampo($event)"></mpc-input-select>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}
@Component({
  selector: 'mpc-input-select',
  imports: [CommonModule],
  templateUrl: './mpc-input-select.component.html',
  styleUrl: './mpc-input-select.component.css'
})
export class MpcInputSelectComponent implements OnInit {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;

  @Output() valorCampo: EventEmitter<string> = new EventEmitter();

  protected opcaoSelecionada?: SelectOption;
  protected error?: string;
  protected campoTocado: boolean = false;

  ngOnInit(): void {
    const optionSelecionada = this.options.find(option => option.selected);

    if (optionSelecionada) {
      this.valorCampo.emit(optionSelecionada.value);
    } else {
      this.options.unshift({ label: 'Selecione', value: 'Selecione', selected: true });
    }
  }

  get Label(): string {
    return this.label.toLowerCase();
  }

  set OpcaoSelecionada(option: SelectOption) {
    this.opcaoSelecionada = option;
    if (this.isCampoValido()) { this.valorCampo.emit(this.opcaoSelecionada?.value); }
  }

  get OpcaoSelecionada(): SelectOption {
    return this.opcaoSelecionada!;
  }

  onChange: (option: SelectOption) => void = () => { };
  onTouched: () => void = () => { };

  registerOnChange(fn: (option: SelectOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: any): void {
    this.OpcaoSelecionada = option as SelectOption;
    this.onChange(this.OpcaoSelecionada);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo ${this.Label} é obrigatório`; return false; }

    this.error = undefined;
    return true;
  }

  validaRequired(): boolean {
    return this.required! && this.campoTocado && (this.OpcaoSelecionada && this.OpcaoSelecionada.value == 'Selecione');
  }

}
