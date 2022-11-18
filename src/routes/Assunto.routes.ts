import { Router } from 'express';

import { AssuntoController } from '../controllers/Assunto.controller';

const assuntoRoutes = Router();
const controller = new AssuntoController();

assuntoRoutes.post('/', controller.create);
assuntoRoutes.delete('/:id_assunto', controller.delete);
assuntoRoutes.get('/', controller.read);
assuntoRoutes.get('/id/:id_assunto', controller.readById);
assuntoRoutes.put('/:id_assunto', controller.update);

export { assuntoRoutes };
