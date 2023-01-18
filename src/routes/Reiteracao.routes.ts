import { Router } from 'express';

import { ReiteracaoController } from '../controllers/Reiteracao.controller';
import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';

const reiteracaoRoutes = Router();
const controller = new ReiteracaoController();

reiteracaoRoutes.post(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.create,
);

reiteracaoRoutes.delete(
  '/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.delete,
);

reiteracaoRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.read,
);

reiteracaoRoutes.get(
  '/id/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readById,
);

reiteracaoRoutes.get(
  '/processo/:fk_processo',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.readByProcesso,
);

reiteracaoRoutes.put(
  '/:id_reiteracao',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN, AuthService.ROLES.ADVOGADO]),
  controller.update,
);

export { reiteracaoRoutes };
