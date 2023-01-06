import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { TiposEvento } from '../models/TipoEvento.model';

class TiposEventoRepository implements IPrismaSource<TiposEvento> {
  async create(args: TiposEvento): Promise<TiposEvento> {
    return prisma.tiposEventos.create({
      data: {
        desc_tipoevento: args.desc_tipoevento,
      },
    });
  }

  async delete(id_tipoevento: number): Promise<void> {
    await prisma.tiposEventos.delete({
      where: {
        id_tipoevento,
      },
    });
  }

  async loadId(id_tipoevento: number): Promise<any> {
    return prisma.tiposEventos.findUnique({
      where: {
        id_tipoevento,
      },
    });
  }

  async read(): Promise<any> {
    return prisma.tiposEventos.findMany();
  }

  async update(args: TiposEvento): Promise<void> {
    await prisma.tiposEventos.update({
      where: {
        id_tipoevento: args.id_tipoevento,
      },
      data: {
        desc_tipoevento: args.desc_tipoevento,
      },
    });
  }

  async readByDesc(desc_tipoevento: string): Promise<any> {
    return prisma.tiposEventos.findFirst({
      where: {
        desc_tipoevento,
      },
    });
  }
}

export { TiposEventoRepository };
