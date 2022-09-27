import { calculateDays } from 'config/Holidays.config';
import { AppError } from 'errors/AppError.class';
import { Processos } from 'models/Processos.model';
import { AssuntoRepository } from 'repositories/Assunto.repository';
import { ClassificacaoRepository } from 'repositories/Classificacao.repository';
import { OrgaoDemandanteRepository } from 'repositories/OrgaoDemandante.repository';
import { ProcessosRepository } from 'repositories/Processos.repository';
import { ResponsaveisRepository } from 'repositories/Responsaveis.repository';
import { StatusRepository } from 'repositories/Status.repository';
import { TiposProcessoRepository } from 'repositories/TiposProcesso.repository';

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
    if (!args.num_procedimento) {
      throw new AppError('Informe o Número do Processo');
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
          'Nenhum Órgão Demandante foi localizado com os parâmetros informados',
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

    if (!args.prazo_total) {
      throw new AppError('Informe o Prazo Total do Projeto');
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

    if (!args.requer_siged) {
      throw new AppError(
        'Informe se o Processo requer vínculo a um Processo do SIGED',
      );
    }

    if (!args.observacao) {
      throw new AppError('Informe uma Observação para o Processo');
    }

    if (!args.descricao) {
      throw new AppError('Informe uma Descrição para o Processo');
    }

    if (!args.dia_limite_prazo) {
      throw new AppError('Informe um Prazo Limite para o Processo');
    }

    if (!args.dias_percorridos) {
      throw new AppError('Informe os Dias Percorridos do Processo');
    }

    if (!args.dias_expirados) {
      throw new AppError('Informe os Dias Expirados do Processo');
    }

    if (!args.status_prazo) {
      throw new AppError('Informe o Status do Prazo do Processo');
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
    throw new Error('method not implemented');
  }
}

export { ProcessosService };
