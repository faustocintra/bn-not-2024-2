import { Router } from 'express';
import controller from '../controllers/vendas.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retrieveOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

// Rotas para os itens da venda
router.post('/:id/itens', controller.createItem);
router.post('/:id/itens', controller.retrieveAllItems);
// router.get('/:id/itemId', controller.retrieveOneItem);
// router.put('/:id/itemId', controller.updateItem);
// router.delete('/:id/itemId', controller.deleteItem);

export default router;
