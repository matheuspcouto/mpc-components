import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terceira-etapa',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './terceira-etapa.component.html',
  styleUrl: './terceira-etapa.component.css'
})
export class TerceiraEtapaComponent {
  formasPagamento = ['Cartão', 'Pix', 'Dinheiro'];
  formBuild = inject(FormBuilder);

  formGroup: FormGroup = this.formBuild.group({
    formaPagamento: [undefined, Validators.required],
  }, {
    validators: [(formGroup: FormGroup) => {
      const formasPagamento = formGroup.get('formaPagamento');

      if (formasPagamento?.touched && formasPagamento?.value === 'Selecione') {
        formasPagamento.setErrors({ required: true });
      }
    }]
  });

  @Output() dados = new EventEmitter<any>();

  constructor() {
    let dadosInscricao: any = sessionStorage.getItem('dadosInscricao');

    if (dadosInscricao) {
      dadosInscricao = JSON.parse(dadosInscricao);
      this.formGroup.reset();
      this.formGroup.patchValue(dadosInscricao);
    }
  }

  etapaAnterior() {
    this.dados.emit({ proximaEtapa: 2 });
  }

  finalizarInscricao() {
    const dados = {
      dados: this.formGroup.value,
      proximaEtapa: 3
    }

    this.dados.emit(dados);
  }

}
