import { Router } from 'express';

import { OrgaoDemandanteController } from '../controllers/OrgaoDemandante.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const orgaoDemandanteRoutes = Router();
const controller = new OrgaoDemandanteController();

orgaoDemandanteRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.create,
);

orgaoDemandanteRoutes.delete(
  '/:id_orgao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

orgaoDemandanteRoutes.post(
  '/list',
  checkJWT,
  checkRole([
    AuthService.ROLES.ADMIN,
    AuthService.ROLES.ADVOGADO,
    AuthService.ROLES.RECEPCAO,
  ]),
  controller.read,
);

orgaoDemandanteRoutes.get(
  '/id/:id_orgao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

orgaoDemandanteRoutes.put(
  '/:id_orgao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

orgaoDemandanteRoutes.get('/list', checkJWT, controller.listall);

export { orgaoDemandanteRoutes };
