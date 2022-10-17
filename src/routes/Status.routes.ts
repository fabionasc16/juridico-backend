import { Router } from 'express';

import { StatusController } from '../controllers/Status.controller';

const statusRoutes = Router();
const controller = new StatusController();

statusRoutes.post('/', controller.create);
statusRoutes.delete('/:id_status', controller.delete);
statusRoutes.get('/', controller.read);
statusRoutes.get('/id/:id_status', controller.readById);
statusRoutes.put('/:id_status', controller.update);

export { statusRoutes };
