import { Request, Response } from 'express';

import { OrgaoDemandanteService } from '../services/OrgaoDemandante.service';

import { LogsService } from '../services/Logs.service';

class OrgaoDemandanteController {
  static service: OrgaoDemandanteService;
  static logs: LogsService;

  public constructor() {
    OrgaoDemandanteController.service = new OrgaoDemandanteService();
    OrgaoDemandanteController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      orgaoDemandante,
      siglaOrgao,
      esferaOrgao,
      orgaoControle,
      orgaoJustica,
    } = request.body;
    const service = await OrgaoDemandanteController.service.create({
      orgao_demandante: orgaoDemandante,
      sigla_orgao: siglaOrgao,
      esfera_orgao: esferaOrgao,
      orgao_controle: orgaoControle,
      orgao_justica: orgaoJustica,
    });

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_orgao } = request.params;
    await OrgaoDemandanteController.service.delete(Number(id_orgao));

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await OrgaoDemandanteController.service.read(request);

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_orgao } = request.params;
    const data = await OrgaoDemandanteController.service.readById(
      Number(id_orgao),
    );

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_orgao } = request.params;
    const {
      orgaoDemandante,
      siglaOrgao,
      esferaOrgao,
      orgaoControle,
      orgaoJustica,
    } = request.body;

    await OrgaoDemandanteController.service.update({
      id_orgao: Number(id_orgao),
      orgao_demandante: orgaoDemandante,
      sigla_orgao: siglaOrgao,
      esfera_orgao: esferaOrgao,
      orgao_controle: orgaoControle,
      orgao_justica: orgaoJustica,
    });

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.EDITAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async listall(request: Request, response: Response): Promise<any> {
    const data = await OrgaoDemandanteController.service.listall();

    try {
      OrgaoDemandanteController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }
}

export { OrgaoDemandanteController };
