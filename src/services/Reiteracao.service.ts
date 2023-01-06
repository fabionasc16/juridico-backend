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

    const numProcedimento = await this.reiteracao.loadNumProcedimento(
      args.num_procedimento,
    );
    if (numProcedimento) {
      throw new AppError(
        'O Número de Procedimento informado já existe no sistema',
      );
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

    if (args.numero_siged) {
      reiteracao.numero_siged = args.numero_siged;
    }

    if (args.data_processo) {
      reiteracao.data_processo = new Date(
        moment(args.data_processo).utc().format('YYYY-MM-DD'),
      );
    }

    if (args.prazo) {
      reiteracao.prazo = args.prazo;
    }

    if (args.fk_status) {
      const statuses = await this.status.loadId(args.fk_status);
      if (!statuses) {
        throw new AppError(
          'Não foram encontrados status cadastrados para o Identificador informado',
          404,
        );
      }
      reiteracao.fk_status = args.fk_status;
    }

    if (args.data_recebimento) {
      reiteracao.data_recebimento = new Date(
        moment(args.data_recebimento).utc().format('YYYY-MM-DD'),
      );
    }

    if (args.hora_recebimento) {
      reiteracao.hora_recebimento = args.hora_recebimento;
    }

    if (args.reiteracao) {
      reiteracao.reiteracao = args.reiteracao;
    }

    if (args.fk_processo) {
      const processos = await this.processos.loadId(args.fk_processo);
      if (!processos) {
        throw new AppError(
          'Não foram encontrados Processos cadastrados para o Identificador informado',
          404,
        );
      }
      reiteracao.fk_processo = args.fk_processo;
    }

    await this.reiteracao.update(reiteracao);
  }

  async loadById(id_reiteracao: number): Promise<any> {
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

    return reiteracao;
  }

  async loadByProcesso(fk_processo: number, args: any): Promise<any> {
    return this.reiteracao.readByProcessos(fk_processo, args);
  }
}

export { ReiteracaoService };
