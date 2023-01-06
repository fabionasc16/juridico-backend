import { AppError } from '../errors/AppError.class';
import { TiposProcesso } from '../models/TiposProcesso.model';
import { TiposProcessoRepository } from '../repositories/TiposProcesso.repository';

class TiposProcessoService {
  private tiposProcesso: TiposProcessoRepository;
  constructor() {
    this.tiposProcesso = new TiposProcessoRepository();
  }

  async create(args: TiposProcesso): Promise<TiposProcesso> {
    if (!args.desc_tipoprocesso) {
      throw new AppError('Informe o Tipo de Processo');
    }

    const dataExists = await this.tiposProcesso.listDescription(
      args.desc_tipoprocesso,
    );
    if (dataExists) {
      throw new AppError(
        'Já existem registros na base de dados com os parâmetros informados',
      );
    }

    return this.tiposProcesso.create({
      desc_tipoprocesso: args.desc_tipoprocesso,
    });
  }

  async delete(args: any): Promise<void> {
    if (!args.id_tipoprocesso) {
      throw new AppError('Informe o Tipo de Processo a ser deletado');
    }

    const dataExists = await this.tiposProcesso.loadId(args.id_tipoprocesso);
    if (!dataExists) {
      throw new AppError(
        'Não foram encontrados registros na base para os parâmetros informados',
        404,
      );
    }

    await this.tiposProcesso.delete(args.id_tipoprocesso);
  }

  async read(args: any): Promise<any> {
    return this.tiposProcesso.read(args);
  }

  async readById(id_tipoprocesso: number): Promise<any> {
    return this.tiposProcesso.loadId(id_tipoprocesso);
  }

  async update(args: any): Promise<void> {
    if (!args.id_tipoprocesso) {
      throw new AppError('Informe o Tipo de Processo a ser atualizado');
    }

    const data = await this.tiposProcesso.loadId(args.id_tipoprocesso);
    if (!data) {
      throw new AppError(
        'Não foram encontrados registros na base para os parâmetros informados',
        404,
      );
    }

    if (args.desc_tipoprocesso) {
      if (data.desc_tipoprocesso !== args.desc_tipoprocesso) {
        const dataExists = await this.tiposProcesso.listDescription(
          args.desc_tipoprocesso,
        );
        if (dataExists) {
          throw new AppError(
            'Já existem registros na base de dados com os parâmetros informados',
          );
        }
      }
      data.desc_tipoprocesso = args.desc_tipoprocesso;
    }

    await this.tiposProcesso.update(data);
  }
}

export { TiposProcessoService };
