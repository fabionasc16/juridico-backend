export class Processos {
  public id_processo?: number;
  public num_procedimento: string;
  public fk_tipoprocesso: number;
  public prazo_total: number;
  public fk_orgaodemandante: number;
  public data_processo: Date;
  public data_recebimento: Date;
  public hora_recebimento: Date;
  public fk_assunto: number;
  public fk_classificacao: number;
  public objeto: string;
  public requer_siged: string;
  public numero_siged?: string | null;
  public data_processo_siged?: Date | null;
  public permanencia_siged?: string | null;
  public caixa_atual_siged?: string | null;
  public tramitacao_siged?: string | null;
  public fk_responsavel: number;
  public observacao: string;
  public descricao: string;
  public dia_limite_prazo: Date;
  public dias_percorridos: number;
  public dias_expirados: number;
  public status_prazo: string;
  public sigiloso?: string | null;
  public fk_status: number;

  constructor(
    id_processo: number,
    num_procedimento: string,
    fk_tipoprocesso: number,
    prazo_total: number,
    fk_orgaodemandante: number,
    data_processo: Date,
    data_recebimento: Date,
    hora_recebimento: Date,
    fk_assunto: number,
    fk_classificacao: number,
    objeto: string,
    requer_siged: string,
    fk_responsavel: number,
    observacao: string,
    descricao: string,
    dia_limite_prazo: Date,
    dias_percorridos: number,
    dias_expirados: number,
    status_prazo: string,
    fk_status: number,
    sigiloso?: string,
    numero_siged?: string,
    data_processo_siged?: Date,
    permanencia_siged?: string,
    caixa_atual_siged?: string,
    tramitacao_siged?: string,
  ) {
    this.id_processo = id_processo;
    this.num_procedimento = num_procedimento;
    this.fk_tipoprocesso = fk_tipoprocesso;
    this.prazo_total = prazo_total;
    this.fk_orgaodemandante = fk_orgaodemandante;
    this.data_processo = data_processo;
    this.data_recebimento = data_recebimento;
    this.hora_recebimento = hora_recebimento;
    this.fk_assunto = fk_assunto;
    this.fk_classificacao = fk_classificacao;
    this.objeto = objeto;
    this.requer_siged = requer_siged;
    this.numero_siged = numero_siged;
    this.data_processo_siged = data_processo_siged;
    this.permanencia_siged = permanencia_siged;
    this.caixa_atual_siged = caixa_atual_siged;
    this.tramitacao_siged = tramitacao_siged;
    this.fk_responsavel = fk_responsavel;
    this.observacao = observacao;
    this.descricao = descricao;
    this.dia_limite_prazo = dia_limite_prazo;
    this.dias_percorridos = dias_percorridos;
    this.dias_expirados = dias_expirados;
    this.status_prazo = status_prazo;
    this.sigiloso = sigiloso;
    this.fk_status = fk_status;
  }
}
