export class Responsaveis {
  public nome_responsavel: string;
  public cpf_responsavel: string;
  public telefone: string;
  public email: string;
  public registro_oab: string;

  constructor(
    nome_responsavel: string,
    cpf_responsavel: string,
    telefone: string,
    email: string,
    registro_oab: string,
  ) {
    this.nome_responsavel = nome_responsavel;
    this.cpf_responsavel = cpf_responsavel;
    this.telefone = telefone;
    this.email = email;
    this.registro_oab = registro_oab;
  }
}
