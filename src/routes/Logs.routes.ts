import { Router } from 'express';

import { checkJWT } from '../middlewares/CheckJWT.middleware';
import { checkRole } from '../middlewares/CheckRoles.middleware';
import { AuthService } from '../services/Auth.service';
import { LogsService } from '../services/Logs.service';

const logsRoutes = Router();
const authService = new AuthService();
const logs = new LogsService();

logsRoutes.get(
  '/',
  checkJWT,
  checkRole([AuthService.ROLES.ADMIN]),
  logs.list
);


export { logsRoutes };
