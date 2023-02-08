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
        dias_corridos: args.dias_corridos,
        fk_orgaodemandante: args.fk_orgaodemandante,
        data_processo: args.data_processo,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        data_arquivamento: args.data_arquivamento,
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
        valor_multa: args.valor_multa,        
      },
    });
  }

  async delete(id_processo: number): Promise<void> {
    await prisma.processos.delete({
      where: {
        id_processo,
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
        id_processo: args.query.search,
      };
    }

    const AND = [];

    if (args.body.idTipoProcesso) {
      AND.push({ fk_tipoprocesso: Number(args.body.idTipoProcesso) });
    }

    if (args.body.numProcedimento) {
      AND.push({ num_procedimento: args.body.numProcedimento });
    }

    if (args.body.numProcessoSIGED) {
      AND.push({ numero_siged: args.body.numProcessoSIGED });
    }

    if (args.body.statusProcesso) {
      AND.push({ fk_status: Number(args.body.statusProcesso) });
    }

    if (args.body.statusPrazo) {
      AND.push({ status_prazo: Number(args.body.statusPrazo) });
    }

    if (args.body.idOrgaoDemandante) {
      AND.push({ fk_orgaodemandante: Number(args.body.idOrgaoDemandante) });
    }

    if (args.body.idClassificacao) {
      AND.push({ fk_classificacao: Number(args.body.idClassificacao) });
    }

    if (args.body.idResponsavel) {
      AND.push({ fk_responsavel: Number(args.body.idResponsavel) });
    }

    if (args.body.idAssunto) {
      AND.push({ fk_assunto: Number(args.body.idAssunto) });
    }

    if (args.body.caixaAtualSIGED) {
      AND.push({ caixa_atual_siged: args.body.caixaAtualSIGED });
    }

    if (AND.length) {
      Object.assign(filters, { AND });
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
      include: {
        _count: {
          select: {
            Reiteracao: true,
          },
        },
        tipoProcesso: true,
        status: true,
        assunto: true,
        classificacao: true,
        orgaoDemandante: true,
        responsavel: true,
      },
    });

    return {
      currentPage: page,
      perPage: pageSize,
      total,
      data,
    };
  }

  async readCaixasSIGED(): Promise<any> {
    return prisma.$queryRaw`
      SELECT DISTINCT 
        caixa_atual_siged 
      FROM 
        processos 
      WHERE 
        caixa_atual_siged IS NOT NULL AND TRIM(caixa_atual_siged) <> ''
    `;
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
        dias_corridos: args.dias_corridos,
        fk_orgaodemandante: args.fk_orgaodemandante,
        data_processo: args.data_processo,
        data_recebimento: args.data_recebimento,
        hora_recebimento: args.hora_recebimento,
        data_arquivamento: args.data_arquivamento,
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
        valor_multa: args.valor_multa,
      },
    });
  }

  async loadId(id_processo: number): Promise<any> {
    return prisma.processos.findUnique({
      where: {
        id_processo,
      },
      include: {
        tipoProcesso: true,
        status: true,
        assunto: true,
        classificacao: true,
        orgaoDemandante: true,
        responsavel: true,
      },
    });
  }

  async loadNumProcedimento(num_procedimento: string): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        num_procedimento,
      },
      include: {
        tipoProcesso: true,
        status: true,
        assunto: true,
        classificacao: true,
        orgaoDemandante: true,
        responsavel: true,
      },
    });
  }

  async loadExists(
    num_procedimento: string,
    fk_orgaodemandante: number,
    fk_tipoprocesso: number,
  ): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        AND: [
          { num_procedimento },
          { fk_orgaodemandante },
          { fk_tipoprocesso },
        ],
      },
      include: {
        tipoProcesso: true,
        status: true,
        assunto: true,
        classificacao: true,
        orgaoDemandante: true,
        responsavel: true,
      },
    });
  }

  async loadExistsNotId(
    id_processo: number,
    num_procedimento: string,
    fk_orgaodemandante: number,
    fk_tipoprocesso: number,
  ): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        NOT: [{ id_processo }],
        AND: [
          { num_procedimento },
          { fk_orgaodemandante },
          { fk_tipoprocesso },
        ],
      },
      include: {
        tipoProcesso: true,
        status: true,
        assunto: true,
        classificacao: true,
        orgaoDemandante: true,
        responsavel: true,
      },
    });
  }

  async loadObjeto(objeto: string): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        objeto,
      },
    });
  }

  async loadDescricao(descricao: string): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        descricao,
      },
    });
  }

  async loadProcesso(numero_siged: string): Promise<any> {
    return prisma.processos.findFirst({
      where: {
        numero_siged,
      },
    });
  }

  async updateStatusProcesso(
    id_processo: number,
    data_arquivamento: Date,
    fk_status: number,
    fk_responsavel: number,
  ): Promise<void> {
    await prisma.processos.update({
      where: { id_processo },
      data: { fk_status, fk_responsavel, data_arquivamento },
    });
  }
  async updatePrazosProcesso(
    id_processo: number,
    processo: any
  ): Promise<void> {

    prisma.processos.update({
      where: { id_processo },
      data: processo,
    });
  }

  async listarTodosProcessosAtualizacao(): Promise<any> {
    return await prisma.processos.findMany(
      {
        select: {
          id_processo: true,
          prazo_total: true,
          data_recebimento: true
        },
        where: {
          NOT: {
            AND: [
              { fk_status: 14 },
            ]
          },
        },

      }
    );
  }

}

export { ProcessosRepository };
