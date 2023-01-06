import { AppError } from '../errors/AppError.class';
import { Responsaveis } from '../models/Responsaveis.model';
import { ResponsaveisRepository } from '../repositories/Responsaveis.repository';

class ResponsaveisService {
  private responsaveis: ResponsaveisRepository;
  constructor() {
    this.responsaveis = new ResponsaveisRepository();
  }

  async create(args: Responsaveis): Promise<Responsaveis> {
    if (!args.nome_responsavel) {
      throw new AppError('Informe o Nome do Responsável');
    }

    if (!args.cpf_responsavel) {
      throw new AppError('Informe o CPF do Responsável');
    }

    if (!args.telefone) {
      throw new AppError('Informe o Número para Contato do Responsável');
    }

    if (!args.email) {
      throw new AppError('Informe o E-mail para Contato do Responsável');
    }

    if (!args.registro_oab) {
      throw new AppError('Informe o Registro da OAB do Responsável');
    }

    const responsavel = await this.responsaveis.loadResponsavel(
      args.cpf_responsavel.replaceAll('.', '').replaceAll('-', ''),
    );
    if (responsavel) {
      throw new AppError('Responsável já cadastrado no sistema');
    }

    return this.responsaveis.create({
      nome_responsavel: args.nome_responsavel,
      cpf_responsavel: args.cpf_responsavel
        .replaceAll('.', '')
        .replaceAll('-', ''),
      telefone: args.telefone,
      email: args.email,
      registro_oab: args.registro_oab,
    });
  }

  async delete(id_responsavel: number): Promise<void> {
    if (!id_responsavel) {
      throw new AppError('Informe o Identificador do Responsável');
    }

    const responsavel = await this.responsaveis.loadId(id_responsavel);
    if (!responsavel) {
      throw new AppError(
        'O Responsável informado não foi localizado na base de dados',
        404,
      );
    }

    await this.responsaveis.delete(responsavel.id_responsavel);
  }

  async read(args: any): Promise<any> {
    return this.responsaveis.read(args);
  }

  async readById(id_responsavel: number): Promise<any> {
    return this.responsaveis.loadId(id_responsavel);
  }

  async update(args: any): Promise<void> {
    if (!args.id_responsavel) {
      throw new AppError('Informe o Identificador do Responsável');
    }

    const responsavel = await this.responsaveis.loadId(args.id_responsavel);
    if (!responsavel) {
      throw new AppError(
        'O Responsável informado não foi localizado na base de dados',
        404,
      );
    }

    if (args.nome_responsavel) {
      responsavel.nome_responsavel = args.nome_responsavel;
    }

    if (args.cpf_responsavel) {
      responsavel.cpf_responsavel = args.cpf_responsavel;
    }

    if (args.telefone) {
      responsavel.telefone = args.telefone;
    }

    if (args.email) {
      responsavel.email = args.email;
    }

    if (args.registro_oab) {
      responsavel.registro_oab = args.registro_oab;
    }

    const dataExists = await this.responsaveis.loadNotExists(
      args.id_responsavel,
      args.cpf_responsavel,
    );
    if (dataExists) {
      throw new AppError(
        'Já existe um registro na base de dados para os valores informados',
      );
    }

    await this.responsaveis.update(responsavel);
  }
}

export { ResponsaveisService };
