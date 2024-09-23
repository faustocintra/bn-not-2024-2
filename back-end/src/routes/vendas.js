import { Router } from 'express'
import controller from '../controllers/vendas.js'

const router = Router()

router.post('/:id/itens', controller.createItem)
router.get('/:id/itens', controller.retrieveAllItems)
router.get('/:id/itens/:itemId', controller.retrieveOneItem)
//router.put('/:id', controller.update)
//router.delete('/:id', controller.delete)

export default router
