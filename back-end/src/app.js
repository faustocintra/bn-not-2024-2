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

import categoriesRouter from './routes/categories.js'
app.use('/categories', categoriesRouter)

import clientsRouter from './routes/clients.js'
app.use('/clients', clientsRouter)

import suppliersRouter from './routes/suppliers.js'
app.use('/suppliers', suppliersRouter)

import productsRouter from './routes/products.js'
app.use('/products', productsRouter)

export default app
