import { AppError } from '../errors/AppError.class';
import { Status } from '../models/Status.model';
import { StatusRepository } from '../repositories/Status.repository';

class StatusSerivce {
  private status: StatusRepository;
  constructor() {
    this.status = new StatusRepository();
  }

  async create(args: Status): Promise<Status> {
    if (!args.desc_status) {
      throw new AppError('Informe a Descrição do Status');
    }

    const status = await this.status.loadDesc(args.desc_status);
    if (status) {
      throw new AppError('O Status informado já está cadastrado no sistema');
    }

    return this.status.create({
      desc_status: args.desc_status,
      aplica_a: args.aplica_a,
    });
  }

  async delete(id_status: number): Promise<void> {
    if (!id_status) {
      throw new AppError('Informe o Identificador do Status');
    }

    const status = await this.status.loadId(id_status);
    if (!status) {
      throw new AppError(
        'Nenhum Status foi localizado com o Identificador informado',
        404,
      );
    }

    await this.status.delete(status.id_status);
  }

  async read(): Promise<any> {
    const status = await this.status.read();
    if (status.length === 0) {
      throw new AppError('Nenhum status foi encontrado no sistema', 404);
    }

    return status;
  }

  async readByAplicacao(aplica_a: string): Promise<any> {
    if (!aplica_a) {
      throw new AppError('Informe a qual categoria os statuses pertencem');
    }
    const status = await this.status.loadAplica(aplica_a);
    if (status.length === 0) {
      throw new AppError(
        'Nenhum status foi encontrado no sistema com a descrição da aplicação informada',
        404,
      );
    }

    return status;
  }

  async readById(id_status: number): Promise<any> {
    if (!id_status) {
      throw new AppError('Informe o Identificador do Status');
    }

    const status = await this.status.loadId(id_status);
    if (!status) {
      throw new AppError(
        'Nenhum Status foi localizado com o Identificador informado',
        404,
      );
    }

    return status;
  }

  async update(args: Status): Promise<void> {
    if (!args.id_status) {
      throw new AppError('Informe o Identificador do Status');
    }

    const status = await this.status.loadId(args.id_status);
    if (!status) {
      throw new AppError(
        'Nenhum Status foi localizado com o Identificador informado',
        404,
      );
    }

    if (args.desc_status) {
      status.desc_status = args.desc_status;
    }

    if (args.aplica_a) {
      status.aplica_a = args.aplica_a;
    }

    await this.status.update(status);
  }
}

export { StatusSerivce };
