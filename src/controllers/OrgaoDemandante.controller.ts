import { Request, Response } from 'express';

import { OrgaoDemandanteService } from '../services/OrgaoDemandante.service';

class OrgaoDemandanteController {
  static service: OrgaoDemandanteService;
  public constructor() {
    OrgaoDemandanteController.service = new OrgaoDemandanteService();
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

    return response.status(201).json(service);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id_orgao } = request.params;
    await OrgaoDemandanteController.service.delete(Number(id_orgao));

    return response.status(204).send();
  }

  async read(request: Request, response: Response): Promise<Response> {
    const data = await OrgaoDemandanteController.service.read(request.query);
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

    return response.status(204).send();
  }
}

export { OrgaoDemandanteController };
