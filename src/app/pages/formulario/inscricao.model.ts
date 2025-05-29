export class Inscricao {
  id?: number;
  nome?: string;
  sobrenome?: string;
  dataNasc?: string;
  sexo?: string;
  estadoCivil?: string;
  idade?: number;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  formaPagamento?: string;
  valor?: number;
  dataInscricao?: string;
  status?: string;

  constructor() { }

  // Métodos de construção e inicialização de campos

  /**
   * @description Inicializa os campos de dados pessoais da inscrição aplicando formatação
   * @param {any} [dados] - Dados da inscrição
   * @returns {Inscricao} Retorna a própria instância para permitir method chaining
   * @example
   * const inscricao = new Inscricao();
   * inscricao.inicializarDadosPessoais('joão', 'silva santos', '1990-01-01', 'M', 'Solteiro', 33, '12345678901');
   */
  inicializarDadosPessoais(dados: any): Inscricao {
    this.nome = this.formatarNomeCompleto(dados.nome, dados.sobrenome);
    this.dataNasc = this.formatarDataNascimento(dados.dataNasc);
    this.sexo = dados.sexo;
    this.estadoCivil = dados.estadoCivil;
    this.idade = dados.idade;
    this.cpfCnpj = this.formatarCpfCnpj(dados.cpfCnpj);
    return this;
  }

  /**
   * @description Inicializa os campos de contato da inscrição aplicando formatação
   * @param {any} [dados] - Dados da inscrição
   * @returns {Inscricao} Retorna a própria instância para permitir method chaining
   * @example
   * const inscricao = new Inscricao();
   * inscricao.inicializarContato('(11) 99999-9999', 'joao@email.com', 'Rua das Flores, 123');
   */
  inicializarContato(dados: any): Inscricao {
    this.telefone = this.formatarTelefone(dados.telefone);
    this.email = dados.email?.toLowerCase().trim();
    this.endereco = this.formatarEndereco(dados);
    return this;
  }

  /**
   * @description Inicializa os campos de pagamento da inscrição
   * @param {any} [dados] - Dados da inscrição
   * @returns {Inscricao} Retorna a própria instância para permitir method chaining
   * @example
   * const inscricao = new Inscricao();
   * inscricao.inicializarPagamento('Cartão de Crédito', 150.00);
   */
  inicializarPagamento(dados: any): Inscricao {
    this.formaPagamento = dados.formaPagamento;
    this.valor = dados.valor || 100.00;
    return this;
  }

  // Métodos de formatação

  /**
   * @description Formata e unifica nome e sobrenome com a primeira letra de cada palavra em maiúscula
   * @param {string} [nome] - Primeiro nome
   * @param {string} [sobrenome] - Sobrenome
   * @returns {string} Nome completo formatado
   * @example
   * const inscricao = new Inscricao();
   * const nomeFormatado = inscricao.formatarNomeCompleto('joão', 'silva santos');
   * // Retorna: "João Silva Santos"
   */
  formatarNomeCompleto(nome?: string, sobrenome?: string): string {
    const nomeParaFormatar = nome || '';
    const sobrenomeParaFormatar = sobrenome || '';

    if (!nomeParaFormatar && !sobrenomeParaFormatar) return '';

    const nomeCompleto = `${nomeParaFormatar.trim()} ${sobrenomeParaFormatar.trim()}`;

    return nomeCompleto;
  }

  /**
   * @description Formata data de nascimento do formato YYYY-MM-DD para DD/MM/YYYY
   * @param {string} [dataNasc] - Data de nascimento no formato YYYY-MM-DD ou DD/MM/YYYY
   * @returns {string} Data formatada no padrão brasileiro (DD/MM/YYYY)
   * @example
   * const inscricao = new Inscricao();
   * const dataFormatada = inscricao.formatarDataNascimento('1990-12-25');
   * // Retorna: "25/12/1990"
   */
  formatarDataNascimento(dataNasc?: string): string {
    const dataParaFormatar = dataNasc || this.dataNasc;
    if (!dataParaFormatar) return '';

    // Se a data estiver no formato YYYY-MM-DD, converte para DD/MM/YYYY
    if (dataParaFormatar.includes('-')) {
      const [ano, mes, dia] = dataParaFormatar.split('-');
      return `${dia}/${mes}/${ano}`;
    }

    return dataParaFormatar;
  }

  /**
   * @description Formata CPF ou CNPJ aplicando a máscara apropriada
   * @param {string} [cpfCnpj] - CPF ou CNPJ sem formatação
   * @returns {string} CPF formatado (000.000.000-00) ou CNPJ formatado (00.000.000/0000-00)
   * @example
   * const inscricao = new Inscricao();
   * const cpfFormatado = inscricao.formatarCpfCnpj('12345678901');
   * // Retorna: "123.456.789-01"
   *
   * const cnpjFormatado = inscricao.formatarCpfCnpj('12345678000195');
   * // Retorna: "12.345.678/0001-95"
   */
  formatarCpfCnpj(cpfCnpj?: string): string {
    const cpfCnpjParaFormatar = cpfCnpj || this.cpfCnpj;
    if (!cpfCnpjParaFormatar) return '';

    // Remove caracteres não numéricos
    const numeros = cpfCnpjParaFormatar.replace(/\D/g, '');

    if (numeros.length === 11) {
      // Formato CPF: 000.000.000-00
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numeros.length === 14) {
      // Formato CNPJ: 00.000.000/0000-00
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return cpfCnpjParaFormatar;
  }

  /**
   * @description Formata telefone aplicando máscara para telefone fixo ou celular
   * @param {string} [telefone] - Número de telefone sem formatação
   * @returns {string} Telefone formatado: (00) 0000-0000 para fixo ou (00) 00000-0000 para celular
   * @example
   * const inscricao = new Inscricao();
   * const telefoneFixo = inscricao.formatarTelefone('1133334444');
   * // Retorna: "(11) 3333-4444"
   *
   * const celular = inscricao.formatarTelefone('11999998888');
   * // Retorna: "(11) 99999-8888"
   */
  formatarTelefone(telefone?: string): string {
    const telefoneParaFormatar = telefone || this.telefone;
    if (!telefoneParaFormatar) return '';

    // Remove caracteres não numéricos
    const numeros = telefoneParaFormatar.replace(/\D/g, '');

    if (numeros.length === 10) {
      // Formato telefone fixo: (00) 0000-0000
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 11) {
      // Formato celular: (00) 00000-0000
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    return telefoneParaFormatar;
  }

  /**
 * @description Formata endereço completo concatenando todos os campos de endereço fornecidos
 * @param {any} [dados] - Dados da inscrição
 * @returns {string} Endereço formatado no padrão: "Rua, Número, Complemento, Bairro, Cidade, Estado - CEP: 00000-000"
 * @example
 * const inscricao = new Inscricao();
 * const endereco = inscricao.formatarEndereco('Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', 'Apto 45');
 * // Retorna: "Rua das Flores, 123, Apto 45, Centro, São Paulo, SP - CEP: 01234-567"
 */
  formatarEndereco(dados: any): string {
    const campos = [
      dados.rua?.trim(),
      dados.numero?.trim(),
      dados.complemento?.trim(),
      dados.bairro?.trim(),
      dados.cidade?.trim(),
      dados.estado?.trim()
    ].filter(campo => campo && campo.length > 0);

    let endereco = campos.join(', ');

    if (dados.cep?.trim()) {
      endereco += ` - CEP: ${dados.cep.trim()}`;
    }

    return endereco;
  }


  /**
   * @description Remove todos os caracteres não numéricos do CPF/CNPJ
   * @param {string} [cpfCnpj] - CPF ou CNPJ com ou sem formatação
   * @returns {string} Apenas os números do CPF/CNPJ
   * @example
   * const inscricao = new Inscricao();
   * const numeros = inscricao.obterCpfCnpjNumeros('123.456.789-01');
   * // Retorna: "12345678901"
   */
  obterCpfCnpjNumeros(cpfCnpj?: string): string {
    const cpfCnpjParaLimpar = cpfCnpj || this.cpfCnpj;
    if (!cpfCnpjParaLimpar) return '';
    return cpfCnpjParaLimpar.replace(/\D/g, '');
  }

  /**
   * @description Remove todos os caracteres não numéricos do telefone
   * @param {string} [telefone] - Telefone com ou sem formatação
   * @returns {string} Apenas os números do telefone
   * @example
   * const inscricao = new Inscricao();
   * const numeros = inscricao.obterTelefoneNumeros('(11) 99999-8888');
   * // Retorna: "11999998888"
   */
  obterTelefoneNumeros(telefone?: string): string {
    const telefoneParaLimpar = telefone || this.telefone;
    if (!telefoneParaLimpar) return '';
    return telefoneParaLimpar.replace(/\D/g, '');
  }
}
