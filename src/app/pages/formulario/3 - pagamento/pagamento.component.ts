import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FluxoErro } from '../../../shared/fluxo-erro';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputSelectComponent } from '../../../shared/components/mpc-input-select/mpc-input-select.component';
import { InscricaoService } from '../inscricao.service';

@Component({
  selector: 'app-pagamento',
  imports: [
    CommonModule, MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcButtonComponent, MpcInputSelectComponent,
    MpcNavbarComponent, MpcFormProgressBarComponent
  ],
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export default class PagamentoComponent {

  formasPagamento = ['Cartão', 'Pix', 'Dinheiro'];

  form = new FormGroup({
    formaPagamento: new FormControl('', Validators.required)
  });

  constructor(private fluxoErro: FluxoErro, private inscricaoService: InscricaoService, private router: Router) { }

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 4);
    this.router.navigate([Rotas.CONFIRMACAO]);
  }

  etapaAnterior() {
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 2);
    this.router.navigate([Rotas.CONTATO]);
  }

  setValorCampo(event: any, campo: string): void {
    if (!event) {
      this.form.get(campo)?.setErrors({ error: true });
      return;
    }

    this.form.get(campo)?.setValue(event);

    console.log(this.form.get(campo)?.value);
  }
}
