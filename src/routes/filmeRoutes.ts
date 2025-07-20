import {Router} from 'express'
import * as FilmeController from '../controllers/filmeController';

const mainRouter = Router();

mainRouter.get('/', FilmeController.listar); // ok - ok 
mainRouter.post('/',FilmeController.cadastrar); // ok - ok
mainRouter.get('/:id', FilmeController.buscarPorId); // ok - ok
mainRouter.put('/:id', FilmeController.editar); // ok  - ok
mainRouter.delete('/:id', FilmeController.excluir); // ok - ok

export default mainRouter;