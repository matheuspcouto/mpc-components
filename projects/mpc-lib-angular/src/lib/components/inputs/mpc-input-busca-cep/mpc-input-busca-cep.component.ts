/**
 * @Componente MpcInputBuscaCepComponent
 * 
 * Este componente exibe um campo de busca de CEP customizado com validação
 * e busca automática de endereço, implementando ControlValueAccessor para integração com formulários reativos.
 * 
 * @Propriedades
 * @Input() id {string} - ID do campo (obrigatório)
 * @Input() tabIndex {number} - Índice do campo (opcional)
 * @Input() ariaLabel {string} - Label do campo (opcional)
 * @Input() label {string} - Label do campo (obrigatório)
 * @Input() readonly {boolean} - Campo somente leitura (opcional, padrão: false)
 * @Input() disabled {boolean} - Campo desabilitado (opcional, padrão: false)
 * @Input() id {string} - ID único do campo para acessibilidade (opcional)
 * @Input() tabIndex {number} - TabIndex para navegação por teclado (opcional, padrão: 0)
 * @Input() ariaLabel {string} - Rótulo para leitores de tela (opcional)
 * 
 * @Eventos
 * @Output() cepEncontrado {EventEmitter<any>} - Emite os dados do endereço quando o CEP é encontrado
 * @Output() cepNaoEncontrado {EventEmitter<string>} - Emite quando o CEP não é encontrado
 * 
 * @Exemplo
 * ```html
 * <!-- Input Busca CEP Básico -->
 * <mpc-input-busca-cep 
 *   label="CEP"
 *   [(ngModel)]="cep"
 *   (cepEncontrado)="onCepEncontrado($event)"
 *   (cepNaoEncontrado)="onCepNaoEncontrado($event)">
 * </mpc-input-busca-cep>
 * 
 * <!-- Input Busca CEP com Handler -->
 * <mpc-input-busca-cep 
 *   label="CEP"
 *   [(ngModel)]="cep"
 *   (cepEncontrado)="preencherEndereco($event)">
 * </mpc-input-busca-cep>
 * ```
 * 
 * @Implementações
 * ControlValueAccessor: Interface para integração com formulários
 * - writeValue(value: string): void - Define o valor do campo
 * - registerOnChange(fn: any): void - Registra função de mudança
 * - registerOnTouched(fn: any): void - Registra função de toque
 * 
 * Validator: Interface para validação de campos
 * - validate(control: AbstractControl): ValidationErrors | null - Valida o campo
 * 
 * @Variáveis CSS
 * --mpc-color-text: Cor do texto do campo (padrão: var(--mpc-color-primary))
 * --mpc-color-error: Cor de erro (padrão: #DC3545)
 * --mpc-color-border: Cor da borda do campo (padrão: var(--mpc-color-tertiary))
 * --mpc-color-border-success: Cor da borda de sucesso (padrão: var(--mpc-color-secondary))
 * --mpc-font-text: Fonte do campo (padrão: var(--mpc-font-default))
 * 
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, forwardRef, inject } from '@angular/core';
import { ValidationErrors, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CepMaskPipe } from '../../../pipes/cep/cep-mask.pipe';
import { AccessibilityInputs } from '../../../../shared/accessibility-inputs';

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
  styleUrls: ['./mpc-input-busca-cep.component.scss'],
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
export class MpcInputBuscaCepComponent extends AccessibilityInputs implements ControlValueAccessor, Validator {

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
