import moment from 'moment';

import { calculateDays } from '../config/Holidays.config';
import { AppError } from '../errors/AppError.class';
import { Processos } from '../models/Processos.model';
import { AssuntoRepository } from '../repositories/Assunto.repository';
import { ClassificacaoRepository } from '../repositories/Classificacao.repository';
import { OrgaoDemandanteRepository } from '../repositories/OrgaoDemandante.repository';
import { ProcessosRepository } from '../repositories/Processos.repository';
import { ResponsaveisRepository } from '../repositories/Responsaveis.repository';
import { StatusRepository } from '../repositories/Status.repository';
import { TiposProcessoRepository } from '../repositories/TiposProcesso.repository';

class ProcessosService {
  private processos: ProcessosRepository;
  private tiposProcesso: TiposProcessoRepository;
  private orgaoDemandante: OrgaoDemandanteRepository;
  private assunto: AssuntoRepository;
  private classificacao: ClassificacaoRepository;
  private responsavel: ResponsaveisRepository;
  private status: StatusRepository;

  constructor() {
    this.processos = new ProcessosRepository();
    this.tiposProcesso = new TiposProcessoRepository();
    this.orgaoDemandante = new OrgaoDemandanteRepository();
    this.assunto = new AssuntoRepository();
    this.classificacao = new ClassificacaoRepository();
    this.responsavel = new ResponsaveisRepository();
    this.status = new StatusRepository();
  }

  async create(args: Processos): Promise<Processos> {
    let diasExpirados = 0;

    if (!args.num_procedimento) {
      throw new AppError('Informe o Número do Procedimento');
    }

    if (!args.fk_tipoprocesso) {
      throw new AppError('Informe o Tipo de Processo');
    } else {
      const tiposProcesso = await this.tiposProcesso.loadId(
        args.fk_tipoprocesso,
      );
      if (!tiposProcesso) {
        throw new AppError(
          'Nenhum Tipo de Processo foi localizado com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.fk_orgaodemandante) {
      throw new AppError('Informe o Órgão Demandante do Processo');
    } else {
      const orgao = await this.orgaoDemandante.loadId(args.fk_orgaodemandante);
      if (!orgao) {
        throw new AppError(
          'Nenhum Órgão Demandante foi localizado com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.fk_assunto) {
      throw new AppError('Informe o Assunto do Projeto');
    } else {
      const assunto = await this.assunto.loadId(args.fk_assunto);
      if (!assunto) {
        throw new AppError(
          'Nenhum Assunto foi localizado com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.fk_classificacao) {
      throw new AppError('Informe a Classificação do Processo');
    } else {
      const classificacao = await this.classificacao.loadId(
        args.fk_classificacao,
      );
      if (!classificacao) {
        throw new AppError(
          'Nenhuma Classificação foi localizada com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.fk_responsavel) {
      throw new AppError('Informe um Responsável pelo Processo');
    } else {
      const responsavel = await this.responsavel.loadId(args.fk_responsavel);
      if (!responsavel) {
        throw new AppError(
          'Nenhum Responsável foi localizado com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.fk_status) {
      throw new AppError('Informe o Status do Processo');
    } else {
      const status = await this.status.loadId(args.fk_status);
      if (!status) {
        throw new AppError(
          'Nenhum Status foi localizado com os parâmetros informados',
          404,
        );
      }
    }

    if (!args.data_processo) {
      throw new AppError('Informe a Data de Abertura do Processo');
    }

    if (!args.data_recebimento) {
      throw new AppError('Informe a Data de Recebimento do Processo');
    }

    if (!args.hora_recebimento) {
      throw new AppError('Informe a Hora de Abertura do Processo');
    }

    if (!args.objeto) {
      throw new AppError('Informe o Objeto do Processo');
    }

    if (!args.descricao) {
      throw new AppError('Informe uma Descrição para o Processo');
    }

    let dataProcessoSIGED: any = null;
    if (args.data_processo_siged) {
      dataProcessoSIGED = new Date(
        moment(args.data_processo_siged).format('YYYY-MM-DD'),
      );
    }

    const limiteProcesso = (
      await calculateDays(args.data_recebimento, args.prazo_total)
    ).format('YYYY-MM-DD');

    const diasPercorridos = moment(new Date(), 'YYYY-MM-DD').diff(
      moment(args.data_recebimento, 'YYYY-MM-DD'),
      'days',
    );

    const expirado = moment(limiteProcesso as string, 'YYYY-MM-DD').diff(
      moment(new Date(), 'YYYY-MM-DD'),
      'days',
    );
    if (expirado >= 0) {
      diasExpirados = 0;
    } else {
      diasExpirados = expirado;
    }

    const dataExists = await this.processos.loadNumProcedimento(
      args.num_procedimento,
    );
    if (dataExists) {
      throw new AppError('O Processo informado já existe no Sistema');
    }

    return this.processos.create({
      num_procedimento: args.num_procedimento,
      fk_tipoprocesso: args.fk_tipoprocesso,
      prazo_total: args.prazo_total,
      fk_orgaodemandante: args.fk_orgaodemandante,
      data_processo: new Date(moment(args.data_processo).format('YYYY-MM-DD')),
      data_recebimento: new Date(
        moment(args.data_recebimento).format('YYYY-MM-DD'),
      ),
      hora_recebimento: args.hora_recebimento,
      fk_assunto: args.fk_assunto,
      fk_classificacao: args.fk_classificacao,
      objeto: args.objeto,
      requer_siged: args.requer_siged,
      numero_siged: args.numero_siged,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: args.permanencia_siged,
      caixa_atual_siged: args.caixa_atual_siged,
      tramitacao_siged: args.tramitacao_siged,
      fk_responsavel: args.fk_responsavel,
      observacao: args.observacao,
      descricao: args.descricao,
      dia_limite_prazo: new Date(
        moment(limiteProcesso as string).format('YYYY-MM-DD'),
      ),
      dias_percorridos: diasPercorridos,
      dias_expirados: diasExpirados,
      status_prazo: args.status_prazo,
      sigiloso: args.sigiloso,
      fk_status: args.fk_status,
      valor_multa: args.valor_multa,
    });
  }

  async delete(id_processo: number): Promise<void> {
    if (!id_processo) {
      throw new AppError('Informe o identificador do Processo');
    }

    const findProcesso = await this.processos.loadId(id_processo);
    if (!findProcesso) {
      throw new AppError(
        'Nenhum processo foi localizado com o identificador informado',
        404,
      );
    }

    await this.processos.delete(findProcesso.id_processo);
  }

  async read(args: any): Promise<any> {
    return this.processos.read(args);
  }

  async update(args: any): Promise<void> {
    if (!args.id_processo) {
      throw new AppError('Informe o Identificador do procedimento');
    }

    const processo = await this.processos.loadId(args.id_processo);
    if (!processo) {
      throw new AppError('Processo não localizado no sistema', 404);
    }

    if (args.num_procedimento) {
      processo.num_procedimento = args.num_procedimento;
    }

    if (args.fk_tipoprocesso) {
      const tiposProcesso = await this.tiposProcesso.loadId(
        args.fk_tipoprocesso,
      );
      if (!tiposProcesso) {
        throw new AppError(
          'Nenhum Tipo de Processo foi localizado com os parâmetros informados',
          404,
        );
      }
      processo.fk_tipoprocesso = args.fk_tipoprocesso;
    }

    if (args.prazo_total) {
      processo.prazo_total = args.prazo_total;
    }

    if (args.fk_orgaodemandante) {
      const orgao = await this.orgaoDemandante.loadId(args.fk_orgaodemandante);
      if (!orgao) {
        throw new AppError(
          'Nenhum Órgão Demandante foi localizado com os parâmetros informados',
          404,
        );
      }
      processo.fk_orgaodemandante = args.fk_orgaodemandante;
    }

    if (args.data_processo) {
      processo.data_processo = new Date(
        moment(args.data_processo).format('YYYY-MM-DD'),
      );
    }

    if (args.data_recebimento) {
      processo.data_recebimento = new Date(
        moment(args.data_recebimento).format('YYYY-MM-DD'),
      );
    }

    if (args.hora_recebimento) {
      processo.hora_recebimento = args.hora_recebimento;
    }

    if (args.fk_assunto) {
      const assunto = await this.assunto.loadId(args.fk_assunto);
      if (!assunto) {
        throw new AppError(
          'Nenhum Órgão Demandante foi localizado com os parâmetros informados',
          404,
        );
      }
      processo.fk_assunto = args.fk_assunto;
    }

    if (args.fk_classificacao) {
      const classificacao = await this.classificacao.loadId(
        args.fk_classificacao,
      );
      if (!classificacao) {
        throw new AppError(
          'Nenhuma Classificação foi localizada com os parâmetros informados',
          404,
        );
      }
      processo.fk_classificacao = args.fk_classificacao;
    }

    if (args.objeto) {
      processo.objeto = args.objeto;
    }

    if (args.requer_siged) {
      processo.requer_siged = args.requer_siged;
    }

    if (args.numero_siged) {
      processo.numero_siged = args.numero_siged;
    }

    if (args.data_processo_siged) {
      processo.data_processo_siged = new Date(
        moment(args.data_processo_siged).format('YYYY-MM-DD'),
      );
    }

    if (args.permanencia_siged) {
      processo.permanencia_siged = args.permanencia_siged;
    }

    if (args.caixa_atual_siged) {
      processo.caixa_atual_siged = args.caixa_atual_siged;
    }

    if (args.tramitacao_siged) {
      processo.tramitacao_siged = args.tramitacao_siged;
    }

    if (args.fk_responsavel) {
      const responsavel = await this.responsavel.loadId(args.fk_responsavel);
      if (!responsavel) {
        throw new AppError(
          'Nenhum Responsável foi localizado com os parâmetros informados',
          404,
        );
      }
      processo.fk_responsavel = args.fk_responsavel;
    }

    if (args.observacao) {
      processo.observacao = args.observacao;
    }

    if (args.descicao) {
      processo.descicao = args.descicao;
    }
    const limitePrazo = (
      await calculateDays(args.data_recebimento, args.prazo_total)
    ).format('YYYY-MM-DD');
    processo.dia_limite_prazo = new Date(
      moment(limitePrazo as string).format('YYYY-MM-DD'),
    );

    processo.dias_percorridos = moment(new Date(), 'YYYY-MM-DD').diff(
      moment(args.data_recebimento, 'YYYY-MM-DD'),
      'days',
    );

    let diasExpirados = 0;
    const expirado = moment(
      processo.dia_limite_prazo as string,
      'YYYY-MM-DD',
    ).diff(moment(new Date(), 'YYYY-MM-DD'), 'days');
    if (expirado >= 0) {
      diasExpirados = 0;
    } else {
      diasExpirados = expirado;
    }
    processo.dias_expirados = diasExpirados;

    if (args.status_prazo) {
      processo.status_prazo = args.status_prazo;
    }

    if (args.sigiloso) {
      processo.sigiloso = args.sigiloso;
    }

    if (args.fk_status) {
      const status = await this.status.loadId(args.fk_status);
      if (!status) {
        throw new AppError(
          'Nenhum Status foi localizado com os parâmetros informados',
          404,
        );
      }
      processo.fk_status = args.fk_status;
    }

    if (args.valor_multa || args.valor_multa === 0) {
      processo.valor_multa = args.valor_multa;
    }

    await this.processos.update(processo);
  }
}

export { ProcessosService };
