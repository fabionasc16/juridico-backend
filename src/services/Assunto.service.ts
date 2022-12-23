import { AppError } from '../errors/AppError.class';
import { Assunto } from '../models/Assunto.model';
import { AssuntoRepository } from '../repositories/Assunto.repository';

class AssuntoService {
  private assunto: AssuntoRepository;
  constructor() {
    this.assunto = new AssuntoRepository();
  }

  async create(args: Assunto): Promise<Assunto> {
    if (!args.codigo_siged) {
      throw new AppError('Informe o Código do SIGED para Assuntos');
    }

    if (!args.desc_assunto) {
      throw new AppError('Informe o Assunto');
    }

    const assunto = await this.assunto.loadCodigo(args.codigo_siged);
    if (assunto) {
      throw new AppError(
        'Código do SIGED informado já existe na base de dados',
      );
    }

    return this.assunto.create({
      codigo_siged: args.codigo_siged,
      desc_assunto: args.desc_assunto,
    });
  }

  async delete(id_assunto: number): Promise<void> {
    if (!id_assunto) {
      throw new AppError('Informe o Identificador do Assunto');
    }

    const assunto = await this.assunto.loadId(id_assunto);
    if (!assunto) {
      throw new AppError('Identificador de Assunto não encontrado', 404);
    }

    await this.assunto.delete(assunto.id_assunto);
  }

  async read(args: any): Promise<any> {
    return this.assunto.read(args);
  }

  async readById(id_assunto: number): Promise<any> {
    return this.assunto.loadId(id_assunto);
  }

  async update(args: Assunto): Promise<void> {
    if (!args.id_assunto) {
      throw new AppError('Informe o Identificador do Assunto');
    }

    const assunto = await this.assunto.loadId(args.id_assunto);
    if (!assunto) {
      throw new AppError('Identificador de Assunto não encontrado', 404);
    }

    if (args.codigo_siged) {
      if (args.codigo_siged !== assunto.codigo_siged) {
        const dataExists = await this.assunto.loadCodigo(args.codigo_siged);
        if (dataExists) {
          throw new AppError(
            'O Código do SIGED informado já existe na base de dados',
          );
        }
      }
      assunto.codigo_siged = args.codigo_siged;
    }

    if (args.desc_assunto) {
      assunto.desc_assunto = args.desc_assunto;
    }

    await this.assunto.update(assunto);
  }
}

export { AssuntoService };
