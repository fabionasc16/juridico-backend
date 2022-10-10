import { AppError } from '../errors/AppError.class';
import { OrgaoDemandante } from '../models/OrgaoDemandante.model';
import { OrgaoDemandanteRepository } from '../repositories/OrgaoDemandante.repository';

class OrgaoDemandanteService {
  private orgaoDemandante: OrgaoDemandanteRepository;
  constructor() {
    this.orgaoDemandante = new OrgaoDemandanteRepository();
  }

  async create(args: OrgaoDemandante): Promise<OrgaoDemandante> {
    if (!args.orgao_demandante) {
      throw new AppError('Informe o Órgão Demandante');
    }

    if (!args.sigla_orgao) {
      throw new AppError('Informe a Sigla do Órgão Demandante');
    }

    if (!args.esfera_orgao) {
      throw new AppError('Informe a Esfera do Órgão Demandante');
    }

    if (!args.orgao_controle) {
      throw new AppError(
        'Informe se o Órgão Demandante é um Órgão de Controle',
      );
    }

    if (!args.orgao_justica) {
      throw new AppError('Informe se o Órgão Demandante é um Órgão de Justiça');
    }

    const orgaoDemandante = await this.orgaoDemandante.loadOrgaoDemandante(
      args.orgao_demandante,
    );
    if (orgaoDemandante) {
      throw new AppError(
        'Já existe um registro na base para o Órgão Demandante informado',
      );
    }

    return this.orgaoDemandante.create({
      orgao_demandante: args.orgao_demandante,
      sigla_orgao: args.sigla_orgao,
      esfera_orgao: args.esfera_orgao,
      orgao_controle: args.orgao_controle,
      orgao_justica: args.orgao_justica,
    });
  }

  async delete(id_orgao: number): Promise<void> {
    if (!id_orgao) {
      throw new AppError('Informe o identificador do Órgão Demandante');
    }

    const orgaoDemandante = await this.orgaoDemandante.loadId(id_orgao);
    if (!orgaoDemandante) {
      throw new AppError(
        'Não foram encontrados registros de Órgãos Demandantes com o Identificador informado',
        404,
      );
    }

    await this.orgaoDemandante.delete(orgaoDemandante.id_orgao);
  }

  async read(args: any): Promise<any> {
    return this.orgaoDemandante.read(args);
  }

  async readById(id_orgao: number): Promise<any> {
    return this.orgaoDemandante.loadId(id_orgao);
  }

  async update(args: OrgaoDemandante): Promise<void> {
    if (!args.id_orgao) {
      throw new AppError('Informe o identificador do Órgão Demandante');
    }

    const orgaoDemandante = await this.orgaoDemandante.loadId(args.id_orgao);
    if (!orgaoDemandante) {
      throw new AppError(
        'Não foram encontrados registros de Órgãos Demandantes com o Identificador informado',
        404,
      );
    }

    if (args.orgao_demandante) {
      orgaoDemandante.orgao_demandante = args.orgao_demandante;
    }

    if (args.sigla_orgao) {
      orgaoDemandante.sigla_orgao = args.sigla_orgao;
    }

    if (args.esfera_orgao) {
      orgaoDemandante.esfera_orgao = args.esfera_orgao;
    }

    if (args.orgao_controle) {
      orgaoDemandante.orgao_controle = args.orgao_controle;
    }

    if (args.orgao_justica) {
      orgaoDemandante.orgao_justica = args.orgao_justica;
    }

    await this.orgaoDemandante.update(orgaoDemandante);
  }
}

export { OrgaoDemandanteService };
