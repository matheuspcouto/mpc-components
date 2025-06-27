import { Component, inject } from '@angular/core';
import { MpcNavbarComponent } from '../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcButtonComponent } from '../../shared/components/mpc-button/mpc-button.component';
import { ErrorService } from '../../shared/error/error.service';
import { Rotas } from '../../shared/enums/rotas-enum';
import { MpcFooterComponent } from '../../shared/components/mpc-footer/mpc-footer.component';

@Component({
  selector: 'app-pagina-erro',
  standalone: true,
  imports: [MpcNavbarComponent, MpcButtonComponent, MpcFooterComponent],
  templateUrl: './pagina-erro.component.html',
  styleUrl: './pagina-erro.component.css'
})
export class PaginaErroComponent {
  private errorService = inject(ErrorService);

  simularErroDetalhado(): void {
    const erroSimulado = {
      error: {
        message: 'Erro de conexão com o servidor',
        status: 500
      }
    };

    this.errorService.construirErro(erroSimulado, Rotas.PAGINA_ERRO);
  }

  simularErroGenerico(): void {
    this.errorService.construirErro(null, Rotas.PAGINA_ERRO);
  }

  simularErroValidacao(): void {
    const erroValidacao = {
      error: {
        message: 'Dados inválidos fornecidos',
        status: 400
      }
    };

    this.errorService.construirErro(erroValidacao, Rotas.PAGINA_ERRO);
  }

  simularErroComImagem(): void {
    const erroSimulado = {
      error: {
        message: 'Erro com imagem personalizada',
        status: 404
      }
    };

    this.errorService.construirErro(
      erroSimulado,
      Rotas.PAGINA_ERRO,
      'assets/img/modal/atencao.png'
    );
  }
} 