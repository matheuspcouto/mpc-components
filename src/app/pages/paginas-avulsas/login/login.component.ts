import { Component, inject } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MpcInputSenhaComponent } from '../../../shared/components/Inputs/mpc-input-senha/mpc-input-senha.component';
import { MpcInputEmailComponent } from '../../../shared/components/Inputs/mpc-input-email/mpc-input-email.component';
import { MpcButtonDirective } from '../../../shared/directives/mpc-button/mpc-button.directive';

@Component({
  selector: 'app-login',  
  imports: [
    ReactiveFormsModule,
    MpcInputSenhaComponent,
    MpcInputEmailComponent,
    MpcButtonDirective
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected form = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

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
