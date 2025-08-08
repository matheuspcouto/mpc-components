/**
 * @Componente LoginComponent
 *
 * Este componente é responsável por exibir e gerenciar o formulário de login do usuário.
 * Utiliza inputs customizados para email e senha, validação reativa e pode ser expandido para autenticação real.
 *
 * @Propriedades
 * @protected form {FormGroup} - Formulário reativo de login
 *
 * @Exemplo
 * ```html
 * <app-login></app-login>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 24/06/2025
 * @updated 04/08/2025
 */

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MpcInputSenhaComponent, MpcInputEmailComponent, MpcButtonComponent } from 'mpc-lib-angular';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Rotas } from '../../../shared/enums/rotas-enum';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MpcInputSenhaComponent,
    MpcInputEmailComponent,
    MpcButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Exibição de ano atual no footer
  protected anoAtual = new Date().getFullYear();
  // Flag de exibição de alert de erro
  protected loginError: boolean = false;

  /**
   * Formulário reativo de login.
   */
  protected form = this.formBuilder.group({
    email: [''],
    senha: ['']
  });

  /**
   * Realiza a ação de login, validando o formulário e executando a lógica de autenticação.
   */
  protected login(): void {
    if (this.form.valid) {
      const { email, senha } = this.form.value;

      this.authService.login(email!, senha!).subscribe({
        next: (isLoginSuccess: boolean) => {

          if (isLoginSuccess) {
            this.router.navigate([Rotas.HOME]);
          } else {
            this.loginError = true;
          }

        },
        error: () => this.loginError = true
      });
    }
  }

  /**
   * Redireciona para tela de cadastro de usuário.
   */
  protected cadastrar(): void {
    this.router.navigate([Rotas.CADASTRO]);
  }
}
