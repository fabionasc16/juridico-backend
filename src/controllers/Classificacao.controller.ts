import { Request, Response } from 'express';

import { ClassificacaoService } from '../services/Classificacao.service';

import { LogsService } from '../services/Logs.service';

class ClassificacaoController {
  static service: ClassificacaoService;
  static logs: LogsService;

  public constructor() {
    ClassificacaoController.service = new ClassificacaoService();
    ClassificacaoController.logs = new LogsService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descClassificacao } = request.body;
    const service = await ClassificacaoController.service.create({
      desc_classificacao: descClassificacao,
    });

    try {
      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.CLASSIFICACAO, LogsService.TRANSACTION.CADASTRAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_classificacao } = request.params;
    await ClassificacaoController.service.delete(Number(id_classificacao));

    try {
      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.CLASSIFICACAO, LogsService.TRANSACTION.EXCLUIR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ClassificacaoController.service.read(request.query);
    try {

      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.CLASSIFICACAO, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_classificacao } = request.params;
    const data = await ClassificacaoController.service.readById(
      Number(id_classificacao),
    );

    try {

      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.CLASSIFICACAO, LogsService.TRANSACTION.VISUALIZAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_classificacao } = request.params;
    const { descClassificacao } = request.body;

    await ClassificacaoController.service.update({
      id_classificacao: Number(id_classificacao),
      desc_classificacao: descClassificacao,
    });

    try {

      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.CLASSIFICACAO, LogsService.TRANSACTION.EDITAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }


    return response.status(204).send();
  }

  async listall(request: Request, response: Response): Promise<any> {
    const data = await ClassificacaoController.service.listall();

    try {
      ClassificacaoController.logs.sendLog(LogsService.SYSTEM, LogsService.MODULE.ASSUNTOS, LogsService.TRANSACTION.LISTAR, request.user.nome, request.user.unidadeUsuario[0].unit_name, request.body);

    } catch (error) {
      console.error('ERROR AO GRAVAR O LOG', error);
    }

    return response.status(200).json(data);
  }
}

export { ClassificacaoController };
