import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { TiposProcesso } from '../models/TiposProcesso.model';

class TiposProcessoRepository implements IPrismaSource<TiposProcesso> {
  async listall(): Promise<any> {
    return prisma.tiposProcesso.findMany({
      select: {
        id_tipoprocesso: true,
        desc_tipoprocesso: true,
      },
    });
  }
  async create(args: TiposProcesso): Promise<TiposProcesso> {
    return prisma.tiposProcesso.create({
      data: {
        desc_tipoprocesso: args.desc_tipoprocesso,
      },
    });
  }

  async delete(id_tipoprocesso: number): Promise<void> {
    await prisma.tiposProcesso.delete({
      where: {
        id_tipoprocesso,
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
        desc_tipoprocesso: {
          contains: args.search,
        },
      };
    }

    const total = await prisma.tiposProcesso.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.tiposProcesso.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: filters,
      orderBy: [
        {
          desc_tipoprocesso: 'asc',
        },
      ],
    });

    return {
      currentPage: page,
      perPage: pageSize,
      total,
      data,
    };
  }

  async update(args: TiposProcesso): Promise<void> {
    await prisma.tiposProcesso.update({
      where: {
        id_tipoprocesso: args.id_tipoprocesso,
      },
      data: {
        desc_tipoprocesso: args.desc_tipoprocesso,
      },
    });
  }

  async loadId(id_tipoprocesso: number): Promise<any> {
    return prisma.tiposProcesso.findUnique({
      where: {
        id_tipoprocesso,
      },
    });
  }

  async listDescription(desc: string): Promise<any> {
    return prisma.tiposProcesso.findFirst({
      where: {
        desc_tipoprocesso: desc,
      },
    });
  }
}

export { TiposProcessoRepository };
