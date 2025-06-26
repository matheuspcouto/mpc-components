/**
 * @Componente MpcInputPesquisaCepComponent
 * Este componente é responsável por exibir um campo de pesquisa de CEP.
 *
 * id {string}: (opcional) Id do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * value {number}: Valor inicial do campo.
 *
 * Exemplo de utilização:
 * <mpc-input-pesquisa-cep [value]="cep" [tabIndex]="1" [ariaLabel]="ariaLabel" (valor)="setvalor($event)"></mpc-input-pesquisa-cep>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { ValidationErrors } from '@angular/forms';

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

// TODO: Corrigir recuperação de Dados
@Component({
  selector: 'mpc-input-pesquisa-cep',
  imports: [NgxMaskDirective],
  templateUrl: './mpc-input-pesquisa-cep.component.html',
  styleUrl: './mpc-input-pesquisa-cep.component.css'
})
export class MpcInputPesquisaCepComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: string = '';

  @Output() valor: EventEmitter<Endereco> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  // Validators
  @Input() required?: boolean = false;

  protected campoTocado: boolean = false;
  private regexCEP: any = /^\d{5}-?\d{3}$/;
  protected readonly mascara: string = '00000-000';

  protected errorMessage?: string;

  private http = inject(HttpClient);

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido(this.value)) { this.pequisarCep(this.value); }
  }

  get Value(): string {
    return this.value as string;
  }

  onChange: (value?: string) => void = () => { };
  onTouched: () => void = () => { };

  protected onBlur(): void {
    this.onTouched();
    this.isCampoValido(this.Value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.Value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected setValue(event: any): void {
    this.Value = event.target.value as string;
    this.onChange(this.Value);
    this.onTouched();
    this.isCampoValido(this.Value);
  }

  private isCampoValido(value: string): boolean {
    if (this.validaRequired(value)) {
      this.errorMessage = `O campo CEP é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex(value)) {
      this.errorMessage = `O campo CEP deve conter 8 dígitos`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  private validaRegex(value: string): boolean {
    return !new RegExp(this.regexCEP).test(value);
  }

  private validaRequired(value: string): boolean {
    return this.campoTocado && this.required! && value.length === 0;
  }

  private pequisarCep(cep: string | undefined): void {

    cep = (cep as string).replace(/\D/g, '');;

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (response) => {

        if (response.erro) {
          this.errorMessage = `CEP não encontrado`;
          return;
        }

        this.valor.emit({
          rua: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.estado,
          cep: response.cep
        });
      },
      error: () => {
        this.errorMessage = `CEP não encontrado`;
      }
    });
  }
}
