import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MpcInputTextComponent } from '../../shared/components/mpc-input-text/mpc-input-text.component';
import { MpcInputEmailComponent } from '../../shared/components/mpc-input-email/mpc-input-email.component';
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';
import { MpcInputSenhaComponent } from '../../shared/components/mpc-input-senha/mpc-input-senha.component';

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

  private formBuilder = inject(NonNullableFormBuilder);
  private router = inject(Router);

  protected form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  login(): void {
    if (this.form.valid) {
      const { email, senha } = this.form.value;

      // Implementar lógica de autenticação aqui
      console.log('Login:', { email, senha });

      // Exemplo de redirecionamento após login bem-sucedido
      // this.router.navigate(['/dashboard']);
    }
  }
}
