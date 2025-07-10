import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MpcInputTextComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-text/mpc-input-text.component';
import { MpcInputNumberComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-number/mpc-input-number.component';
import { MpcInputDateComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-date/mpc-input-date.component';
import { MpcInputEmailComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-email/mpc-input-email.component';
import { MpcInputSenhaComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-senha/mpc-input-senha.component';
import { MpcInputTelefoneComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputCpfcnpjComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-cpfcnpj/mpc-input-cpfcnpj.component';
import { MpcInputBuscaCepComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-busca-cep/mpc-input-busca-cep.component';
import { MpcInputTextAreaComponent } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-text-area/mpc-input-text-area.component';
import { MpcInputRadioComponent, RadioOption } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-radio/mpc-input-radio.component';
import { MpcInputSelectComponent, SelectOption } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-select/mpc-input-select.component';
import { Endereco } from '../../../../../projects/mpc-lib-angular/src/lib/components/inputs/mpc-input-busca-cep/mpc-input-busca-cep.component';

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
  protected minDate = new Date(1900, 0, 1).toISOString().split('T')[0];
  protected maxDate = new Date().toISOString().split('T')[0];

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected estadosCivis: SelectOption[] = [
    { label: 'Solteiro(a)', value: 'Solteiro(a)', selected: false },
    { label: 'Casado(a)', value: 'Casado(a)', selected: false },
    { label: 'Divorciado(a)', value: 'Divorciado(a)', selected: false },
    { label: 'Viúvo(a)', value: 'Viúvo(a)', selected: false },
    { label: 'Separado(a)', value: 'Separado(a)', selected: false }
  ];

  protected sexos: RadioOption[] = [
    { label: 'Masculino', value: 'M', checked: false },
    { label: 'Feminino', value: 'F', checked: false }
  ];

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