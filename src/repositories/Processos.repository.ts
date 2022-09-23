import { prisma } from '../config/Prisma.config';
import { IPrismaSource } from '../generics/IPrismaSource';
import { Processos } from '../models/Processos.model';

class ProcessosRepository implements IPrismaSource<Processos> {
  async create(args: Processos): Promise<Processos> {
    return prisma.processos.create({
      data: {
        num_procedimento: args.num_procedimento,
        fk_tipoprocesso: args.fk_tipoprocesso,
        prazo_total: args.prazo_total,
        fk_orgaodemandante: args.fk_orgaodemandante,
        data_processo: args.data_processo,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        fk_assunto: args.fk_assunto,
        fk_classificacao: args.fk_classificacao,
        objeto: args.objeto,
        requer_siged: args.requer_siged,
        numero_siged: args.numero_siged,
        data_processo_siged: args.data_processo_siged,
        permanencia_siged: args.permanencia_siged,
        caixa_atual_siged: args.caixa_atual_siged,
        tramitacao_siged: args.tramitacao_siged,
        fk_responsavel: args.fk_responsavel,
        observacao: args.observacao,
        descricao: args.descricao,
        dia_limite_prazo: args.dia_limite_prazo,
        dias_percorridos: args.dias_percorridos,
        dias_expirados: args.dias_expirados,
        status_prazo: args.status_prazo,
        sigiloso: args.sigiloso,
        fk_status: args.fk_status,
      },
    });
  }

  async delete(args: any): Promise<void> {
    await prisma.processos.delete({
      where: {
        id_processo: args.id_processo,
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
        num_procedimento: args.search,
      };
    }

    const total = await prisma.processos.count({
      where: filters,
    });
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    const data = await prisma.processos.findMany({
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

  async update(args: Processos): Promise<void> {
    await prisma.processos.update({
      where: {
        id_processo: args.id_processo,
      },
      data: {
        num_procedimento: args.num_procedimento,
        fk_tipoprocesso: args.fk_tipoprocesso,
        prazo_total: args.prazo_total,
        fk_orgaodemandante: args.fk_orgaodemandante,
        data_processo: args.data_processo,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        fk_assunto: args.fk_assunto,
        fk_classificacao: args.fk_classificacao,
        objeto: args.objeto,
        requer_siged: args.requer_siged,
        numero_siged: args.numero_siged,
        data_processo_siged: args.data_processo_siged,
        permanencia_siged: args.permanencia_siged,
        caixa_atual_siged: args.caixa_atual_siged,
        tramitacao_siged: args.tramitacao_siged,
        fk_responsavel: args.fk_responsavel,
        observacao: args.observacao,
        descricao: args.descricao,
        dia_limite_prazo: args.dia_limite_prazo,
        dias_percorridos: args.dias_percorridos,
        dias_expirados: args.dias_expirados,
        status_prazo: args.status_prazo,
        sigiloso: args.sigiloso,
        fk_status: args.fk_status,
      },
    });
  }

  async loadId(id_processo: number): Promise<any> {
    return prisma.processos.findUnique({
      where: {
        id_processo,
      },
    });
  }

  async loadNumProcedimento(num_procedimento: string): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        num_procedimento,
      },
    });
  }
}

export { ProcessosRepository };
