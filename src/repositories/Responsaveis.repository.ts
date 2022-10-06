import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Responsaveis } from '../models/Responsaveis.model';

class ResponsaveisRepository implements IPrismaSource<Responsaveis> {
  async create(args: Responsaveis): Promise<Responsaveis> {
    return prisma.responsaveis.create({
      data: {
        nome_responsavel: args.nome_responsavel,
        cpf_responsavel: args.cpf_responsavel,
        telefone: args.telefone,
        email: args.email,
        registro_oab: args.registro_oab,
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
        cpf_responsavel: args.search,
      };
    }

    const total = await prisma.responsaveis.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.responsaveis.findMany({
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

  async update(args: Responsaveis): Promise<void> {
    await prisma.responsaveis.update({
      where: {
        id_responsavel: args.id_responsavel,
      },
      data: {
        nome_responsavel: args.nome_responsavel,
        cpf_responsavel: args.cpf_responsavel,
        telefone: args.telefone,
        email: args.email,
        registro_oab: args.registro_oab,
      },
    });
  }

  async delete(id_responsavel: number): Promise<void> {
    await prisma.responsaveis.delete({
      where: {
        id_responsavel,
      },
    });
  }

  async loadId(id_responsavel: number): Promise<any> {
    return prisma.responsaveis.findUnique({
      where: {
        id_responsavel,
      },
    });
  }

  async loadResponsavel(cpf_responsavel: string): Promise<any> {
    return prisma.responsaveis.findFirst({
      where: {
        cpf_responsavel,
      },
    });
  }
}

export { ResponsaveisRepository };
