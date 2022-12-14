import { Router } from 'express';

import { AuthService } from '../services/Auth.service';

const authRoutes = Router();
const authService = new AuthService();

authRoutes.post('/', authService.authenticate);
authRoutes.get('/profiles', authService.profiles);
authRoutes.get('/user/exists/:cpf', authService.findUsuarioByCpf);

export { authRoutes };
