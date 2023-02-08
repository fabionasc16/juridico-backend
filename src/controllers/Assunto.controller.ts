import { Request, Response } from 'express';

import { AssuntoService } from '../services/Assunto.service';

import { LogsService } from '../services/Logs.service';

class AssuntoController {
  static service: AssuntoService;
  static logs: LogsService;

  public constructor() {
    AssuntoController.service = new AssuntoService();
    AssuntoController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { codigoSIGED, descricaoAssunto } = request.body;
    const service = await AssuntoController.service.create({
      codigo_siged: codigoSIGED,
      desc_assunto: descricaoAssunto,
    });

    try {
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.CADASTRAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_assunto } = request.params;
    await AssuntoController.service.delete(Number(id_assunto));

    try {
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.EXCLUIR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await AssuntoController.service.read(request);

    try {
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.LISTAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_assunto } = request.params;
    const data = await AssuntoController.service.readById(Number(id_assunto));

    try {
     
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.VISUALIZAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_assunto } = request.params;
    const { codigoSIGED, descricaoAssunto } = request.body;

    await AssuntoController.service.update({
      id_assunto: Number(id_assunto),
      codigo_siged: codigoSIGED,
      desc_assunto: descricaoAssunto,
    });

    try {
     
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.EDITAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }

  async listall(request: Request, response: Response): Promise<any> {
    const data = await AssuntoController.service.listall();

    try {
      AssuntoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.LISTAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(200).json(data);
  }
}

export { AssuntoController };
