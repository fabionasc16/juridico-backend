export class OrgaoDemandante {
  public orgao_demandante: string;
  public sigla_orgao: string;
  public esfera_orgao: string;
  public orgao_controle: string;
  public orgao_justica: string;

  constructor(
    orgao_demandante: string,
    sigla_orgao: string,
    esfera_orgao: string,
    orgao_controle: string,
    orgao_justica: string,
  ) {
    this.orgao_demandante = orgao_demandante;
    this.sigla_orgao = sigla_orgao;
    this.esfera_orgao = esfera_orgao;
    this.orgao_controle = orgao_controle;
    this.orgao_justica = orgao_justica;
  }
}

const classe = new OrgaoDemandante('a', 'a', 'a', 'a', 'a');
