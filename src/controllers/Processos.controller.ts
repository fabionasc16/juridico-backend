import { Request, Response } from 'express';

import { ProcessosService } from '../services/Processos.service';

class ProcessosController {
  static service: ProcessosService;
  public constructor() {
    ProcessosController.service = new ProcessosService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      numProcedimento,
      idTipoProcesso,
      prazoTotal,
      idOrgaoDemandante,
      dataProcesso,
      dataRecebimento,
      horaRecebimento,
      idAssunto,
      idClassificacao,
      objeto,
      requerSIGED,
      numProcessoSIGED,
      dataProcessoSIGED,
      permanenciaSIGED,
      caixaAtualSIGED,
      tramitacaoSIGED,
      idResponsavel,
      observacao,
      descricao,
      statusPrazo,
      sigiloso,
      statusProcesso,
      valorMulta,
    } = request.body;
    const service = await ProcessosController.service.create({
      num_procedimento: numProcedimento,
      fk_tipoprocesso: idTipoProcesso,
      prazo_total: Number(prazoTotal),
      fk_orgaodemandante: idOrgaoDemandante,
      data_processo: dataProcesso,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      fk_assunto: idAssunto,
      fk_classificacao: idClassificacao,
      objeto,
      requer_siged: requerSIGED === true ? 'S' : 'N',
      numero_siged: numProcessoSIGED,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: permanenciaSIGED,
      caixa_atual_siged: caixaAtualSIGED,
      tramitacao_siged: tramitacaoSIGED,
      fk_responsavel: idResponsavel,
      observacao,
      descricao,
      status_prazo: statusPrazo,
      sigiloso: sigiloso === true ? 'S' : 'N',
      fk_status: statusProcesso,
      valor_multa: valorMulta === '' ? 0 : Number(valorMulta),
    });

    return response.status(201).send(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    await ProcessosController.service.delete(Number(id_processo));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ProcessosController.service.read(request);
    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    const data = await ProcessosController.service.readById(
      Number(id_processo),
    );

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_processo } = request.params;
    const {
      numProcedimento,
      idTipoProcesso,
      prazoTotal,
      idOrgaoDemandante,
      dataProcesso,
      dataRecebimento,
      horaRecebimento,
      idAssunto,
      idClassificacao,
      objeto,
      requerSIGED,
      numProcessoSIGED,
      dataProcessoSIGED,
      permanenciaSIGED,
      caixaAtualSIGED,
      tramitacaoSIGED,
      idResponsavel,
      observacao,
      descricao,
      statusPrazo,
      sigiloso,
      statusProcesso,
      valorMulta,
    } = request.body;
    await ProcessosController.service.update({
      id_processo: Number(id_processo),
      num_procedimento: numProcedimento,
      fk_tipoprocesso: idTipoProcesso,
      prazo_total: Number(prazoTotal),
      fk_orgaodemandante: idOrgaoDemandante,
      data_processo: dataProcesso,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      fk_assunto: idAssunto,
      fk_classificacao: idClassificacao,
      objeto,
      requer_siged: requerSIGED === true ? 'S' : 'N',
      numero_siged: numProcessoSIGED,
      data_processo_siged: dataProcessoSIGED,
      permanencia_siged: permanenciaSIGED,
      caixa_atual_siged: caixaAtualSIGED,
      tramitacao_siged: tramitacaoSIGED,
      fk_responsavel: idResponsavel,
      observacao,
      descricao,
      status_prazo: statusPrazo,
      sigiloso: sigiloso === true ? 'S' : 'N',
      fk_status: statusProcesso,
      valor_multa: valorMulta === '' ? 0 : Number(valorMulta),
    });

    return response.status(204).send();
  }

  async retrieveSIGEDData(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numero_processo } = request.query;
    const data = await ProcessosController.service.retrieveSIGEDData(
      numero_processo as string,
    );

    return response.status(200).json(data);
  }

  async updateStatusProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idProcesso } = request.query;
    const { idStatusProcesso, dataArquivamento } = request.body;

    await ProcessosController.service.updateStatusProcesso(
      Number(idProcesso),
      dataArquivamento,
      idStatusProcesso,
    );

    return response.status(204).send();
  }
}

export { ProcessosController };
