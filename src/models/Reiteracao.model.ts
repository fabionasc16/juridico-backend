export class Reiteracao {
  public num_procedimento?: string;
  public numero_siged?: string;
  public data_processo?: Date;
  public prazo?: number;
  public fk_status: number;
  public data_recebimento?: Date;
  public hora_recebimento?: Date;
  public reiteracao?: string;
  public fk_processo: number;

  constructor(
    fk_processo: number,
    fk_status: number,
    numero_siged?: string,
    data_recebimento?: Date,
    hora_recebimento?: Date,
    num_procedimento?: string,
    data_processo?: Date,
    reiteracao?: string,
    prazo?: number,
  ) {
    this.num_procedimento = num_procedimento;
    this.numero_siged = numero_siged;
    this.data_processo = data_processo;
    this.prazo = prazo;
    this.fk_status = fk_status;
    this.data_recebimento = data_recebimento;
    this.hora_recebimento = hora_recebimento;
    this.reiteracao = reiteracao;
    this.fk_processo = fk_processo;
  }
}
