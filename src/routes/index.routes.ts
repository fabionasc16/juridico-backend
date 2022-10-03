import { Router } from 'express';

import { assuntoRoutes } from './Assunto.routes';
import { classificacaoRoutes } from './Classificacao.routes';
import { feriadosRoutes } from './Feriados.routes';
import { orgaoDemandanteRoutes } from './OrgaoDemandante.routes';
import { processosRoutes } from './Processos.routes';
import { tiposProcessoRoutes } from './TiposProcesso.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello, API' });
});

routes.use('/tipos-processos', tiposProcessoRoutes);
routes.use('/processos', processosRoutes);
routes.use('/assuntos', assuntoRoutes);
routes.use('/classificacoes', classificacaoRoutes);
routes.use('/feriados', feriadosRoutes);
routes.use('/orgaos-demandantes', orgaoDemandanteRoutes);

export { routes };
