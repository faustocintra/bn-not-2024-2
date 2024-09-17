import { Router } from 'express'
import controller from '../controllers/produtos.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retriveOne)
router.put('/:id', controller.update)

export default router
