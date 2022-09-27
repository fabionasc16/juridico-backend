import { Router } from 'express';

import { processosRoutes } from './Processos.routes';
import { tiposProcessoRoutes } from './TiposProcesso.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello, API' });
});

routes.use('/tipos-processo', tiposProcessoRoutes);
routes.use('/processos', processosRoutes);

export { routes };
