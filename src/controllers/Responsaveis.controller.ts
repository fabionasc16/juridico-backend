import { Request, Response } from 'express';

import { LogsService } from '../services/Logs.service';
import { ResponsaveisService } from '../services/Responsaveis.service';

class ResponsaveisController {
  static service: ResponsaveisService;
  static logs: LogsService;

  public constructor() {
    ResponsaveisController.service = new ResponsaveisService();
    ResponsaveisController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      nomeResponsavel,
      cpfResponsavel,
      telefone,
      email,
      registroOAB,
      idUsuario,
    } = request.body;
    const service = await ResponsaveisController.service.create({
      nome_responsavel: nomeResponsavel,
      cpf_responsavel: cpfResponsavel,
      telefone,
      email,
      registro_oab: registroOAB,
      id_usuario: idUsuario,
    });

    try {
      ResponsaveisController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.RESPONSAVEIS,
        LogsService.TRANSACTION.CADASTRAR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_responsavel } = request.params;
    await ResponsaveisController.service.delete(Number(id_responsavel));

    try {
      ResponsaveisController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.RESPONSAVEIS,
        LogsService.TRANSACTION.EXCLUIR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ResponsaveisController.service.read(request);

    try {
      ResponsaveisController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.RESPONSAVEIS,
        LogsService.TRANSACTION.LISTAR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_responsavel } = request.params;
    const data = await ResponsaveisController.service.readById(
      Number(id_responsavel),
    );
    try {
      ResponsaveisController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.RESPONSAVEIS,
        LogsService.TRANSACTION.VISUALIZAR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_responsavel } = request.params;
    const {
      nomeResponsavel,
      cpfResponsavel,
      telefone,
      email,
      registroOAB,
      idUsuario,
    } = request.body;

    await ResponsaveisController.service.update({
      id_responsavel: Number(id_responsavel),
      nome_responsavel: nomeResponsavel,
      cpf_responsavel: cpfResponsavel,
      telefone,
      email,
      registro_oab: registroOAB,
      id_usuario: idUsuario,
    });

    try {
      ResponsaveisController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.RESPONSAVEIS,
        LogsService.TRANSACTION.EDITAR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }
}

export { ResponsaveisController };
