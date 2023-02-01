import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Classificacao } from '../models/Classificacao.model';

class ClassificacaoRepository implements IPrismaSource<Classificacao> {
  async listall(): Promise<any> {
    return prisma.classificacao.findMany({});
  }

  async create(args: Classificacao): Promise<Classificacao> {
    return prisma.classificacao.create({
      data: {
        desc_classificacao: args.desc_classificacao,
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
        desc_classificacao: {
          contains: args.search,
        },
      };
    }

    const total = await prisma.classificacao.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.classificacao.findMany({
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

  async update(args: Classificacao): Promise<void> {
    await prisma.classificacao.update({
      where: {
        id_classificacao: args.id_classificacao,
      },
      data: {
        desc_classificacao: args.desc_classificacao,
      },
    });
  }

  async delete(id_classificacao: number): Promise<void> {
    await prisma.classificacao.delete({
      where: {
        id_classificacao,
      },
    });
  }

  async loadId(id_classificacao: number): Promise<any> {
    return prisma.classificacao.findUnique({
      where: {
        id_classificacao,
      },
    });
  }

  async loadClassificacao(desc_classificacao: string): Promise<any> {
    return prisma.classificacao.findFirst({
      where: {
        desc_classificacao: {
          contains: desc_classificacao,
        },
      },
    });
  }
}

export { ClassificacaoRepository };
