import { Router } from 'express';

import { ReiteracaoController } from '../controllers/Reiteracao.controller';

const reiteracaoRoutes = Router();
const controller = new ReiteracaoController();

reiteracaoRoutes.post('/', controller.create);
reiteracaoRoutes.delete('/:id_reiteracao', controller.delete);
reiteracaoRoutes.get('/', controller.read);
reiteracaoRoutes.get('/id/:id_reiteracao', controller.readById);
reiteracaoRoutes.get('/processo', controller.readByProcesso);
reiteracaoRoutes.put('/:id_reiteracao', controller.update);

export { reiteracaoRoutes };
