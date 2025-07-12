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
 * @updated 10/07/2025
 */

import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcInputSenhaComponent, MpcInputEmailComponent, MpcButtonComponent } from 'mpc-lib-angular';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MpcInputSenhaComponent,
    MpcInputEmailComponent,
    MpcButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

  /**
   * Instância do formBuilder para criação do formulário reativo.
   */
  private readonly formBuilder = inject(NonNullableFormBuilder);

  /**
   * Formulário reativo de login.
   */
  protected form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  /**
   * Realiza a ação de login, validando o formulário e executando a lógica de autenticação.
   */
  protected login(): void {
    if (this.form.valid) {
      const { email, senha } = this.form.value;
      // Implementar lógica de autenticação aqui
      console.log('Login:', { email, senha });
      // Exemplo de redirecionamento após login bem-sucedido
      // this.router.navigate(['/dashboard']);
    }
  }
}
