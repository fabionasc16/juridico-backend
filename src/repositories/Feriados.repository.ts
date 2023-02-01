import moment from 'moment';

import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Feriados } from '../models/Feriados.model';

class FeriadosRepository implements IPrismaSource<Feriados> {
  listall(): Promise<any> {
    throw new Error('Method not implemented.');
  }
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

  async loadData(data_feriado: string): Promise<any> {
    return prisma.feriados.findFirst({
      where: {
        data_feriado: new Date(data_feriado),
      },
    });
  }

  async loadNotData(data_feriado: string, id_feriado: number): Promise<any> {
    return prisma.feriados.findFirst({
      where: {
        NOT: [{ id_feriado }],
        AND: [{ data_feriado: new Date(data_feriado) }],
      },
    });
  }

  async read(args: any): Promise<any> {
    const page =
      args.query.currentPage != null ? `${args.query.currentPage - 1}` : '0';
    const pageSize = args.query.perPage != null ? args.query.perPage : '10';

    const AND = [];
    if (args.body.dataFeriado) {
      AND.push({
        data_feriado: new Date(
          moment(args.body.dataFeriado).utc().format('YYYY-MM-DD'),
        ),
      });
    }

    if (args.body.tipoFeriado) {
      AND.push({ tipo_feriado: args.body.tipoFeriado });
    }

    if (args.body.anoFeriado) {
      AND.push({ ano_feriado: args.body.anoFeriado });
    }

    const total = await prisma.feriados.count({
      where: { AND },
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.feriados.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: { AND },
      orderBy: {
        data_feriado: 'desc',
      },
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
