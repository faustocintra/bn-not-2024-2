import { Router } from 'express';
import controller from '../controllers/categorias.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveALL)
router.get('/', controller.retrieveOne)

export default router;