import { Request, Response } from 'express';

import { ClassificacaoService } from '../services/Classificacao.service';

class ClassificacaoController {
  static service: ClassificacaoService;
  public constructor() {
    ClassificacaoController.service = new ClassificacaoService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descClassificacao } = request.body;
    const service = await ClassificacaoController.service.create({
      desc_classificacao: descClassificacao,
    });

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_classificacao } = request.params;
    await ClassificacaoController.service.delete(Number(id_classificacao));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ClassificacaoController.service.read(request.query);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_classificacao } = request.params;
    const { descClassificacao } = request.body;

    await ClassificacaoController.service.update({
      id_classificacao: Number(id_classificacao),
      desc_classificacao: descClassificacao,
    });

    return response.status(204).send();
  }
}

export { ClassificacaoController };
