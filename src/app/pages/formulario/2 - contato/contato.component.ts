import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MpcModalComponent, TipoModal } from '../../../shared/components/mpc-modal/mpc-modal.component';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { CommonModule } from '@angular/common';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { Validators, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputTextComponent } from '../../../shared/components/mpc-input-text/mpc-input-text.component';
import { InscricaoService } from '../inscricao.service';
import { emailValidator, telefoneValidator } from '../inscricao.validator';
import { MpcInputTelefoneComponent } from '../../../shared/components/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputEmailComponent } from '../../../shared/components/mpc-input-email/mpc-input-email.component';
import { MpcModalConfig } from '../../../shared/components/mpc-modal/mpc-modal.directive';
import { ToastrService } from 'ngx-toastr';

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

  private router = inject(Router);
  private inscricaoService = inject(InscricaoService);
  private formBuilder = inject(NonNullableFormBuilder);
  private notificationService = inject(ToastrService);

  @ViewChild('modalErro', { static: true }) protected modalErro!: MpcModalComponent;

  protected form = this.formBuilder.group({
    telefone: ['', telefoneValidator],
    email: ['', emailValidator],
    logradouro: ['', Validators.required],
    numero: ['', Validators.required],
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

      if (dadosInscricao.telefone) {
        this.form.reset();

        this.form.patchValue({
          telefone: dadosInscricao.telefone,
          email: dadosInscricao.email,
          logradouro: dadosInscricao.logradouro,
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

  pequisarCep(cep: string | undefined): void {
    if (!cep) {
      this.abrirModalErro('Erro', 'O CEP deve conter 8 dígitos');
      return;
    }

    this.inscricaoService.pesquisarCep(cep).subscribe({
      next: (response) => {
        this.form.patchValue({
          logradouro: response.logradouro,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf,
          numero: response.unidade,
          cep: response.cep
        });
      },
      error: () => {
        this.abrirModalErro('Erro', 'Não foi possível encontrar o endereço');
      }
    });
  }
}
