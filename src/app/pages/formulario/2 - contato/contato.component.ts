import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputTextComponent } from '../../../shared/components/mpc-input-text/mpc-input-text.component';
import { InscricaoService } from '../inscricao.service';
import { emailValidator, telefoneValidator } from '../inscricao.validator';
import { MpcInputTelefoneComponent } from '../../../shared/components/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputEmailComponent } from '../../../shared/components/mpc-input-email/mpc-input-email.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';

@Component({
  selector: 'app-contato',
  imports: [
    CommonModule, MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputTelefoneComponent,
    MpcButtonComponent, MpcNavbarComponent, MpcFormProgressBarComponent,
    MpcInputEmailComponent
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export default class ContatoComponent implements OnInit {

  @ViewChild('modalErro', { static: true }) modalErro!: MpcModalComponent;

  form = new FormGroup({
    telefone: new FormControl('', telefoneValidator),
    email: new FormControl('', emailValidator),
    endereco: new FormControl('', Validators.required)
  });

  constructor(private inscricaoService: InscricaoService, private router: Router) { }

  ngOnInit(): void {
    this.atualizarForm();
  }

  atualizarForm() {
    try {
      const dadosInscricao = this.inscricaoService.getDadosInscricao();
      if (dadosInscricao) this.form.patchValue(dadosInscricao);
    } catch (error) {
      this.abrirModalErro('Erro', 'Não foi possível carregar os dados da inscrição');
    }
  }

  proximaEtapa() {
    if (this.form.invalid) return;
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 3);
    this.router.navigate([Rotas.PAGAMENTO]);
  }

  etapaAnterior() {
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 1);
    this.router.navigate([Rotas.DADOS_PESSOAIS]);
  }

  setValorCampo(event: any, campo: string): void {
    if (!event) {
      this.form.get(campo)?.setErrors({ error: true });
      return;
    }

    this.form.get(campo)?.setValue(event);
  }

  abrirModalErro(titulo: string, texto: string) {
    const modalErro: MpcModalConfig = {
      titulo: titulo,
      texto: texto,
      tipoModal: TipoModal.ERRO,
      botao: () => this.modalErro?.fecharModal(),
      textoBotao: 'OK'
    }

    this.modalErro?.abrirModal(modalErro);
  }
}
