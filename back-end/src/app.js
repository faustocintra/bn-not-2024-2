import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

import categoriesRouter from './routes/categories.js'
app.use('/categories', categoriesRouter)

import clientesRouter from './routes/clientes.js'
app.use('/clientes', clientesRouter)

import fornecedoresRouter from './routes/fornecedores.js'
app.use('/fornecedores', fornecedoresRouter)

import productsRouter from './routes/produtos.js'
app.use('/produtos', productsRouter)

import salesRouter from './routes/sales.js'
33	+
app.use('/sales', salesRouter)

export default app
