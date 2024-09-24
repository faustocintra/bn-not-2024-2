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

/*************** ROTAS *******************/

import categoriasRouter from './routes/categorias.js'
app.use('/categorias', categoriasRouter)

import clienteRouter from './routes/cliente.js'
app.use('/cliente', clienteRouter)

import fornecedoresRouter from './routes/fornecedores.js'
app.use('/fornecedores', fornecedoresRouter)

import produtosRouter from './routes/produtos.js'
app.use('/produtos', produtosRouter)

import vendasRouter from './routes/vendas.js'
app.use('/vendas', vendasRouter)

export default app