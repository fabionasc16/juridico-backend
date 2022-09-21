export class TiposProcesso {
  public id_tipoprocesso?: number;
  public desc_tipoprocesso: string;

  constructor(id_tipoprocesso: number, desc_tipoprocesso: string) {
    this.id_tipoprocesso = id_tipoprocesso;
    this.desc_tipoprocesso = desc_tipoprocesso;
  }
}
