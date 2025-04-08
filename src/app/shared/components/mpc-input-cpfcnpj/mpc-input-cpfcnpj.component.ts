import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'mpc-input-cpfcnpj',
  imports: [NgxMaskDirective],
  templateUrl: './mpc-input-cpfcnpj.component.html',
  styleUrl: './mpc-input-cpfcnpj.component.css'
})
export class MpcInputCpfcnpjComponent {
  @Input() id?: string;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;
  @Input() value?: string = '';

  // Validators
  @Input() required?: boolean = false;
  regexCPF: any = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  regexCNPJ: any = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  mascaraCPF: string = '000.000.000-00';
  mascaraCNPJ: string = '00.000.000/0000-00';
  mascara: string = this.mascaraCPF;

  @Output() valor: EventEmitter<string> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  set Value(value: string) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
  }

  get Value(): string {
    return this.value as string;
  }

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
    this.Value = event.target.value;
    this.onChange(this.Value);
    this.onTouched();
    this.atualizarMascara();
  }

  atualizarMascara(): void {
    if (this.Value.length <= 14) {
      this.mascara = this.mascaraCPF;
    } else {
      this.mascara = this.mascaraCNPJ;
    }
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo CPF/CNPJ é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaRegex()) {
      this.errorMessage = `O formato do CPF/CNPJ não é válido`;
      this.error.emit({ regex: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    if (this.Value.length <= 14) {
      return !this.regexCPF.test(this.Value);
    } else {
      return !this.regexCNPJ.test(this.Value);
    }
  }

  validaRequired(): boolean {
    return this.required! && this.Value.length === 0;
  }
}
