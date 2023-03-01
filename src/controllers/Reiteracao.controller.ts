import { Request, Response } from 'express';

import { ReiteracaoService } from '../services/Reiteracao.service';

import { LogsService } from '../services/Logs.service';


class ReiteracaoController {
  static service: ReiteracaoService;
  static logs: LogsService;
  public constructor() {
    ReiteracaoController.service = new ReiteracaoService();
    ReiteracaoController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      numeroProcedimento,
      numeroSIGED,
      dataProcesso,
      prazoProcesso,
      idStatus,
      dataRecebimento,
      horaRecebimento,
      reiteracao,
      idProcesso,
    } = request.body;
    const service = await ReiteracaoController.service.create({
      num_procedimento: numeroProcedimento,
      numero_siged: numeroSIGED,
      data_processo: dataProcesso,
      prazo: prazoProcesso,
      fk_status: idStatus,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      reiteracao,
      fk_processo: idProcesso,
    });

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_reiteracao } = request.params;
    await ReiteracaoController.service.delete(Number(id_reiteracao));

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ReiteracaoController.service.read(request.query);

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_reiteracao } = request.params;
    const data = await ReiteracaoController.service.loadById(
      Number(id_reiteracao),
    );

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_reiteracao } = request.params;
    const {
      numeroProcedimento,
      numeroSIGED,
      dataProcesso,
      prazoProcesso,
      idStatus,
      dataRecebimento,
      horaRecebimento,
      reiteracao,
      idProcesso,
    } = request.body;
    await ReiteracaoController.service.update({
      id_reiteracao: Number(id_reiteracao),
      num_procedimento: numeroProcedimento,
      numero_siged: numeroSIGED,
      data_processo: dataProcesso,
      prazo: prazoProcesso,
      fk_status: idStatus,
      data_recebimento: dataRecebimento,
      hora_recebimento: horaRecebimento,
      reiteracao,
      fk_processo: idProcesso,
    });

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.EDITAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async readByProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const data = await ReiteracaoController.service.loadByProcesso(
      Number(request.params.fk_processo),
      request.query,
    );

    try {
      ReiteracaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.REITERACAO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(200).json(data);
  }
}

export { ReiteracaoController };
