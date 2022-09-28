import { Router } from 'express';

import { AssuntoController } from '../controllers/Assunto.controller';

const assuntoRoutes = Router();
const controller = new AssuntoController();

assuntoRoutes.post('/', controller.create);
assuntoRoutes.delete('/:id_assunto', controller.delete);
assuntoRoutes.get('/', controller.read);
assuntoRoutes.put('/:is_assunto', controller.update);

export { assuntoRoutes };
