import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Assunto } from '../models/Assunto.model';

class AssuntoRepository implements IPrismaSource<Assunto> {
  async listall(): Promise<any> {
    return prisma.assunto.findMany({
      select: {
        id_assunto: true,
        desc_assunto: true,
      },
    });
  }

  async create(args: Assunto): Promise<Assunto> {
    return prisma.assunto.create({
      data: {
        codigo_siged: args.codigo_siged,
        desc_assunto: args.desc_assunto,
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
        id_assunto: Number(args.query.search),
      };
    }

    const AND = [];

    if (args.body.codigoSIGED) {
      AND.push({ codigo_siged: Number(args.body.codigoSIGED) });
    }

    if (args.body.descricaoAssunto) {
      AND.push({ desc_assunto: { contains: args.body.descricaoAssunto } });
    }

    if (AND.length) {
      Object.assign(filters, { AND });
    }

    const total = await prisma.assunto.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.assunto.findMany({
      skip: pageNumber * pageSizeNumber,
      take: pageSizeNumber,
      where: filters,
      orderBy: [
        {
          desc_assunto: 'asc',
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

  async delete(id_assunto: number): Promise<void> {
    await prisma.assunto.delete({
      where: {
        id_assunto,
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

  async loadDesc(desc_assunto: string): Promise<any> {
    return prisma.assunto.findFirst({
      where: {
        desc_assunto,
      },
    });
  }
}

export { AssuntoRepository };
