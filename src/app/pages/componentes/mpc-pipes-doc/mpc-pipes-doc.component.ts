import { Component } from '@angular/core';
import { CepMaskPipe, CpfCnpjMaskPipe, TelefoneMaskPipe, EmailMaskPipe } from 'mpc-lib-angular';

/**
 * @Componente MpcPipesDocComponent
 *
 * Este componente exibe exemplos e documentação dos pipes de máscara da biblioteca MPC,
 * incluindo CEP, CPF/CNPJ, telefone e e-mail.
 *
 * @Exemplo
 * ```html
 * <app-mpc-pipes-doc></app-mpc-pipes-doc>
 * ```
 *
 * @author Matheus Pimentel Do Couto
 * @created 10/07/2025
 * @updated 10/07/2025
 */
@Component({
  selector: 'app-mpc-pipes-doc',
  standalone: true,
  imports: [CepMaskPipe, CpfCnpjMaskPipe, TelefoneMaskPipe, EmailMaskPipe],
  templateUrl: './mpc-pipes-doc.component.html',
  styleUrl: './mpc-pipes-doc.component.css'
})
export class MpcPipesDocComponent {} 