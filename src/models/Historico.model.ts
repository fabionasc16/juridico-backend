export class Historico {
  public data_historico: Date;
  public id_usuario: string;
  public fk_tipoevento: number;
  public fk_processo: number;
  public fk_responsavel: number;
  public fk_status: number;

  constructor(
    data_historico: Date,
    id_usuario: string,
    fk_tipoevento: number,
    fk_processo: number,
    fk_responsavel: number,
    fk_status: number,
  ) {
    this.data_historico = data_historico;
    this.id_usuario = id_usuario;
    this.fk_tipoevento = fk_tipoevento;
    this.fk_processo = fk_processo;
    this.fk_responsavel = fk_responsavel;
    this.fk_status = fk_status;
  }
}
