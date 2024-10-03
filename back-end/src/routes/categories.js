import { Router } from 'express'

import controller from '../controllers/categories.js'

const categoriesRouter = Router()

categoriesRouter.post('/', controller.create)
categoriesRouter.get('/', controller.retrieveAll)
categoriesRouter.get('/:id', controller.retrieveOne)
categoriesRouter.put('/:id', controller.update)
categoriesRouter.delete('/:id', controller.delete)

export default categoriesRouter