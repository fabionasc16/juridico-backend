import { Request, Response } from 'express';

import { FeriadosService } from '../services/Feriados.service';
import { ProcessosService } from '../services/Processos.service';

import { LogsService } from '../services/Logs.service';

class FeriadosController {
  static service: FeriadosService;
  static processoService: ProcessosService;
  static logs: LogsService;

  public constructor() {
    FeriadosController.service = new FeriadosService();
    FeriadosController.processoService = new ProcessosService();
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
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    // Atualiza prazo do processo
    FeriadosController.processoService.atualizaPrazosProcessos();

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    await FeriadosController.service.delete(Number(id_feriado));

     // Atualiza prazo do processo
     FeriadosController.processoService.atualizaPrazosProcessos();

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await FeriadosController.service.read(request);

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    const data = await FeriadosController.service.readById(Number(id_feriado));

    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
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
 
    // Atualiza prazo do processo
    FeriadosController.processoService.atualizaPrazosProcessos();
    try {
      FeriadosController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.FERIADOS, LogsService.TRANSACTION.EDITAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(204).send();
  }
}

export { FeriadosController };
