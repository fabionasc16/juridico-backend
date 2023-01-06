import { Request, Response } from 'express';

import { TiposEventoService } from '../services/TiposEvento.service';

class TiposEventoController {
  static service: TiposEventoService;
  public constructor() {
    TiposEventoController.service = new TiposEventoService();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descTipoEvento } = request.body;
    const service = await TiposEventoController.service.create({
      desc_tipoevento: descTipoEvento,
    });

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    await TiposEventoController.service.delete(Number(id_tipoevento));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await TiposEventoController.service.read();
    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    const data = await TiposEventoController.service.readById(
      Number(id_tipoevento),
    );

    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_tipoevento } = request.params;
    const { descTipoEvento } = request.body;

    await TiposEventoController.service.update({
      id_tipoevento: Number(id_tipoevento),
      desc_tipoevento: descTipoEvento,
    });
    return response.status(204).send();
  }
}

export { TiposEventoController };
