import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mpc-input-email',
  imports: [CommonModule],
  templateUrl: './mpc-input-email.component.html',
  styleUrl: './mpc-input-email.component.css'
})
export class MpcInputEmailComponent {

  @Input() id?: string;
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;
  regexEmail: any = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
      this.valorCampo.emit(this.value);
    }
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo e-mail é obrigatório`; return false; }
    if (this.validaRegex()) { this.error = `O campo e-mail não está em um formato válido`; return false; }
    return true;
  }

  validaRegex(): boolean {
    return !new RegExp(this.regexEmail).test(this.value);
  }

  validaRequired(): boolean {
    return this.required! && this.value.length === 0;
  }

}
