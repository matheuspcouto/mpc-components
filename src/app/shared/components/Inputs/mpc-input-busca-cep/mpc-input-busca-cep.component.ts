/**
 * @Componente MpcInputBuscaCepComponent
 * Este componente exibe um campo de busca de CEP customizado, com máscara e integração a API, integrado ao Angular Forms.
 *
 * @Input id {string}: (opcional) Id do campo.
 * @Input tabIndex {number}: (opcional) Índice de tabulação do campo.
 * @Input ariaLabel {string}: (opcional) Label para acessibilidade.
 * @Input required {boolean}: (opcional) Campo obrigatório.
 *
 * Integração: ControlValueAccessor e Validator (compatível com Reactive Forms e Template Forms)
 *
 * Exemplo de uso:
 * <mpc-input-busca-cep [formControl]="control" [tabIndex]="1" [ariaLabel]="'CEP'" [required]="true" (endereco)="endereco($event)" />
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 07/07/2025
 */

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CepMaskPipe } from './cep-mask.pipe';

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export const REGEX_CEP = /^\d{5}-?\d{3}$/;

@Component({
  selector: 'mpc-input-busca-cep',
  templateUrl: './mpc-input-busca-cep.component.html',
  styleUrls: ['./mpc-input-busca-cep.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MpcInputBuscaCepComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MpcInputBuscaCepComponent),
      multi: true
    }
  ]
})
export class MpcInputBuscaCepComponent implements ControlValueAccessor, Validator {

  // Acessibilidade
  @Input() id: string = '';
  @Input() tabIndex: number = 0;
  @Input() ariaLabel: string = '';

  // Validators
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  // Variáveis
  public value: string = '';
  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  // Serviços
  private readonly http = inject(HttpClient);
  private readonly cepMaskPipe = new CepMaskPipe();

  // Outputs
  @Output() endereco = new EventEmitter<Endereco>();

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Retorna o valor do campo formatado como CEP.
   * @returns string
   */
  get valorFormatado(): string {
    return this.cepMaskPipe.transform(this.value);
  }

  /**
   * Marca o campo como tocado (para exibir mensagens de erro após interação).
   */
  protected onFocus(): void {
    this.campoTocado = true;
    this.onChange(this.value);
  }

  /**
   * Atualiza o valor do campo a partir do evento de input, notifica o Angular Forms e dispara busca de CEP se válido.
   * @param event Evento de input do campo.
   */
  protected setValue(event: any): void {
    this.value = event.target.value as string;
    this.onChange(this.value);
    this.onTouched();
    this.pequisarCep(this.value);
  }

  /**
   * Valida o campo conforme regras de obrigatório e formato de CEP.
   * @param control Controle do formulário.
   * @returns ValidationErrors|null
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.disabled) return null;
    if (this.isCampoObrigatorio(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo CEP é obrigatório`;
      }
      return { required: true };
    }
    if (this.isCepInvalido(this.value)) {
      if (this.campoTocado) {
        this.errorMessage = `O campo CEP deve conter 8 dígitos numéricos`;
      }
      return { pattern: true };
    }

    this.errorMessage = undefined;
    return null;
  }

  /**
   * Verifica se o valor do campo é um CEP inválido.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCepInvalido(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_CEP).test(value);
  }

  /**
   * Verifica se o campo é obrigatório e está vazio.
   * @param value Valor do campo.
   * @returns boolean
   */
  private isCampoObrigatorio(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.required && value.length === 0;
  }

  /**
   * Realiza a busca do CEP na API externa e trata o resultado.
   * @param cep Valor do CEP a ser buscado.
   */
  private pequisarCep(cep: string): void {
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) return;

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (response) => {
        if (response.erro) {
          this.errorMessage = `CEP não encontrado`;
          return;
        }

        const endereco: Endereco = {
          rua: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.estado,
          cep: response.cep
        };

        this.endereco.emit(endereco);
      },
      error: () => {
        this.errorMessage = `CEP não encontrado`;
      }
    });
  }
}
