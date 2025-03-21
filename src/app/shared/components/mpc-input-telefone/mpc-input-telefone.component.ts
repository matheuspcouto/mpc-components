/**
 * @Componente MpcInputTelefoneComponent
 * Este componente é responsável por exibir um campo de telefone com validação e máscara.
 *
 * id {string}: (opcional) Id do campo.
 * label {string}: Label do campo.
 * tabIndex {number}: (opcional) Índice de tabulação do campo.
 * ariaLabel {string}: (opcional) Label para acessibilidade.
 * required {boolean}: (opcional) Campo obrigatório.
 *
 * Exemplo de utilização:
 * <mpc-input-telefone label="Telefone" [id]="telefone" [tabIndex]="0" [ariaLabel]="Campo de Telefone" [required]="true" (valorCampo)="setValorCampo($event)"></mpc-input-telefone>
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/02/2025
 * @updated 27/02/2025
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

// TODO: Adicionar coódigo do país e melhorar a validação do telefone
@Component({
  selector: 'mpc-input-telefone',
  imports: [CommonModule, NgxMaskDirective],
  templateUrl: './mpc-input-telefone.component.html',
  styleUrl: './mpc-input-telefone.component.css'
})
export class MpcInputTelefoneComponent {

  @Input() id?: string;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;
  regexTelefone: any = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  mascara: string = '(00) 00000-0000';

  @Output() valorCampo: EventEmitter<string> = new EventEmitter();

  value: string = '';
  error: string = '';
  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();

    if (this.isCampoValido()) {
      this.value = this.formatarTelefone(this.value);
      this.valorCampo.emit(this.value);
    }
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo telefone é obrigatório`; return false; }
    if (this.validaRegex()) { this.error = `O campo telefone não está em um formato válido. Tente (00) 00000-0000`; return false; }
    return true;
  }

  validaRegex(): boolean {
    return !new RegExp(this.regexTelefone).test(this.value);
  }

  validaRequired(): boolean {
    return this.required! && this.value.length === 0;
  }

  formatarTelefone(telefone: string): string {
    // Remover caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Verificar se o número possui DDD
    if (numeroLimpo.length === 11) {
      // Formatar telefone com DDD
      return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeroLimpo.length === 10) {
      // Formatar telefone sem DDD
      return numeroLimpo.replace(/(\d{5})(\d{4})/, '$1-$2');
    } else {
      // Retornar a string original se não for um número válido
      return telefone;
    }
  }

}
