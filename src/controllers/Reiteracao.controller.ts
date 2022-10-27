import { Request, Response } from 'express';

import { ReiteracaoService } from '../services/Reiteracao.service';

class ReiteracaoController {
  static service: ReiteracaoService;
  public constructor() {
    ReiteracaoController.service = new ReiteracaoService();
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

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_reiteracao } = request.params;
    await ReiteracaoController.service.delete(Number(id_reiteracao));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ReiteracaoController.service.read(request.query);
    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_reiteracao } = request.params;
    const data = await ReiteracaoController.service.loadById(
      Number(id_reiteracao),
    );

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

    return response.status(204).send();
  }

  async readByProcesso(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const data = await ReiteracaoController.service.loadByProcesso(
      request.query,
    );

    return response.status(200).json(data);
  }
}

export { ReiteracaoController };
