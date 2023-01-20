import { Request, Response } from 'express';

import { FeriadosService } from '../services/Feriados.service';

import { LogsService } from '../services/Logs.service';

class FeriadosController {
  static service: FeriadosService;
  static logs: LogsService;

  public constructor() {
    FeriadosController.service = new FeriadosService();
    FeriadosController.logs = new LogsService();
  }
  async create(request: Request, response: Response): Promise<Response> {
    const { dataFeriado, descFeriado, tipoFeriado } = request.body;
    const service = await FeriadosController.service.create({
      data_feriado: dataFeriado,
      desc_feriado: descFeriado,
      tipo_feriado: tipoFeriado,
    });

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.CADASTRAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    await FeriadosController.service.delete(Number(id_feriado));

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.EXCLUIR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await FeriadosController.service.read(request);

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.LISTAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    const data = await FeriadosController.service.readById(Number(id_feriado));

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.VISUALIZAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    const { dataFeriado, descFeriado, tipoFeriado } = request.body;

    await FeriadosController.service.update({
      id_feriado: Number(id_feriado),
      data_feriado: dataFeriado,
      desc_feriado: descFeriado,
      tipo_feriado: tipoFeriado,
    });

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.EDITAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }
}

export { FeriadosController };
