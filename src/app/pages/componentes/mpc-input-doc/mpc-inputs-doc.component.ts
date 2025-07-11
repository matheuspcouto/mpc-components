import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MpcInputTextComponent, MpcInputNumberComponent, MpcInputDateComponent, MpcInputEmailComponent, MpcInputSenhaComponent, MpcInputTelefoneComponent, MpcInputCpfcnpjComponent, MpcInputBuscaCepComponent, MpcInputTextAreaComponent, MpcInputRadioComponent, RadioOption, MpcInputSelectComponent, SelectOption, Endereco } from 'mpc-lib-angular';

/**
 * @Componente MpcInputsDocComponent
 *
 * Este componente exibe exemplos e documentação dos componentes de input da biblioteca MPC,
 * demonstrando integração com formulários reativos, opções de select, radio, busca de CEP e validações.
 *
 * @Propriedades
 * @protected minDate {string} - Data mínima para inputs de data
 * @protected maxDate {string} - Data máxima para inputs de data
 * @protected estadosCivis {SelectOption[]} - Opções de estado civil
 * @protected sexos {RadioOption[]} - Opções de sexo
 * @protected form {FormGroup} - Formulário reativo de exemplo
 *
 * @Exemplo
 * ```html
 * <app-mpc-inputs-doc></app-mpc-inputs-doc>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-mpc-inputs-doc',
  imports: [
    MpcInputTextComponent,
    MpcInputNumberComponent,
    MpcInputDateComponent,
    MpcInputEmailComponent,
    MpcInputSenhaComponent,
    MpcInputTelefoneComponent,
    MpcInputCpfcnpjComponent,
    MpcInputBuscaCepComponent,
    MpcInputTextAreaComponent,
    MpcInputRadioComponent,
    MpcInputSelectComponent,
  ],
  templateUrl: './mpc-inputs-doc.component.html',
  styleUrl: './mpc-inputs-doc.component.css'
})
export class MpcInputsDocComponent {
  /**
   * Data mínima para inputs de data.
   */
  protected minDate = new Date(1900, 0, 1).toISOString().split('T')[0];
  /**
   * Data máxima para inputs de data.
   */
  protected maxDate = new Date().toISOString().split('T')[0];

  /**
   * Instância do formBuilder para criação do formulário reativo.
   */
  private readonly formBuilder = inject(NonNullableFormBuilder);

  /**
   * Opções de estado civil para o select.
   */
  protected estadosCivis: SelectOption[] = [
    { label: 'Solteiro(a)', value: 'Solteiro(a)', selected: false },
    { label: 'Casado(a)', value: 'Casado(a)', selected: false },
    { label: 'Divorciado(a)', value: 'Divorciado(a)', selected: false },
    { label: 'Viúvo(a)', value: 'Viúvo(a)', selected: false },
    { label: 'Separado(a)', value: 'Separado(a)', selected: false }
  ];

  /**
   * Opções de sexo para o radio.
   */
  protected sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];

  /**
   * Formulário reativo de exemplo para inputs.
   */
  protected form = this.formBuilder.group({
    nome: [''],
    sobrenome: [''],
    dataNasc: [''],
    sexo: [''],
    estadoCivil: [''],
    idade: [0],
    cpfCnpj: [''],
    descricao: [''],
    cep: [''],
    rua: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    cidade: [''],
    estado: [''],
    telefone: [''],
    email: [''],
    senha: [''],
  });

  /**
   * Preenche o endereço no formulário a partir do CEP informado.
   * @param endereco Objeto de endereço retornado pela busca de CEP
   */
  protected definirEnderecoPorCep(endereco: Endereco): void {
    this.form.patchValue({
      rua: endereco.rua,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep
    });
  }
} 