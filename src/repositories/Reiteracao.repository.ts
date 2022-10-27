import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Reiteracao } from '../models/Reiteracao.model';

class ReiteracaoRepository implements IPrismaSource<Reiteracao> {
  async create(args: Reiteracao): Promise<Reiteracao> {
    return prisma.reiteracao.create({
      data: {
        num_procedimento: args.num_procedimento,
        numero_siged: args.numero_siged,
        data_processo: args.data_processo,
        prazo: args.prazo,
        fk_status: args.fk_status,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        reiteracao: args.reiteracao,
        fk_processo: args.fk_processo,
      },
    });
  }

  async delete(id_reiteracao: number): Promise<void> {
    await prisma.reiteracao.delete({
      where: {
        id_reiteracao,
      },
    });
  }

  async loadId(id_reiteracao: number): Promise<any> {
    return prisma.reiteracao.findUnique({
      where: {
        id_reiteracao,
      },
    });
  }

  async loadNumProcedimento(num_procedimento: string): Promise<any> {
    return prisma.reiteracao.findFirst({
      where: {
        num_procedimento,
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
        num_procedimento: args.search,
      };
    }

    const total = await prisma.reiteracao.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.reiteracao.findMany({
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

  async update(args: Reiteracao): Promise<void> {
    await prisma.reiteracao.update({
      where: {
        id_reiteracao: args.id_reiteracao,
      },
      data: {
        num_procedimento: args.num_procedimento,
        numero_siged: args.numero_siged,
        data_processo: args.data_processo,
        prazo: args.prazo,
        fk_status: args.fk_status,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        reiteracao: args.reiteracao,
        fk_processo: args.fk_processo,
      },
    });
  }

  async readByProcessos(fk_processo: number, args: any): Promise<any> {
    const page = args.currentPage != null ? `${args.currentPage - 1}` : '0';
    const pageSize = args.perPage != null ? args.perPage : '10';

    const total = await prisma.reiteracao.count({
      where: { fk_processo },
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.reiteracao.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: { fk_processo },
    });

    return {
      currentPage: page,
      perPage: pageSize,
      total,
      data,
    };
  }
}

export { ReiteracaoRepository };
