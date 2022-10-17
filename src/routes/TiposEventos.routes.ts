import { Router } from 'express';

import { TiposEventoController } from '../controllers/TiposEvento.controller';

const tiposEventosRoutes = Router();
const controller = new TiposEventoController();

tiposEventosRoutes.post('/', controller.create);
tiposEventosRoutes.get('/', controller.read);
tiposEventosRoutes.get('/id/:id_tipoevento', controller.readById);
tiposEventosRoutes.put('/:id_tipoevento', controller.update);
tiposEventosRoutes.delete('/:id_tipoevento', controller.delete);

export { tiposEventosRoutes };
