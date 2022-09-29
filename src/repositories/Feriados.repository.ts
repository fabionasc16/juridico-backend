import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Feriados } from '../models/Feriados.model';

class FeriadosRepository implements IPrismaSource<Feriados> {
  async create(args: Feriados): Promise<Feriados> {
    return prisma.feriados.create({
      data: {
        data_feriado: args.data_feriado,
        desc_feriado: args.desc_feriado,
        dia_feriado: args.dia_feriado,
        mes_feriado: args.mes_feriado,
        ano_feriado: args.ano_feriado,
        tipo_feriado: args.tipo_feriado,
      },
    });
  }

  async delete(id_feriado: number): Promise<void> {
    await prisma.feriados.delete({
      where: {
        id_feriado,
      },
    });
  }

  async loadId(id_feriado: number): Promise<any> {
    return prisma.feriados.findUnique({
      where: {
        id_feriado,
      },
    });
  }

  async loadData(data_feriado: Date): Promise<any> {
    return prisma.feriados.findFirst({
      where: {
        data_feriado,
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
        data_feriado: args.search,
      };
    }

    const total = await prisma.feriados.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.feriados.findMany({
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

  async update(args: Feriados): Promise<void> {
    await prisma.feriados.update({
      where: {
        id_feriado: args.id_feriado,
      },
      data: {
        data_feriado: args.data_feriado,
        desc_feriado: args.desc_feriado,
        dia_feriado: args.dia_feriado,
        mes_feriado: args.mes_feriado,
        ano_feriado: args.ano_feriado,
        tipo_feriado: args.tipo_feriado,
      },
    });
  }
}

export { FeriadosRepository };
