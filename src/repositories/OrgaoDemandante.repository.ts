import { IPrismaSource } from 'generics/IPrismaSource';
import { OrgaoDemandante } from 'models/OrgaoDemandante.model';

import { prisma } from '../config/Prisma.config';

class OrgaoDemandanteRepository implements IPrismaSource<OrgaoDemandante> {
  async create(args: OrgaoDemandante): Promise<OrgaoDemandante> {
    return prisma.orgaoDemandante.create({
      data: {
        orgao_demandante: args.orgao_demandante,
        sigla_orgao: args.orgao_demandante,
        esfera_orgao: args.esfera_orgao,
        orgao_controle: args.orgao_controle,
        orgao_justica: args.orgao_justica,
      },
    });
  }

  async read(args: any): Promise<any> {
    const page = args.currentPage != null ? `${args.currentPage - 1}` : '0';
    const pageSize = args.perPage != null ? args.perPage : '10';
    const search = args.search != null ? args.search : '';
    let filters = {};
    if (search) {
      filters = {
        orgao_demandante: args.search,
      };
    }

    const total = await prisma.processos.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.orgaoDemandante.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: filters,
    });

    return {
      currentPage: page,
      perPage: pageSize,
      total,
      data,
    };
  }

  async update(args: OrgaoDemandante): Promise<void> {
    await prisma.orgaoDemandante.update({
      where: {
        id_orgao: args.id_orgao,
      },
      data: {
        orgao_demandante: args.orgao_demandante,
        sigla_orgao: args.orgao_demandante,
        esfera_orgao: args.esfera_orgao,
        orgao_controle: args.orgao_controle,
        orgao_justica: args.orgao_justica,
      },
    });
  }

  async delete(args: any): Promise<void> {
    await prisma.orgaoDemandante.delete({
      where: {
        id_orgao: args.id_orgao,
      },
    });
  }

  async loadId(id_orgao: number): Promise<any> {
    return prisma.orgaoDemandante.findUnique({
      where: {
        id_orgao,
      },
    });
  }

  async loadOrgaoDemandante(orgao_demandante: string): Promise<any> {
    return prisma.orgaoDemandante.findFirst({
      where: {
        orgao_demandante,
      },
    });
  }
}

export { OrgaoDemandanteRepository };
