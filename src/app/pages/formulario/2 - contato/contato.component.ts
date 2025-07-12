/**
 * @Componente ContatoComponent
 *
 * Este componente é responsável por exibir e gerenciar o formulário de contato do usuário,
 * incluindo campos de telefone, email e endereço, com integração de busca de CEP e barra de progresso.
 *
 * @Propriedades
 * @protected form {FormGroup} - Formulário reativo de contato
 *
 * @Exemplo
 * ```html
 * <app-contato></app-contato>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 27/06/2025
 * @updated 10/07/2025
 */

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rotas } from '../../../shared/enums/rotas-enum';
import { FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { InscricaoService } from '../service/inscricao.service';
import { MpcInputTextComponent, MpcInputTelefoneComponent, MpcFormProgressBarComponent, MpcInputEmailComponent, Endereco, MpcInputBuscaCepComponent, MpcLoaderService, MpcButtonComponent } from 'mpc-lib-angular';
import { MpcErrorService } from '../../../shared/components/mpc-error/mpc-error.service';
@Component({
  selector: 'app-contato',
  imports: [
    FormsModule,
    ReactiveFormsModule, MpcInputTextComponent, MpcInputTelefoneComponent,
    MpcFormProgressBarComponent,
    MpcInputEmailComponent,
    MpcInputBuscaCepComponent,
    MpcButtonComponent
],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export default class ContatoComponent implements OnInit {

  // Injeções
  private readonly router = inject(Router);
  private readonly inscricaoService = inject(InscricaoService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly errorService = inject(MpcErrorService);
  private readonly loaderService = inject(MpcLoaderService);

  /**
   * Formulário reativo de contato.
   */
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
   * Preenche o endereço no formulário a partir do CEP informado.
   * @param endereco Objeto de endereço retornado pela busca de CEP
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
