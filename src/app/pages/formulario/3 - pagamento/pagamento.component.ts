import { SelectOption } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputSelectComponent } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { InscricaoService } from '../inscricao.service';

@Component({
  selector: 'app-pagamento',
  imports: [
    MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcButtonComponent, MpcInputSelectComponent,
    MpcNavbarComponent, MpcFormProgressBarComponent
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent {

  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private inscricaoService = inject(InscricaoService);

  formasPagamento: SelectOption[] = [
    { label: 'Cartão', value: 'Cartão', selected: false },
    { label: 'Pix', value: 'Pix', selected: false },
    { label: 'Dinheiro', value: 'Dinheiro', selected: false }
  ];

  protected form = this.formBuilder.group({
    formaPagamento: ['', Validators.required],
  });

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 4);
    this.router.navigate([Rotas.CONFIRMACAO]);
  }

  etapaAnterior() {
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
    this.router.navigate([Rotas.CONTATO]);
  }

  setvalor(event: any, campo: string): void {
    if (!event) {
      this.form.get(campo)?.setErrors({ error: true });
      return;
    }

    this.form.get(campo)?.setValue(event);

    console.log(this.form.get(campo)?.value);
  }
}
