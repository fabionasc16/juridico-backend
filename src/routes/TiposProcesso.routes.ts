import { Router } from 'express';

import { TiposProcessoController } from '../controllers/TiposProcesso.controller';

const tiposProcesso = Router();
const controller = new TiposProcessoController();

tiposProcesso.post('/', controller.create);
tiposProcesso.get('/', controller.read);
tiposProcesso.put('/:id_tipoprocesso', controller.update);
tiposProcesso.delete('/:id_tipoprocesso', controller.delete);

export { tiposProcesso };
