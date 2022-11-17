import { Router } from 'express';

import { ClassificacaoController } from '../controllers/Classificacao.controller';

const classificacaoRoutes = Router();
const controller = new ClassificacaoController();

classificacaoRoutes.post('/', controller.create);
classificacaoRoutes.delete('/:id_classificacao', controller.delete);
classificacaoRoutes.get('/', controller.read);
classificacaoRoutes.get('/id/:id_classificacao', controller.readById);
classificacaoRoutes.put('/:id_classificacao', controller.update);

export { classificacaoRoutes };
