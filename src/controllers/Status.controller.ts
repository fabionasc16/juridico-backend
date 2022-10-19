import { Request, Response } from 'express';

import { StatusSerivce } from '../services/Status.service';

class StatusController {
  static service: StatusSerivce;
  public constructor() {
    StatusController.service = new StatusSerivce();
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { descStatus, aplicaA } = request.body;
    const data = await StatusController.service.create({
      desc_status: descStatus,
      aplica_a: aplicaA,
    });

    return response.status(201).json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_status } = request.params;
    await StatusController.service.delete(Number(id_status));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await StatusController.service.read();
    return response.status(200).json(data);
  }

  async readById(request: Request, response: Response): Promise<Response> {
    const { id_status } = request.params;
    const data = await StatusController.service.readById(Number(id_status));

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

    return response.status(204).send();
  }
}

export { StatusController };
