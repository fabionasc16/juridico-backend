import { prisma } from 'config/Prisma.config';
import { IPrismaSource } from 'generics/IPrismaSource';
import { Status } from 'models/Status.model';

class StatusRepository implements IPrismaSource<Status> {
  async create(args: Status): Promise<Status> {
    return prisma.status.create({
      data: {
        desc_status: args.desc_status,
        aplica_a: args.aplica_a,
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
        desc_status: args.search,
      };
    }

    const total = await prisma.status.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.status.findMany({
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

  async update(args: Status): Promise<void> {
    await prisma.status.update({
      where: {
        id_status: args.id_status,
      },
      data: {
        desc_status: args.desc_status,
        aplica_a: args.aplica_a,
      },
    });
  }

  async delete({ id_status }: Status): Promise<void> {
    await prisma.status.delete({
      where: {
        id_status,
      },
    });
  }

  async loadId({ id_status }: Status): Promise<any> {
    return prisma.status.findUnique({
      where: {
        id_status,
      },
    });
  }
}

export { StatusRepository };
