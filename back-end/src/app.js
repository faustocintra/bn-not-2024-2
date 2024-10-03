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

import suppliersRouter from './routes/suppliers.js'
app.use('/suppliers', suppliersRouter)

import productsRouter from './routes/products.js'
app.use('/products', productsRouter)

import salesRouter from './routes/sales.js'
33	+
app.use('/sales', salesRouter)

export default app
