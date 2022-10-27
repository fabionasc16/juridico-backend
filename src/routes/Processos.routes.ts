import { Router } from 'express';

import { ProcessosController } from '../controllers/Processos.controller';

const processosRoutes = Router();
const controller = new ProcessosController();

processosRoutes.post('/', controller.create);
processosRoutes.post('/', controller.read);
processosRoutes.get('/busca-processo', controller.retrieveSIGEDData);
processosRoutes.get('/id/:id_processo', controller.readById);
processosRoutes.delete('/:id_processo', controller.delete);
processosRoutes.put('/:id_processo', controller.update);
processosRoutes.patch('/atualiza-status', controller.updateStatusProcesso);

export { processosRoutes };
