/**
 * @Componente CadastroComponent
 *
 * Este componente é responsável por exibir e gerenciar o formulário de autocadastro do usuário.
 * Utiliza inputs customizados para nome, email, senha e cpf, com validação reativa.
 *
 * @Propriedades
 * @protected form {FormGroup} - Formulário reativo de cadastro
 *
 * @Exemplo
 * ```html
 * <app-cadastro></app-cadastro>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 08/08/2025
 */

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MpcInputTextComponent, MpcInputEmailComponent, MpcInputSenhaComponent, MpcInputCpfcnpjComponent, MpcButtonComponent, MpcInputCheckboxComponent, CheckboxOption, MpcInputTelefoneComponent } from 'mpc-lib-angular';
import { AuthService, Usuario } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Rotas } from '../../../shared/enums/rotas-enum';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MpcInputTextComponent,
    MpcInputEmailComponent,
    MpcInputSenhaComponent,
    MpcInputCpfcnpjComponent,
    MpcButtonComponent,
    MpcInputCheckboxComponent,
    MpcInputTelefoneComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export default class CadastroComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly notificacaoService = inject(ToastrService);
  private readonly router = inject(Router);

  // Exibição de ano atual no footer
  protected anoAtual = new Date().getFullYear();

  /**
   * Opções de Acesso para o checkbox.
   */
  protected acessos: CheckboxOption[] = [
    { label: 'Administrador', value: 'Administrador', checked: true },
    { label: 'Financeiro', value: 'Financeiro', checked: false },
    { label: 'RH', value: 'RH', checked: false },
    { label: 'Logística', value: 'Logística', checked: true },
    { label: 'Vendas', value: 'Vendas', checked: false },
    { label: 'TI', value: 'TI', checked: false },
  ];

  /**
   * Formulário reativo de cadastro.
   */
  protected form = this.formBuilder.group({
    nome: [''],
    email: [''],
    senha: [''],
    confirmarSenha: [''],
    cpf: [''],
    telefone: [''],
    acessos: ['']
  });

  /**
   * Realiza a ação de cadastro, validando o formulário e executando a lógica de registro.
   */
  protected cadastrar(): void {
    if (this.form.valid) {

      const { nome, email, senha, confirmarSenha, cpf, telefone, acessos } = this.form.value;

      if (senha != confirmarSenha) {
        this.notificacaoService.error('As senhas não são iguais');
        return;
      }

      const usuario: Usuario = { nome, email, senha, cpf, telefone }

      console.log(usuario);

      this.authService.cadastrar(usuario).subscribe({
        next: () => {
          this.notificacaoService.success('Cadastro realizado com sucesso!');
          this.irParaLogin();
        },
        error: (error) => {
          // Verifica se há uma mensagem de erro específica da API
          const errorMessage = error?.error?.error || 'Não foi possível efetuar o cadastro!';
          this.notificacaoService.error(errorMessage);
        }
      });

    } else {
      this.notificacaoService.error('Por favor, preencha todos os campos corretamente!');
    }
  }

  /**
   * Navega para a tela de login.
   */
  protected irParaLogin(): void {
    this.router.navigate([Rotas.LOGIN]);
  }
}
