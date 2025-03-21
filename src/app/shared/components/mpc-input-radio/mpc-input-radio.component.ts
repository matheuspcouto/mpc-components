import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface RadioOption {
  label: string;
  value: string;
  checked?: boolean;
}

@Component({
  selector: 'mpc-input-radio',
  imports: [CommonModule],
  templateUrl: './mpc-input-radio.component.html',
  styleUrl: './mpc-input-radio.component.css'
})
export class MpcInputRadioComponent {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() values: RadioOption[] = [];
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;

  // Validators
  @Input() required?: boolean = false;

  @Output() valorCampo: EventEmitter<String> = new EventEmitter();

  value?: RadioOption;
  error: string = '';
  onChange: (value: RadioOption) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: RadioOption): void {
    this.value = value;
  }

  registerOnChange(fn: (value: RadioOption) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(option: RadioOption): void {
    this.values.forEach(v => v.checked = false);
    option.checked = true;
    this.value = option;
    this.onChange(this.value);
    this.onTouched();
    this.valorCampo.emit(this.value.value);
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) { this.error = `O campo ${this.label} é obrigatório`; return false; }

    return true;
  }

  validaRequired(): boolean {
    return this.required! && !this.value;
  }
}
