import { prisma } from 'config/Prisma.config';
import { IPrismaSource } from 'generics/IPrismaSource';
import { Assunto } from 'models/Assunto.model';

class AssuntoRepository implements IPrismaSource<Assunto> {
  async create(args: Assunto): Promise<Assunto> {
    return prisma.assunto.create({
      data: {
        codigo_siged: args.codigo_siged,
        desc_assunto: args.desc_assunto,
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
        codigo_siged: args.search,
      };
    }

    const total = await prisma.processos.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.assunto.findMany({
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

  async update(args: Assunto): Promise<void> {
    await prisma.assunto.update({
      where: {
        id_assunto: args.id_assunto,
      },
      data: {
        codigo_siged: args.codigo_siged,
        desc_assunto: args.desc_assunto,
      },
    });
  }

  async delete(args: any): Promise<void> {
    await prisma.assunto.delete({
      where: {
        id_assunto: args.id_assunto,
      },
    });
  }

  async loadId(id_assunto: number): Promise<any> {
    return prisma.assunto.findUnique({
      where: {
        id_assunto,
      },
    });
  }

  async loadCodigo(codigo_siged: number): Promise<any> {
    return prisma.assunto.findFirst({
      where: {
        codigo_siged,
      },
    });
  }
}

export { AssuntoRepository };
