import { Request, Response } from 'express';

import { ResponsaveisService } from '../services/Responsaveis.service';

class ResponsaveisController {
  static service: ResponsaveisService;
  public constructor() {
    ResponsaveisController.service = new ResponsaveisService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { nomeResponsavel, cpfResponsavel, telefone, email, registroOAB } =
      request.body;
    const service = await ResponsaveisController.service.create({
      nome_responsavel: nomeResponsavel,
      cpf_responsavel: cpfResponsavel,
      telefone,
      email,
      registro_oab: registroOAB,
    });

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_responsavel } = request.params;
    await ResponsaveisController.service.delete(Number(id_responsavel));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await ResponsaveisController.service.read(request.query);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_responsavel } = request.params;
    const { nomeResponsavel, cpfResponsavel, telefone, email, registroOAB } =
      request.body;

    await ResponsaveisController.service.update({
      id_responsavel: Number(id_responsavel),
      nome_responsavel: nomeResponsavel,
      cpf_responsavel: cpfResponsavel,
      telefone,
      email,
      registro_oab: registroOAB,
    });

    return response.status(204).send();
  }
}

export { ResponsaveisController };
