import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { MpcFormProgressBarComponent } from '../../../shared/components/mpc-form-progress-bar/mpc-form-progress-bar.component';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcInputTextComponent } from '../../../shared/components/Inputs/mpc-input-text/mpc-input-text.component';
import { InscricaoService } from '../service/inscricao.service';
import { MpcInputTelefoneComponent } from '../../../shared/components/Inputs/mpc-input-telefone/mpc-input-telefone.component';
import { MpcInputEmailComponent } from '../../../shared/components/Inputs/mpc-input-email/mpc-input-email.component';
import { ToastrService } from 'ngx-toastr';
import { Endereco, MpcInputBuscaCepComponent } from "../../../shared/components/Inputs/mpc-input-busca-cep/mpc-input-busca-cep.component";
import { ErrorService } from '../../../shared/error/error.service';

@Component({
  selector: 'app-contato',
  imports: [
    FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputTelefoneComponent,
    MpcButtonComponent, MpcFormProgressBarComponent,
    MpcInputEmailComponent,
    MpcInputBuscaCepComponent
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export default class ContatoComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly notificationService = inject(ToastrService);
  private readonly errorService = inject(ErrorService);

  protected form = this.formBuilder.group({
    telefone: [''],
    email: [''],
    rua: [''],
    numero: [''],
    bairro: [''],
    cidade: [''],
    estado: [''],
    cep: [''],
    complemento: [''],
  });

  ngOnInit(): void {
    this.atualizarForm();
  }

  private atualizarForm(): void {
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
      this.errorService.construirErro(error);
    }
  }

  protected proximaEtapa(): void {
    try {
      if (this.form.invalid) {
        this.notificationService.error('Preencha todos os campos obrigatórios corretamente!');
      } else {
        this.inscricaoService.atualizarDadosInscricao(this.form.value, 3);
        this.router.navigate([Rotas.PAGAMENTO]);
      }
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  protected etapaAnterior(): void {
    try {
      this.inscricaoService.atualizarDadosInscricao(this.form.value, 1);
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

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
