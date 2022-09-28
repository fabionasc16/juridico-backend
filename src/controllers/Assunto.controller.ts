import { Request, Response } from 'express';

import { AssuntoService } from '../services/Assunto.service';

class AssuntoController {
  static service: AssuntoService;
  public constructor() {
    AssuntoController.service = new AssuntoService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { codigoSIGED, descricaoAssunto } = request.body;
    const service = await AssuntoController.service.create({
      codigo_siged: codigoSIGED,
      desc_assunto: descricaoAssunto,
    });

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_assunto } = request.params;
    await AssuntoController.service.delete(Number(id_assunto));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await AssuntoController.service.read(request.query);
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

    return response.status(204).send();
  }
}

export { AssuntoController };
