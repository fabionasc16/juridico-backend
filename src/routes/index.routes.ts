import { Router } from 'express';

import { assuntoRoutes } from './Assunto.routes';
import { authRoutes } from './Auth.routes';
import { classificacaoRoutes } from './Classificacao.routes';
import { feriadosRoutes } from './Feriados.routes';
import { orgaoDemandanteRoutes } from './OrgaoDemandante.routes';
import { processosRoutes } from './Processos.routes';
import { reiteracaoRoutes } from './Reiteracao.routes';
import { responsaveisRoutes } from './Responsaveis.routes';
import { statusRoutes } from './Status.routes';
import { tiposEventosRoutes } from './TiposEventos.routes';
import { tiposProcessoRoutes } from './TiposProcesso.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello, API' });
});

routes.use('/tipos-processo', tiposProcessoRoutes);
routes.use('/processos', processosRoutes);
routes.use('/assuntos', assuntoRoutes);
routes.use('/classificacoes', classificacaoRoutes);
routes.use('/feriados', feriadosRoutes);
routes.use('/orgaos-demandantes', orgaoDemandanteRoutes);
routes.use('/reiteracoes', reiteracaoRoutes);
routes.use('/responsaveis', responsaveisRoutes);
routes.use('/tipo-evento', tiposEventosRoutes);
routes.use('/status', statusRoutes);
routes.use('/login', authRoutes);

export { routes };
