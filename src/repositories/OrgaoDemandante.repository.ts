import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { OrgaoDemandante } from '../models/OrgaoDemandante.model';

class OrgaoDemandanteRepository implements IPrismaSource<OrgaoDemandante> {
  async listall(): Promise<any> {
    return prisma.orgaoDemandante.findMany({
      select: {
        id_orgao: true,
        orgao_demandante: true,
      },
    });
  }

  async create(args: OrgaoDemandante): Promise<OrgaoDemandante> {
    return prisma.orgaoDemandante.create({
      data: {
        orgao_demandante: args.orgao_demandante,
        sigla_orgao: args.sigla_orgao,
        esfera_orgao: args.esfera_orgao,
        orgao_controle: args.orgao_controle,
        orgao_justica: args.orgao_justica,
      },
    });
  }

  async read(args: any): Promise<any> {
    const page =
      args.query.currentPage != null ? `${args.query.currentPage - 1}` : '0';
    const pageSize = args.query.perPage != null ? args.query.perPage : '10';
    const search = args.query.search != null ? args.query.search : '';
    let filters = {};
    if (search) {
      filters = {
        id_orgao: args.query.search,
      };
    }

    const AND = [];

    if (args.body.orgaoDemandante) {
      AND.push({ orgao_demandante: { contains: args.body.orgaoDemandante } });
    }

    if (args.body.siglaOrgao) {
      AND.push({ sigla_orgao: args.body.siglaOrgao });
    }

    if (args.body.esferaOrgao) {
      AND.push({ esfera_orgao: args.body.esferaOrgao });
    }

    if (args.body.orgaoControle) {
      AND.push({ orgao_controle: args.body.orgaoControle });
    }

    if (args.body.orgaoJustica) {
      AND.push({ orgao_justica: args.body.orgaoJustica });
    }

    if (AND.length) {
      Object.assign(filters, { AND });
    }

    const total = await prisma.orgaoDemandante.count({
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
        sigla_orgao: args.sigla_orgao,
        esfera_orgao: args.esfera_orgao,
        orgao_controle: args.orgao_controle,
        orgao_justica: args.orgao_justica,
      },
    });
  }

  async delete(id_orgao: number): Promise<void> {
    await prisma.orgaoDemandante.delete({
      where: {
        id_orgao,
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
        orgao_demandante: {
          contains: orgao_demandante,
        },
      },
    });
  }
}

export { OrgaoDemandanteRepository };
