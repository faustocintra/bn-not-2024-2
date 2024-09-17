import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

/**************Rotas********** */
import categoriasRouter from './routes/categorias.js'
app.use('/cateorias', categoriasRouter)

import clientRouter from './routes/client.js'
app.use('/clientes', clientRouter)

import fornecedorRouter from './routes/fornecedor.js'
app.use('/fornecedor', fornecedorRouter)

import produtoRouter from './routes/produto.js'
app.use('/produto', produtoRouter)


export default app
