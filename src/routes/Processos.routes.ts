import { Router } from 'express';

import { ProcessosController } from '../controllers/Processos.controller';

const processosRoutes = Router();
const controller = new ProcessosController();

processosRoutes.post('/', controller.create);
processosRoutes.post('/list', controller.read);
processosRoutes.get('/busca-processo', controller.retrieveSIGEDData);
processosRoutes.get(
  '/movimentacoes-processo',
  controller.retrieveMovimentacoesProcesso,
);
processosRoutes.get('/id/:id_processo', controller.readById);
processosRoutes.get('/caixas-siged', controller.readCaixasSIGED);
processosRoutes.delete('/:id_processo', controller.delete);
processosRoutes.put('/:id_processo', controller.update);
processosRoutes.patch('/atualiza-status', controller.updateStatusProcesso);
processosRoutes.post('/search/descricao', controller.readByDescricao);
processosRoutes.post('/search/objeto', controller.readByObjeto);

export { processosRoutes };
