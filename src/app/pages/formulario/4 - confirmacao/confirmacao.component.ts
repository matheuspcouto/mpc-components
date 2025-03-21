import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InscricaoService } from '../inscricao.service';
import { Router } from '@angular/router';
import { MpcButtonComponent } from '../../../shared/components/mpc-button/mpc-button.component';

@Component({
  selector: 'app-confirmacao',
  imports: [CommonModule, MpcButtonComponent],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css'
})
export class ConfirmacaoComponent implements OnInit {

  dadosInscricao: any;
  dadosPessoais: any;
  dadosPagamento: any;

  constructor(private router: Router, private inscricaoService: InscricaoService) { }

  ngOnInit(): void {
    const dados = this.inscricaoService.getDadosInscricao();
    console.log(dados);
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  formatarData(data: string): string {
    const date = new Date(data);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return new Date(date).toLocaleDateString('pt-BR');
    }

    return data.substring(0, 10);
  }

  inscrever() {}

  voltar() {}
}
