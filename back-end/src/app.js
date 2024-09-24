import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import clienteRouter from './routes/cliente.js'
import categoriaRouter from './routes/categoria.js'
import fornecedorRouter from './routes/fornecedor.js'
import produtoRouter from './routes/produto.js'
import vendaRouter from './routes/venda.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/categoria', categoriaRouter)
app.use('/cliente', clienteRouter)
app.use('/fornecedor', fornecedorRouter)
app.use('/produto', produtoRouter)
app.use('/venda', vendaRouter)

export default app
