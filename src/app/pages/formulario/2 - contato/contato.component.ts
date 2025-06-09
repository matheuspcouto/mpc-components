import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';
import { InscricaoService } from '../inscricao.service';
import { emailValidator, telefoneValidator } from '../inscricao.validator';
import { MpcInputTelefoneComponent } from '../../../shared/components/Inputs/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputEmailComponent } from '../../../shared/components/Inputs/mpc-input-email/mpc-input-email.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { ToastrService } from 'ngx-toastr';
import { Endereco, MpcInputPesquisaCepComponent } from "../../../shared/components/Inputs/mpc-input-pesquisa-cep/mpc-input-pesquisa-cep.component";

@Component({
  selector: 'app-contato',
  imports: [
    CommonModule, MpcModalComponent, FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputTelefoneComponent,
    MpcButtonComponent, MpcNavbarComponent, MpcFormProgressBarComponent,
    MpcInputEmailComponent,
    MpcInputPesquisaCepComponent
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export default class ContatoComponent implements OnInit {

  private router = inject(Router);
  private inscricaoService = inject(InscricaoService);
  private formBuilder = inject(NonNullableFormBuilder);
  private notificationService = inject(ToastrService);

  @ViewChild('modalErro', { static: true }) protected modalErro!: MpcModalComponent;

  protected form = this.formBuilder.group({
    telefone: ['', telefoneValidator],
    email: ['', emailValidator],
    rua: ['', Validators.required],
    numero: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    cep: ['', Validators.required],
    complemento: [''],
  });

  ngOnInit(): void {
    this.atualizarForm();
  }

  atualizarForm(): void {
    try {
      const dadosInscricao = this.inscricaoService.getDadosInscricao();

      if (this.inscricaoService.isContatoCompleto()) {
        this.form.reset();

        this.form.patchValue({
          telefone: dadosInscricao.telefone,
          email: dadosInscricao.email,
          rua: dadosInscricao.rua,
          numero: dadosInscricao.numero,
          bairro: dadosInscricao.bairro,
          cidade: dadosInscricao.cidade,
          estado: dadosInscricao.estado,
          cep: dadosInscricao.cep,
          complemento: dadosInscricao.complemento,
        });
      }
    } catch (error) {
      this.abrirModalErro('Erro', 'Não foi possível carregar os dados da inscrição');
    }
  }

  proximaEtapa(): void {
    if (this.form.invalid) {
      this.notificationService.error('Preencha todos os campos obrigatórios corretamente!');
      return;
    }
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 3);
    this.router.navigate([Rotas.PAGAMENTO]);
  }

  etapaAnterior(): void {
    this.inscricaoService.atualizarDadosInscricao(this.form.value, 1);
    this.router.navigate([Rotas.DADOS_PESSOAIS]);
  }

  abrirModalErro(titulo: string, texto: string): void {
    const modalErro: MpcModalConfig = {
      titulo: titulo,
      texto: texto,
      tipoModal: TipoModal.ERRO,
      botao: () => this.modalErro?.fecharModal(),
      textoBotao: 'OK'
    }

    this.modalErro?.abrirModal(modalErro);
  }

  definirEnderecoPorCep(endereco: Endereco): void {
    this.form.patchValue({
      rua: endereco.rua,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep
    });
  }
}
