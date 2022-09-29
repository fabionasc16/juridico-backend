import { Request, Response } from 'express';

import { FeriadosService } from '../services/Feriados.service';

class FeriadosController {
  static service: FeriadosService;
  public constructor() {
    FeriadosController.service = new FeriadosService();
  }
  async create(request: Request, response: Response): Promise<Response> {
    const { dataFeriado, descFeriado, tipoFeriado } = request.body;
    const service = await FeriadosController.service.create({
      data_feriado: dataFeriado,
      desc_feriado: descFeriado,
      tipo_feriado: tipoFeriado,
    });

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    await FeriadosController.service.delete(Number(id_feriado));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await FeriadosController.service.read(request.query);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id_feriado } = request.params;
    const { dataFeriado, descFeriado, tipoFeriado } = request.body;

    await FeriadosController.service.update({
      id_feriado: Number(id_feriado),
      data_feriado: dataFeriado,
      desc_feriado: descFeriado,
      tipo_feriado: tipoFeriado,
    });

    return response.status(204).send();
  }
}

export { FeriadosController };
