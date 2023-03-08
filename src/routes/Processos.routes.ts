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
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.read,
);

processosRoutes.get(
  '/busca-processo',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.retrieveSIGEDData,
);

processosRoutes.get(
  '/movimentacoes-processo',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.retrieveMovimentacoesProcesso,
);

processosRoutes.get(
  '/id/:id_processo',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.readById,
);

processosRoutes.get(
  '/caixas-siged',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.readCaixasSIGED,
);

processosRoutes.delete(
  '/:id_processo',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.delete,
);

processosRoutes.put(
  '/:id_processo',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.update,
);

processosRoutes.patch(
  '/atualiza-status',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.updateStatusProcesso,
);

processosRoutes.post(
  '/search/descricao',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.readByDescricao,
);

processosRoutes.post(
  '/search/objeto',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.readByObjeto,
);

processosRoutes.post(
  '/atualiza-prazos-processos',
 // checkJWT,
 // checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.atualizaPrazosProcesso,
);
processosRoutes.get(
  '/atualiza-prazo-processo',
 // checkJWT,
 // checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.atualizaPrazoProcesso,
);

export { processosRoutes };
