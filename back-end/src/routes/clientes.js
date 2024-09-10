import { Router } from "express";
import controller from "../controllers/clientes.js";

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.get('/:id', controller.update)

export default router