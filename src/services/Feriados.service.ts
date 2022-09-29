import moment from 'moment';

import { AppError } from '../errors/AppError.class';
import { Feriados } from '../models/Feriados.model';
import { FeriadosRepository } from '../repositories/Feriados.repository';

class FeriadosService {
  private feriado: FeriadosRepository;
  constructor() {
    this.feriado = new FeriadosRepository();
  }

  async create(args: Feriados): Promise<Feriados> {
    if (!args.data_feriado) {
      throw new AppError('Informe a data do Feriado');
    }

    if (!args.desc_feriado) {
      throw new AppError('Informe uma descrição para o Feriado');
    }

    if (!args.tipo_feriado) {
      throw new AppError('Informe o Tipo de Feriado');
    }

    const dataFeriado = new Date(
      moment(args.data_feriado).format('YYYY-MM-DD'),
    );
    const feriado = await this.feriado.loadData(dataFeriado);
    if (feriado) {
      throw new AppError(
        'Já existe um Feriado registrado para a data informada',
      );
    }

    return this.feriado.create({
      data_feriado: dataFeriado,
      desc_feriado: args.desc_feriado,
      dia_feriado: Number(moment(args.data_feriado).format('DD')),
      mes_feriado: Number(moment(args.data_feriado).format('MM')),
      ano_feriado: Number(moment(args.data_feriado).format('YYYY')),
      tipo_feriado: args.tipo_feriado,
    });
  }

  async delete(id_feriado: number): Promise<void> {
    if (!id_feriado) {
      throw new AppError('Informe o Identificador do Feriado');
    }

    const feriado = await this.feriado.loadId(id_feriado);
    if (!feriado) {
      throw new AppError(
        'Não foram encontrados Feriados registrados com o Identificador informado',
        404,
      );
    }

    await this.feriado.delete(feriado.id_feriado);
  }

  async read(args: any): Promise<any> {
    return this.feriado.read(args);
  }

  async update(args: Feriados): Promise<void> {
    if (!args.id_feriado) {
      throw new AppError('Informe o Identificador do Feriado');
    }

    const feriado = await this.feriado.loadId(args.id_feriado);
    if (!feriado) {
      throw new AppError(
        'Não foram encontrados Feriados registrados com o Identificador informado',
        404,
      );
    }

    if (args.data_feriado) {
      feriado.data_feriado = new Date(
        moment(args.data_feriado).format('YYYY-MM-DD'),
      );
    }

    if (args.desc_feriado) {
      feriado.desc_feriado = args.desc_feriado;
    }

    if (args.dia_feriado) {
      feriado.dia_feriado = new Date(moment(args.dia_feriado).format('DD'));
    }

    if (args.mes_feriado) {
      feriado.mes_feriado = new Date(moment(args.mes_feriado).format('MM'));
    }

    if (args.ano_feriado) {
      feriado.ano_feriado = new Date(moment(args.ano_feriado).format('YYYY'));
    }

    if (args.tipo_feriado) {
      feriado.tipo_feriado = args.tipo_feriado;
    }

    await this.feriado.update(feriado);
  }
}

export { FeriadosService };
