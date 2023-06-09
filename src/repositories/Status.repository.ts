import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Status } from '../models/Status.model';

class StatusRepository implements IPrismaSource<Status> {
  listall(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async create(args: Status): Promise<Status> {
    return prisma.status.create({
      data: {
        desc_status: args.desc_status,
        aplica_a: args.aplica_a,
      },
    });
  }

  async read(): Promise<any> {
    return prisma.status.findMany();
  }

  async readRecepcao(): Promise<any> {
    return prisma.status.findMany({
      where: {
        OR: [{ id_status: 10 }, { id_status: 11 }],
      },
    });
  }

  async readAll(): Promise<any> {
    return prisma.status.findMany({
      where: {
        OR: [
          { id_status: 10 },
          { id_status: 11 },
          { id_status: 12 },
          { id_status: 13 },
          { id_status: 14 },
        ],
      },
    });
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

  async delete(id_status: number): Promise<void> {
    await prisma.status.delete({
      where: {
        id_status,
      },
    });
  }

  async loadId(id_status: number): Promise<any> {
    return prisma.status.findUnique({
      where: {
        id_status,
      },
    });
  }

  async loadDesc(desc_status: string): Promise<any> {
    return prisma.status.findFirst({
      where: {
        desc_status: {
          contains: desc_status,
        },
      },
    });
  }

  async loadAplica(aplica_a: string): Promise<any> {
    return prisma.status.findMany({
      where: { aplica_a },
    });
  }
}

export { StatusRepository };
