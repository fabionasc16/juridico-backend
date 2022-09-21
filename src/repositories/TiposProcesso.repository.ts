import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { TiposProcesso } from '../models/TiposProcesso.model';

class TiposProcessoRepository implements IPrismaSource<TiposProcesso> {
  async create(args: TiposProcesso): Promise<TiposProcesso> {
    return prisma.tiposProcesso.create({
      data: {
        desc_tipoprocesso: args.desc_tipoprocesso,
      },
    });
  }

  async delete(args: any): Promise<void> {
    await prisma.tiposProcesso.delete({
      where: {
        id_tipoprocesso: args.id_tipoprocesso,
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
        desc_tipoprocesso: args.search,
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

  async listDescription(desc: string): Promise<any> {
    return prisma.tiposProcesso.findFirst({
      where: {
        desc_tipoprocesso: desc,
      },
    });
  }

  async listId(id: number): Promise<any> {
    return prisma.tiposProcesso.findUnique({
      where: {
        id_tipoprocesso: id,
      },
    });
  }
}

export { TiposProcessoRepository };
