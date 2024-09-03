import prisma from '../database/client.js'

const controller = {}


controller.create = async function (req, res) {

    try {
        await prisma.categoria.create({ data: req.body })
        res.status(201).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }

}