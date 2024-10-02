import { Router } from 'express'
import controller from '../controllers/sales.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

router.post('/:id/items', controller.createItem)
router.get('/:id/items', controller.retrieveAllItems)
router.get('/:id/items/:itemId', controller.retrieveOneItem)
router.put('/:id/items/:itemId', controller.updateItem)
router.delete('/:id/items/:itemId', controller.deleteItem)

export default router