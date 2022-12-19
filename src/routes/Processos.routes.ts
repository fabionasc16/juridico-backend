import { Router } from 'express';
import { checkJWT } from 'middlewares/CheckJWT.middleware';
import { checkRole } from 'middlewares/CheckRoles.middleware';
import { AuthService } from 'services/Auth.service';

import { ProcessosController } from '../controllers/Processos.controller';

const processosRoutes = Router();
const controller = new ProcessosController();

processosRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.create,
);

processosRoutes.post(
  '/list',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.read,
);

processosRoutes.get(
  '/busca-processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.retrieveSIGEDData,
);

processosRoutes.get(
  '/movimentacoes-processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.retrieveMovimentacoesProcesso,
);

processosRoutes.get(
  '/id/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readById,
);

processosRoutes.get(
  '/caixas-siged',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readCaixasSIGED,
);

processosRoutes.delete(
  '/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.delete,
);

processosRoutes.put(
  '/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.update,
);

processosRoutes.patch(
  '/atualiza-status',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.updateStatusProcesso,
);

processosRoutes.post(
  '/search/descricao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readByDescricao,
);

processosRoutes.post(
  '/search/objeto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  controller.readByObjeto,
);

export { processosRoutes };
