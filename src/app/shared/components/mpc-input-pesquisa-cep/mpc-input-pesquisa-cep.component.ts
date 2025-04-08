import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

@Component({
  selector: 'mpc-input-pesquisa-cep',
  imports: [NgxMaskDirective],
  templateUrl: './mpc-input-pesquisa-cep.component.html',
  styleUrl: './mpc-input-pesquisa-cep.component.css'
})
export class MpcInputPesquisaCepComponent {

  @Input() tabIndex?: number = 0;
  @Input() ariaLabel?: string;
  @Input() value?: string = '';

  @Output() valor: EventEmitter<Endereco> = new EventEmitter();

  private regexCEP: any = /^\d{5}-?\d{3}$/;
  protected mascara: string = '00000-000';

  protected errorMessage?: string;

  private http = inject(HttpClient);

  set Value(value: string) {
    this.value = value;
  }

  get Value(): string {
    return this.value as string;
  }

  onChange: (value?: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value?: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(event: any): void {
    this.Value = event.target.value as string;
    this.onChange(this.Value);
    this.onTouched();
  }

  isCampoValido(): boolean {
    if (this.validaRegex()) {
      this.errorMessage = `O campo CEP deve conter 8 dígitos`;
      return false;
    }

    this.errorMessage = undefined;
    return true;
  }

  validaRegex(): boolean {
    return !new RegExp(this.regexCEP).test(this.Value);
  }

  removerCaracteresEspeciais(cep: string): string {
    // Remove todos os caracteres não numéricos (espaços, parênteses, traços, etc.)
    return cep.replace(/\D/g, '');
  }

  pequisarCep(cep: string | undefined): void {

    if (!this.isCampoValido()) return;
    cep = this.removerCaracteresEspeciais(cep as string);

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
