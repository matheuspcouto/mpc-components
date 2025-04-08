import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'mpc-input-number',
  imports: [],
  templateUrl: './mpc-input-number.component.html',
  styleUrl: './mpc-input-number.component.css'
})
export class MpcInputNumberComponent {

  @Input() id?: string;
  @Input() label: string = '';
  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;
  @Input() value?: number = 0;
  @Input() readonly?: boolean = false;

  // Validators
  @Input() min?: string;
  @Input() max?: string;
  @Input() required?: boolean = false;

  @Output() valor: EventEmitter<number> = new EventEmitter();
  @Output() error: EventEmitter<ValidationErrors> = new EventEmitter();

  protected errorMessage?: string;
  protected campoTocado: boolean = false;

  get Label(): string {
    return this.label.toLowerCase();;
  }

  set Value(value: number) {
    this.value = value;
    if (this.isCampoValido()) { this.valor.emit(this.value); }
  }

  get Value(): number {
    return this.value as number;
  }

  onChange: (value?: number) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(event: any): void {
    this.Value = event.target.value as number;
    this.onChange(this.Value);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRequired()) {
      this.errorMessage = `O campo ${this.Label} é obrigatório`;
      this.error.emit({ required: true });
      return false;
    }

    if (this.validaMin()) {
      this.errorMessage = `O valor mínimo para o campo ${this.Label} é ${this.min}`;
      this.error.emit({ min: true });
      return false;
    }

    if (this.validaMax()) {
      this.errorMessage = `O valor máximo para o campo ${this.Label} é ${this.max}`;
      this.error.emit({ max: true });
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaMin(): boolean {
    if (this.min) {
      let minNumber = parseInt(this.min);
      return this.Value ? this.Value < minNumber : false;
    }
    return false;
  }

  validaMax(): boolean {
    if (this.max) {
      let maxNumber = parseInt(this.max);
      return this.Value ? this.Value > maxNumber : false;
    }
    return false;
  }

  validaRequired(): boolean {
    return this.campoTocado && this.required! && this.Value === 0;
  }

}
