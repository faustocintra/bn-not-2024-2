import { Router } from 'express'
import controller from '../controllers/fornecedores.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/id', controller.update)
export default router
