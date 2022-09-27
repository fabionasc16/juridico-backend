import { ProcessosController } from 'controllers/Processos.controller';
import { Router } from 'express';

const processosRoutes = Router();
const controller = new ProcessosController();

processosRoutes.post('/', controller.create);
processosRoutes.get('/', controller.read);
processosRoutes.delete('/:id_processo', controller.delete);
processosRoutes.put('/:id_processo', controller.update);

export { processosRoutes };
