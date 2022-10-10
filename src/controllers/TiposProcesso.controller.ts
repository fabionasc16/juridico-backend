import { Request, Response } from 'express';

import { TiposProcessoService } from '../services/TiposProcesso.service';

class TiposProcessoController {
  static service: TiposProcessoService;
  public constructor() {
    TiposProcessoController.service = new TiposProcessoService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { desc_tipoprocesso } = request.body;
    const service = await TiposProcessoController.service.create({
      desc_tipoprocesso,
    });

    return response.status(201).send(service);
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await TiposProcessoController.service.read(request.query);
    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_tipoprocesso } = request.params;
    const data = await TiposProcessoController.service.readById(
      Number(id_tipoprocesso),
    );

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_tipoprocesso } = request.params;
    const { desc_tipoprocesso } = request.body;

    await TiposProcessoController.service.update({
      id_tipoprocesso: Number(id_tipoprocesso),
      desc_tipoprocesso,
    });

    return response.status(204).send();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_tipoprocesso } = request.params;

    await TiposProcessoController.service.delete({
      id_tipoprocesso: Number(id_tipoprocesso),
    });

    return response.status(204).send();
  }
}

export { TiposProcessoController };
