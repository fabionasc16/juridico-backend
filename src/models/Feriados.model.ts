export class Feriados {
  public data_feriado: Date;
  public desc_feriado: string;
  public dia_feriado?: number;
  public mes_feriado?: number;
  public ano_feriado?: number;
  public tipo_feriado: string;

  constructor(
    data_feriado: Date,
    desc_feriado: string,
    tipo_feriado: string,
    dia_feriado?: number,
    mes_feriado?: number,
    ano_feriado?: number,
  ) {
    this.data_feriado = data_feriado;
    this.desc_feriado = desc_feriado;
    this.dia_feriado = dia_feriado;
    this.mes_feriado = mes_feriado;
    this.ano_feriado = ano_feriado;
    this.tipo_feriado = tipo_feriado;
  }
}
