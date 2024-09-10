import {Router} from 'express'
import controller from '../controllers/categorias.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveALL)
router.get('/:id', controller.retrieveALL)
router.put('/:id', controller.retrieveALL)
router.delete('/:id', controller.retrieveALL)


export default router
