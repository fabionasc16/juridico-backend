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
    const page =
      args.query.currentPage != null ? `${args.query.currentPage - 1}` : '0';
    const pageSize = args.query.perPage != null ? args.query.perPage : '10';

    const AND = [];
    if (args.body.cpfResponsavel) {
      AND.push({ cpf_responsavel: args.body.cpfResponsavel });
    }

    if (args.body.nomeResponsavel) {
      AND.push({ nome_responsavel: args.body.nomeResponsavel });
    }

    const total = await prisma.responsaveis.count({
      where: { AND },
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.responsaveis.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: { AND },
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
