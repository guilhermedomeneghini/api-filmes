import {Router} from 'express'
import * as FilmeController from '../controllers/filmeController';
import { authenticateToken, authorizeAdmin } from '../middlewares/filmeMiddleware';

const mainRouter = Router();

mainRouter.get('/', authenticateToken, FilmeController.listar);
mainRouter.post('/',[authenticateToken, authorizeAdmin], FilmeController.cadastrar);
mainRouter.get('/:id', authenticateToken, FilmeController.buscarPorId);
mainRouter.put('/:id', [authenticateToken, authorizeAdmin], FilmeController.editar);
mainRouter.delete('/:id', [authenticateToken, authorizeAdmin], FilmeController.excluir);

export default mainRouter;