import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { telefoneValidator, InscricaoValidator } from '../formulario.validator';

@Component({
  selector: 'segunda-etapa',
  imports: [CommonModule, NgxMaskDirective, FormsModule, ReactiveFormsModule],
  templateUrl: './segunda-etapa.component.html',
  styleUrl: './segunda-etapa.component.css'
})
export class SegundaEtapaComponent {
  mascaraTelefone = '(00) 00000-0000';
  parentesco = ['Pai', 'Mãe', 'Esposo(a)', 'Filho(a)', 'Irmão(ã)', 'Amigo(a)', 'Namorado(a)', 'Outro'];
  qtdContatos = 2;
  formBuild = inject(FormBuilder);

  @Output() dados = new EventEmitter<any>();
  @Input() dadosInscricao: any = {};

  formGroup: FormGroup = this.formBuild.group({
    nomeContatoUm: [undefined, Validators.required],
    parentescoUm: [undefined, Validators.required],
    telefoneContatoUm: [undefined, telefoneValidator],
    nomeContatoDois: [undefined, Validators.required],
    parentescoDois: [undefined, Validators.required],
    telefoneContatoDois: [undefined, telefoneValidator],
    nomeContatoTres: [undefined],
    parentescoTres: [undefined],
    telefoneContatoTres: [undefined],
    nomeContatoQuatro: [undefined],
    parentescoQuatro: [undefined],
    telefoneContatoQuatro: [undefined],
  }, {
    validators: [(formGroup: FormGroup) => {
      const appValidator = new InscricaoValidator();
      const telefoneContatoUm = formGroup.get('telefoneContatoUm');
      const telefoneContatoDois = formGroup.get('telefoneContatoDois');

      if (telefoneContatoUm?.value && !appValidator.isValidTelefone(telefoneContatoUm.value)) {
        telefoneContatoUm.setErrors({ formatoInvalido: true });
      }

      if (telefoneContatoDois?.value && !appValidator.isValidTelefone(telefoneContatoDois.value)) {
        telefoneContatoDois.setErrors({ formatoInvalido: true });
      }
    }]
  });

  constructor() {
    let dadosInscricao: any = sessionStorage.getItem('dadosInscricao');

    if (dadosInscricao) {
      dadosInscricao = JSON.parse(dadosInscricao);
      this.formGroup.reset();
      this.formGroup.patchValue(dadosInscricao);

      if (dadosInscricao.nomeContatoTres) {
        this.qtdContatos = 3;
      }

      if (dadosInscricao.nomeContatoQuatro) {
        this.qtdContatos = 4;
      }
    }
  }

  aumentarQtdContatos() { this.qtdContatos++; }

  diminuirQtdContatos() {
    this.qtdContatos--;

    if (this.qtdContatos == 3) {
      this.formGroup.get('nomeContatoQuatro')?.setValue(null);
      this.formGroup.get('telefoneContatoQuatro')?.setValue(null);
    }

    if (this.qtdContatos == 2) {
      this.formGroup.get('nomeContatoTres')?.setValue(null);
      this.formGroup.get('telefoneContatoTres')?.setValue(null);
    }
  }

  proximaEtapa() {
    const dados = {
      dados: this.formGroup.value,
      proximaEtapa: 3
    }

    this.dados.emit(dados);
  }

  etapaAnterior() {
    this.dados.emit({ proximaEtapa: 1 });
  }

}
