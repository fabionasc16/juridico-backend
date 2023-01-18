import { Router } from 'express';

import { ProcessosController } from '../controllers/Processos.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const processosRoutes = Router();
const controller = new ProcessosController();

processosRoutes.post(
  '/',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.create,
);

processosRoutes.post(
  '/list',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.read,
);

processosRoutes.get(
  '/busca-processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.retrieveSIGEDData,
);

processosRoutes.get(
  '/movimentacoes-processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.retrieveMovimentacoesProcesso,
);

processosRoutes.get(
  '/id/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

processosRoutes.get(
  '/caixas-siged',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readCaixasSIGED,
);

processosRoutes.delete(
  '/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

processosRoutes.put(
  '/:id_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

processosRoutes.patch(
  '/atualiza-status',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.updateStatusProcesso,
);

processosRoutes.post(
  '/search/descricao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readByDescricao,
);

processosRoutes.post(
  '/search/objeto',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readByObjeto,
);

export { processosRoutes };
