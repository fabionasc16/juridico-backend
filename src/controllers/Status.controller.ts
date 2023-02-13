import { Request, Response } from 'express';

import { AuthService } from '../services/Auth.service';
// eslint-disable-next-line import-helpers/order-imports
import { StatusSerivce } from '../services/Status.service';

import { LogsService } from '../services/Logs.service';


class StatusController {
  static service: StatusSerivce;
  static logs: LogsService;

  public constructor() {
    StatusController.service = new StatusSerivce();
    StatusController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descStatus, aplicaA } = request.body;
    const data = await StatusController.service.create({
      desc_status: descStatus,
      aplica_a: aplicaA,
    });

    try {
      StatusController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.STATUS,
        LogsService.TRANSACTION.CADASTRAR,
        request.user,
        request.user.unidadeUsuario.unit_name,
        request.body,
      );  
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(201).json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_status } = request.params;
    await StatusController.service.delete(Number(id_status));

    try {
      StatusController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.STATUS, LogsService.TRANSACTION.EXCLUIR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await StatusController.service.read();
    try {
      StatusController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.STATUS, LogsService.TRANSACTION.LISTAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(200).json(data);
  }

  async readRecepcao(request: Request, response: Response): Promise<Response> {
    if (
      AuthService.checkRoles(AuthService.ROLES.ADMIN, request.user.roles) ||
      AuthService.checkRoles(AuthService.ROLES.ADVOGADO, request.user.roles)
    ) {
      const data = await StatusController.service.readAll()
      return response.status(200).json(data);
    }
    if (
      AuthService.checkRoles(AuthService.ROLES.RECEPCAO, request.user.roles)
    ) {
      const data = await StatusController.service.readRecpcao();
      return response.status(200).json(data);
    }
    try {
      StatusController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.STATUS, LogsService.TRANSACTION.LISTAR, request.user, request.user.unidadeUsuario.unit_name, request.body);
    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_status } = request.params;
    const data = await StatusController.service.readById(Number(id_status));

    try {

      StatusController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.STATUS, LogsService.TRANSACTION.VISUALIZAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }

    return response.status(200).json(data);
  }

  async readByAplicacao(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { aplicaA } = request.query;
    const data = await StatusController.service.readByAplicacao(
      aplicaA as string,
    );

    try {
      StatusController.logs.sendLog(
        LogsService.SYSTEM,
        LogsService.MODULE.STATUS,
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
    const { id_status } = request.params;
    const { descStatus, aplicaA } = request.body;
    await StatusController.service.update({
      id_status: Number(id_status),
      desc_status: descStatus,
      aplica_a: aplicaA,
    });

    try {
      
      StatusController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.STATUS, LogsService.TRANSACTION.EDITAR, request.user, request.user.unidadeUsuario.unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG');
    }


    return response.status(204).send();
  }
}

export { StatusController };
