import { Component, inject } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';
import { MpcInputNumberComponent } from '../../../shared/components/Inputs/mpc-input-number/mpc-input-number.component';
import { MpcInputDateComponent } from '../../../shared/components/Inputs/mpc-input-date/mpc-input-date.component';
import { MpcInputEmailComponent } from '../../../shared/components/Inputs/mpc-input-email/mpc-input-email.component';
import { MpcInputSenhaComponent } from '../../../shared/components/Inputs/mpc-input-senha/mpc-input-senha.component';
import { MpcInputCpfcnpjComponent } from '../../../shared/components/Inputs/mpc-input-cpfcnpj/mpc-input-cpfcnpj.component';
import { MpcInputTelefoneComponent } from '../../../shared/components/Inputs/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputTextAreaComponent } from '../../../shared/components/Inputs/mpc-input-text-area/mpc-input-text-area.component';
import { MpcInputRadioComponent, RadioOption } from '../../../shared/components/Inputs/mpc-input-radio/mpc-input-radio.component';
import { MpcInputSelectComponent, SelectOption } from '../../../shared/components/Inputs/mpc-input-select/mpc-input-select.component';
import { Endereco, MpcInputBuscaCepComponent } from '../../../shared/components/Inputs/mpc-input-busca-cep/mpc-input-busca-cep.component';
import { NonNullableFormBuilder } from '@angular/forms';
import { MpcFooterComponent } from '../../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-inputs',
  imports: [
    MpcNavbarComponent,
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
    MpcFooterComponent
  ],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.css'
})
export class InputsComponent {
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