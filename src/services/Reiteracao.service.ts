import { Console } from 'console';
import moment from 'moment';

import { AppError } from '../errors/AppError.class';
import { Reiteracao } from '../models/Reiteracao.model';
import { ProcessosRepository } from '../repositories/Processos.repository';
import { ReiteracaoRepository } from '../repositories/Reiteracao.repository';
import { StatusRepository } from '../repositories/Status.repository';

class ReiteracaoService {
  private reiteracao: ReiteracaoRepository;
  private processos: ProcessosRepository;
  private status: StatusRepository;

  constructor() {
    this.reiteracao = new ReiteracaoRepository();
    this.processos = new ProcessosRepository();
    this.status = new StatusRepository();
  }

  async create(args: Reiteracao): Promise<Reiteracao> {
    if (!args.fk_status) {
      throw new AppError('Informe o Status da Reiteração');
    } else {
      const status = await this.status.loadId(args.fk_status);
      if (!status) {
        throw new AppError(
          'O Status informado não foi localizado na base de dados',
          404,
        );
      }
    }

    if (!args.fk_processo) {
      throw new AppError('Informe o Processo para anexar na Reiteração');
    } else {
      const processo = await this.processos.loadId(args.fk_processo);
      if (!processo) {
        throw new AppError(
          'O Processo informado não foi localizado na base de dados',
          404,
        );
      }
    }
    let dataProcesso: any = '';
    if (args.data_processo) {
      dataProcesso = new Date(
        moment(args.data_processo).utc().format('YYYY-MM-DD'),
      );
    } else {
      dataProcesso = null;
    }

    let dataRecebimento: any = '';
    if (args.data_recebimento) {
      dataRecebimento = new Date(
        moment(args.data_recebimento).utc().format('YYYY-MM-DD'),
      );
    } else {
      dataRecebimento = null;
    }

    return this.reiteracao.create({
      num_procedimento: args.num_procedimento,
      numero_siged: args.numero_siged,
      data_processo: dataProcesso,
      prazo: args.prazo,
      fk_status: args.fk_status,
      data_recebimento: dataRecebimento,
      hora_recebimento: args.hora_recebimento,
      reiteracao: args.reiteracao,
      fk_processo: args.fk_processo,
    });
  }

  async delete(id_reiteracao: number): Promise<void> {
    if (!id_reiteracao) {
      throw new AppError('Informe o Identificador da Reiteração');
    }

    const reiteracao = await this.reiteracao.loadId(id_reiteracao);
    if (!reiteracao) {
      throw new AppError(
        'Identificador da Reiteração não foi localizado na base de dados',
        404,
      );
    }

    await this.reiteracao.delete(reiteracao.id_reiteracao);
  }

  async read(args: any): Promise<any> {
    return this.reiteracao.read(args);
  }

  async readById(id_reiteracao: number): Promise<any> {
    return this.reiteracao.loadId(id_reiteracao);
  }

  async update(args: any): Promise<void> {
    if (!args.id_reiteracao) {
      throw new AppError('Informe o Identificador da Reiteração');
    }

    const reiteracao = await this.reiteracao.loadId(args.id_reiteracao);
    if (!reiteracao) {
      throw new AppError(
        'Identificador da Reiteração não foi localizado na base de dados',
        404,
      );
    }

    if (args.num_procedimento) {
      reiteracao.num_procedimento = args.num_procedimento;
    }

    await this.reiteracao.update(reiteracao);
  }
}

export { ReiteracaoService };
