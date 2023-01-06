import { AppError } from '../errors/AppError.class';
import { TiposEvento } from '../models/TipoEvento.model';
import { TiposEventoRepository } from '../repositories/TiposEvento.repository';

class TiposEventoService {
  private tiposEventos: TiposEventoRepository;
  constructor() {
    this.tiposEventos = new TiposEventoRepository();
  }

  async create(args: TiposEvento): Promise<TiposEvento> {
    if (!args.desc_tipoevento) {
      throw new AppError('Informe a Descrição do Tipo de Evento');
    }

    const dataExists = await this.tiposEventos.readByDesc(args.desc_tipoevento);
    if (dataExists) {
      throw new AppError('Tipo de Evento informado já cadastrado no sistema');
    }

    return this.tiposEventos.create({
      desc_tipoevento: args.desc_tipoevento,
    });
  }

  async delete(id_tipoevento: number): Promise<void> {
    if (!id_tipoevento) {
      throw new AppError('Informe o Identificador do Tipo de Evento');
    }

    const dataExists = await this.tiposEventos.loadId(id_tipoevento);
    if (!dataExists) {
      throw new AppError(
        'Nenhum Tipo de Evento foi localizado com o identificador informado',
        404,
      );
    }

    await this.tiposEventos.delete(dataExists.id_tipoevento);
  }

  async read(): Promise<any> {
    return this.tiposEventos.read();
  }

  async readById(id_tipoevento: number): Promise<any> {
    if (!id_tipoevento) {
      throw new AppError('Informe o Identificador do Tipo de Evento');
    }

    const data = await this.tiposEventos.loadId(id_tipoevento);
    if (!data) {
      throw new AppError(
        'Nenhum Tipo de Evento foi localizado com o identificador informado',
        404,
      );
    }

    return data;
  }

  async update(args: TiposEvento): Promise<void> {
    if (!args.id_tipoevento) {
      throw new AppError('Informe o Identificador do Tipo de Evento');
    }

    const tipoEvento = await this.tiposEventos.loadId(args.id_tipoevento);
    if (!tipoEvento) {
      throw new AppError(
        'Nenhum Tipo de Evento foi localizado com o identificador informado',
        404,
      );
    }

    if (args.desc_tipoevento) {
      tipoEvento.desc_tipoevento = args.desc_tipoevento;
    }

    await this.tiposEventos.update(tipoEvento);
  }
}

export { TiposEventoService };
