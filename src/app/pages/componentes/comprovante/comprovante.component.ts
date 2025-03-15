import { Component, ViewChild } from '@angular/core';
import { MpcNavbarComponent } from '../../../shared/components/mpc-navbar/mpc-navbar.component';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';
import { MpcComprovanteComponent } from '../../../shared/components/mpc-comprovante/mpc-comprovante.component';
import { MpcComprovanteConfig } from '../../../shared/components/mpc-comprovante/mpc-comprovante.directive';

@Component({
  selector: 'app-comprovante',
  imports: [ MpcButtonComponent, MpcNavbarComponent, MpcComprovanteComponent ],
  templateUrl: './comprovante.component.html',
  styleUrl: './comprovante.component.css'
})
export class ComprovanteComponent {

  @ViewChild('comprovanteExemplo', { static: true }) comprovanteExemplo!: MpcComprovanteComponent;
  dadosComprovante: MpcComprovanteConfig = {} as MpcComprovanteConfig;

  abrirModalComprovante() {
      this.dadosComprovante = {
        titulo: 'Comprovante de inscrição',
        dados: {
          dadosInscricao: {
            codigoInscricao: '123456',
            dataInscricao: new Date().toLocaleDateString('pt-BR'),
            status: 'ATIVO',
          },
          dadosPessoais: [
            { label: 'Nome', valor: 'Fulano de Tal' },
            { label: 'CPF', valor: '123.456.789-00' },
            { label: 'E-mail', valor: 'fulano@example.com' },
          ],
          dadosPagamento: {
            formaPagamento: 'Cartão de Crédito',
            valor: 100.00,
            statusPagamento: 'A PAGAR'
          },
        }
      };

      this.comprovanteExemplo?.abrirComprovante();
    }

}
