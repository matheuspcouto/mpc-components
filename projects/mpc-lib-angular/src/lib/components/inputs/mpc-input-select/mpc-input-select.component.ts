/**
 * @Componente MpcInputSelectComponent
 * Este componente exibe um campo select customizado, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input label {string}: Label do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input disabled {boolean}: (opcional) Campo desabilitado.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 * @Input options {SelectOption[]}: Lista de opções do select.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-select [formControl]="control" label="Sexo" [options]="options" [required]="true" [tabIndex]="1" [ariaLabel]="'Sexo'" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string;
  selected?: boolean;
}

@Component({
  selector: 'mpc-input-select',
  imports: [],
  templateUrl: './mpc-input-select.component.html',
  styleUrl: './mpc-input-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputSelectComponent),
      multi: true
    }
  ]
})
export class MpcInputSelectComponent implements ControlValueAccessor, Validator, OnInit {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  // Variáveis
  @Input() options: SelectOption[] = [];
  public value: string = '';
  protected opcaoSelecionada?: SelectOption;
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Outputs
  @Output() valueChange = new EventEmitter<any>();

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
    this.atualizarOpcaoSelecionada();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Inicializa o componente.
   */
  ngOnInit(): void {
    // Cria uma cópia das opções para não modificar o array original
    let optionsCopy = [...this.options];

    // Verifica se já existe a opção 'Selecione' (label e value)
    const existeSelecione = optionsCopy.some(
      option => option.label === 'Selecione' && option.value === ''
    );

    // Se não existe, adiciona 'Selecione' na primeira posição
    if (!existeSelecione) {
      optionsCopy.unshift({ label: 'Selecione', value: '', selected: true });
    }

    this.options = optionsCopy;

    this.atualizarOpcaoSelecionada();
  }

  /**
 * Atualiza a opção selecionada com base no valor atual.
 */
  private atualizarOpcaoSelecionada(): void {
    if (this.options && this.options.length > 0) {
      this.opcaoSelecionada = this.options.find(option => option.value === this.value)
        || this.options.find(option => option.selected)
        || this.options[0];
    }
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza a opção selecionada e notifica o Angular Forms.
   * @param option Opção selecionada do select.
   */
  setValue(option: any): void {
    this.opcaoSelecionada = option;
    this.value = option.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  /**
   * Valida o campo conforme regras de obrigatório.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.disabled) return null;
    if (this.isCampoObrigatorio()) {
      if (this.campoTocado) {
        this.errorMessage = `O campo ${this.label} é obrigatório`;
      }
      return { required: true };
    }
    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @returns boolean
   */
  private isCampoObrigatorio(): boolean {
    if (!this.required) return false;
    return this.required && (!this.opcaoSelecionada || this.opcaoSelecionada.value === '' || this.opcaoSelecionada.value === 'Selecione');
  }
}
