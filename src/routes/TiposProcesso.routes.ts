import { Router } from 'express';

import { TiposProcessoController } from '../controllers/TiposProcesso.controller';

const tiposProcessoRoutes = Router();
const controller = new TiposProcessoController();

tiposProcessoRoutes.post('/', controller.create);
tiposProcessoRoutes.get('/', controller.read);
tiposProcessoRoutes.put('/:id_tipoprocesso', controller.update);
tiposProcessoRoutes.delete('/:id_tipoprocesso', controller.delete);

export { tiposProcessoRoutes };
