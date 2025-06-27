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
      },
      titulo: 'Erro de Conexão',
      rotaRetorno: Rotas.PAGINA_ERRO
    };

    this.errorService.construirErro(erroSimulado);
  }

  simularErroGenerico(): void {
    const erroSimulado = {
      titulo: "Ops, algo deu errado!",
      mensagem: "Não foi possível realizar a operação, tente novamente e caso o problema persista, entre em contato com o suporte.",
      rotaRetorno: Rotas.PAGINA_ERRO
    };

    this.errorService.construirErro(erroSimulado);
  }

  simularErroValidacao(): void {
    const erroValidacao = {
      error: {
        message: 'Dados inválidos fornecidos',
        status: 400
      },
      titulo: 'Erro de Validação',
      rotaRetorno: Rotas.PAGINA_ERRO
    };

    this.errorService.construirErro(erroValidacao);
  }

  simularErroComImagem(): void {
    const erroSimulado = {
      error: {
        message: 'Erro com imagem personalizada',
        status: 404
      },
      titulo: 'Erro Personalizado',
      rotaRetorno: Rotas.PAGINA_ERRO,
      imagem: 'assets/img/modal/atencao.png'
    };

    this.errorService.construirErro(erroSimulado);
  }
} 