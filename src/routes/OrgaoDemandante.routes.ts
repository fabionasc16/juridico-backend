import { Router } from 'express';

import { OrgaoDemandanteController } from '../controllers/OrgaoDemandante.controller';

const orgaoDemandanteRoutes = Router();
const controller = new OrgaoDemandanteController();

orgaoDemandanteRoutes.post('/', controller.create);
orgaoDemandanteRoutes.delete('/:id_orgao', controller.delete);
orgaoDemandanteRoutes.get('/', controller.read);
orgaoDemandanteRoutes.put('/:id_orgao', controller.update);

export { orgaoDemandanteRoutes };
