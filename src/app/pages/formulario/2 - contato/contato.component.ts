/**
 * @Componente ContatoComponent
 * Este componente é responsável por exibir e gerenciar o formulário de contato.
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 04/07/2025
 */

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { InscricaoService } from '../service/inscricao.service';
import { ErrorService } from '../../../shared/error/error.service';
import {
  MpcButtonDirective, MpcFormProgressBarComponent, MpcInputTextComponent,
  MpcInputTelefoneComponent, MpcInputEmailComponent, MpcInputBuscaCepComponent, Endereco, MpcLoaderService
} from 'mpc-lib-angular';

@Component({
  selector: 'app-contato',
  imports: [
    FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputTelefoneComponent,
    MpcButtonDirective, MpcFormProgressBarComponent,
    MpcInputEmailComponent,
    MpcInputBuscaCepComponent
  ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export default class ContatoComponent implements OnInit {

  // Injeções
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly errorService = inject(ErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  // Formulário
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

  /**
   * Inicializa o formulário e atualiza os dados se já existirem.
   */
  ngOnInit(): void {
    this.atualizarForm();
  }

  /**
   * Atualiza o formulário com os dados salvos, se existirem.
   */
  private atualizarForm(): void {
    try {
      this.loaderService.show();
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
    } finally {
      this.loaderService.hide();
    }
  }

  /**
   * Avança para a próxima etapa do formulário, validando os campos.
   */
  protected proximaEtapa(): void {
    try {
      this.inscricaoService.atualizarDadosInscricao({ novosDados: this.form.value, proximaEtapa: 3 });
      this.router.navigate([Rotas.PAGAMENTO]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Volta para a etapa anterior do formulário.
   */
  protected etapaAnterior(): void {
    try {
      this.inscricaoService.atualizarDadosInscricao({ novosDados: this.form.value, proximaEtapa: 1 });
      this.router.navigate([Rotas.DADOS_PESSOAIS]);
    } catch (error) {
      this.errorService.construirErro(error);
    }
  }

  /**
   * Preenche o endereço no formulário a partir do CEP.
   */
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
