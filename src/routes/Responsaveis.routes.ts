import { Router } from 'express';

import { ResponsaveisController } from '../controllers/Responsaveis.controller';

const responsaveisRoutes = Router();
const controller = new ResponsaveisController();

responsaveisRoutes.post('/', controller.create);
responsaveisRoutes.delete('/:id_responsavel', controller.delete);
responsaveisRoutes.get('/', controller.read);
responsaveisRoutes.get('/id/:id_responsavel', controller.readById);
responsaveisRoutes.put('/:id_responsavel', controller.update);

export { responsaveisRoutes };
