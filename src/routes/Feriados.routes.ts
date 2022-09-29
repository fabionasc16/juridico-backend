import { Router } from 'express';

import { FeriadosController } from '../controllers/Feriados.controller';

const feriadosRoutes = Router();
const controller = new FeriadosController();

feriadosRoutes.post('/', controller.create);
feriadosRoutes.delete('/:id_feriado', controller.delete);
feriadosRoutes.get('/', controller.read);
feriadosRoutes.put('/:id_feriado', controller.update);

export { feriadosRoutes };
