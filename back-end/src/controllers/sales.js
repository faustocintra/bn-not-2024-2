import prisma from '../database/client.js'

function includeRelations(query) {
    const include = {}
    if (query.include) {
        const relations = query.include.split(',')
        if (relations.includes('items.produto')) {
            include.items = {
                include: { produto: true }
            }
        }
        else if (relations.includes('items')) {
            include.items = true
        }
        include.client = relations.includes('client')
    }
    return include
}

const controller = {}

controller.create = async function (req, res) {
    try {
        await prisma.sale.create({ data: req.body })
        res.status(201).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function (req, res) {
    try {

        const include = includeRelations(req.query)
        const result = await prisma.sale.findMany({
            orderBy: [{ data_hora: 'asc' }],
            include
        })
        res.send(result)
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function (req, res) {
    try {

        const include = includeRelations(req.query)
        const result = await prisma.sale.findUnique({
            where: { id: req.params.id },
            include
        })
        if (result) res.send(result)
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.sale.update({
            where: { id: req.params.id },
            data: req.body
        })
        if (result) res.status(204).end()
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.delete = async function (req, res) {
    try {
        await prisma.sale.delete({
            where: { id: req.params.id }
        })
        res.status(204).end()

    }
    catch (error) {
        if (error?.code === 'P2025') {
            res.status(404).end()
        }
        else {
            console.error(error)
            res.status(500).send(error)
        }
    }
}

controller.createItem = async function (req, res) {
    try {
        req.body.venda_id = req.params.id
        await prisma.saleItem.create({ data: req.body })
        res.status(201).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveAllItems = async function (req, res) {
    try {
        const include = includeRelations(req.query)
        const result = await prisma.saleItem.findMany({
            where: { venda_id: req.params.id },
            orderBy: [{ num_item: 'asc' }],
            include
        })
        res.send(result)
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveOneItem = async function (req, res) {
    try {
        const result = await prisma.saleItem.findFirst({
            where: {
                id: req.params.itemId,
                venda_id: req.params.id
            }
        })
        if (result) res.send(result)
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.updateItem = async function (req, res) {
    try {
        const result = await prisma.saleItem.update({
            where: {
                id: req.params.itemId,
                venda_id: req.params.id
            },
            data: req.body
        })
        if (result) res.status(204).end()
        else res.status(404).end()
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.deleteItem = async function (req, res) {
    try {
        await prisma.saleItem.delete({
            where: {
                id: req.params.itemId,
                venda_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (error) {
        if (error?.code === 'P2025') {
            res.status(404).end()
        }
        else {
            console.error(error)
            res.status(500).send(error)
        }
    }
}

export default controller