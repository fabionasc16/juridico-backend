import { AppError } from '../errors/AppError.class';
import { ProcessosRepository } from '../repositories/Processos.repository';

class ProcessosService {
  private processos: ProcessosRepository;
  constructor() {
    this.processos = new ProcessosRepository();
  }

  async create(args: any): Promise<any> {
    if (!args.num_processo) {
      throw new AppError('Informe o Número do Processo');
    }

    if (!args.fk_tipoprocesso) {
      throw new AppError('Informe o Tipo de Processo');
    }

    if (!args.prazo_total) {
      throw new AppError('Informe o Prazo Total do Projeto');
    }

    if (!args.fk_orgaodemandante) {
      throw new AppError('Informe o Órgão Demandante do Processo');
    }

    if (!args.data_processo) {
      throw new AppError('Informe a Data de Abertura do Processo');
    }

    if (!args.data_recebimento) {
      throw new AppError('Informe a Data de Recebimento do Processo');
    }

    if (!args.hora_recebimento) {
      throw new AppError('Informe a Hora de Abertura do Processo');
    }

    if (!args.fk_assunto) {
      throw new AppError('Informe o Assunto do Projeto');
    }

    if (!args.fk_classificacao) {
      throw new AppError('Informe a Classificação do Processo');
    }

    if (!args.objeto) {
      throw new AppError('Informe o Objeto do Processo');
    }

    if (!args.requer_siged) {
      throw new AppError(
        'Informe se o Processo requer vínculo a um Processo do SIGED',
      );
    }

    if (!args.fk_responsavel) {
      throw new AppError('Informe um Responsável pelo Processo');
    }

    if (!args.observacao) {
      throw new AppError('Informe uma Observação para o Processo');
    }

    if (!args.descricao) {
      throw new AppError('Informe uma Descrição para o Processo');
    }

    if (!args.dia_limite_prazo) {
      throw new AppError('Informe um Prazo Limite para o Processo');
    }

    if (!args.dias_percorridos) {
      throw new AppError('Informe os Dias Percorridos do Processo');
    }

    if (!args.dias_expirados) {
      throw new AppError('Informe os Dias Expirados do Processo');
    }

    if (!args.status_prazo) {
      throw new AppError('Informe o Status do Prazo do Processo');
    }

    if (!args.fk_status) {
      throw new AppError('Informe o Status do Processo');
    }

    const dataExists = await this.processos.loadNumProcedimento(
      args.num_procedimento,
    );
    if (dataExists) {
      throw new AppError('O Processo informado já existe no Sistema');
    }

    return this.processos.create({
      num_procedimento: args.num_procedimento,
      fk_tipoprocesso: args.fk_tipoprocesso,
      prazo_total: args.prazo_total,
      fk_orgaodemandante: args.fk_orgaodemandante,
      data_processo: args.data_processo,
      data_recebimento: args.data_recebimento,
      hora_recebimento: args.hora_recebimento,
      fk_assunto: args.fk_assunto,
      fk_classificacao: args.fk_classificacao,
      objeto: args.objeto,
      requer_siged: args.requer_siged,
      numero_siged: args.numero_siged,
      data_processo_siged: args.data_processo_siged,
      permanencia_siged: args.permanencia_siged,
      caixa_atual_siged: args.caixa_atual_siged,
      tramitacao_siged: args.tramitacao_siged,
      fk_responsavel: args.fk_responsavel,
      observacao: args.observacao,
      descricao: args.descricao,
      dia_limite_prazo: args.dia_limite_prazo,
      dias_percorridos: args.dias_percorridos,
      dias_expirados: args.dias_expirados,
      status_prazo: args.status_prazo,
      sigiloso: args.sigiloso,
      fk_status: args.fk_status,
    });
  }
}

export { ProcessosService };
