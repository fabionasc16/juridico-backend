import { prisma } from 'config/Prisma.config';
import { IPrismaSource } from 'generics/IPrismaSource';
import { Classificacao } from 'models/Classificacao.model';

class ClassificacaoRepository implements IPrismaSource<Classificacao> {
  async create(args: Classificacao): Promise<Classificacao> {
    return prisma.classificacao.create({
      data: {
        desc_classificacao: args.desc_classificacao,
      },
    });
  }

  async read(args: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async update(args: Classificacao): Promise<void> {
    await prisma.classificacao.update({
      where: {
        id_classificacao: args.id_classificacao,
      },
      data: {
        desc_classificacao: args.desc_classificacao,
      },
    });
  }

  async delete(args: any): Promise<void> {
    await prisma.classificacao.delete({
      where: {
        id_classificacao: args.id_classificacao,
      },
    });
  }
}

export { ClassificacaoRepository };
