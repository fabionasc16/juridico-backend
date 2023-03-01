import { Request, Response } from 'express';

import { TiposEventoService } from '../services/TiposEvento.service';


import { LogsService } from '../services/Logs.service';

class TiposEventoController {
  static service: TiposEventoService;
  static logs: LogsService;

  public constructor() {
    TiposEventoController.service = new TiposEventoService();
    TiposEventoController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descTipoEvento } = request.body;
    const service = await TiposEventoController.service.create({
      desc_tipoevento: descTipoEvento,
    });

     try {
      TiposEventoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.TIPO_EVENTO, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    await TiposEventoController.service.delete(Number(id_tipoevento));

    try {
      TiposEventoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.TIPO_EVENTO, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await TiposEventoController.service.read();

    try {
      TiposEventoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.TIPO_EVENTO, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    const data = await TiposEventoController.service.readById(
      Number(id_tipoevento),
    );

    try {
      TiposEventoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.TIPO_EVENTO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    const { descTipoEvento } = request.body;

    await TiposEventoController.service.update({
      id_tipoevento: Number(id_tipoevento),
      desc_tipoevento: descTipoEvento,
    });

    try {
      TiposEventoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.TIPO_EVENTO, LogsService.TRANSACTION.EDITAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }
}

export { TiposEventoController };
