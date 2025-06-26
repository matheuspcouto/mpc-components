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
import { ValidationErrors } from '@angular/forms';
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
  selector: 'mpc-input-pesquisa-cep',
  imports: [],
  templateUrl: './mpc-input-pesquisa-cep.component.html',
  styleUrl: './mpc-input-pesquisa-cep.component.css'
})
export class MpcInputPesquisaCepComponent {

  // Acessibilidade
  @Input() id?: string = '';
  @Input() tabIndex?: number = 0
  @Input() ariaLabel?: string = '';

  @Input() value?: string;

  @Output() valor: EventEmitter<Endereco> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  // Validators
  @Input() required?: boolean = false;

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  private readonly http = inject(HttpClient);
  private readonly cepMaskPipe = new CepMaskPipe();

  get valorFormatado(): string {
    return this.cepMaskPipe.transform(this.value);
  }

  protected onFocus(): void {
    this.campoTocado = true;
    this.isCampoValido(this.value);
  }

  protected setValue(event: any): void {
    this.value = event.target.value as string;
    if (this.isCampoValido(this.value)) { this.pequisarCep(this.value); }
  }

  private isCampoValido(value: string | undefined): boolean {
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

  private validaRegex(value: string | undefined): boolean {
    if (!value) return true;
    return !new RegExp(REGEX_CEP).test(value);
  }

  private validaRequired(value: string | undefined): boolean {
    if (!this.required) return false;
    if (!value) return true;
    return this.campoTocado && this.required && value.length === 0;
  }

  private pequisarCep(cep: string | undefined): void {

    if (!cep) return;
    cep = cep.replace(/\D/g, '');;

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
