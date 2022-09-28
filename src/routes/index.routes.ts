import { Router } from 'express';

import { assuntoRoutes } from './Assunto.routes';
import { classificacaoRoutes } from './Classificacao.routes';
import { processosRoutes } from './Processos.routes';
import { tiposProcessoRoutes } from './TiposProcesso.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello, API' });
});

routes.use('/tipos-processo', tiposProcessoRoutes);
routes.use('/processo', processosRoutes);
routes.use('/assunto', assuntoRoutes);
routes.use('/classificacao', classificacaoRoutes);

export { routes };
