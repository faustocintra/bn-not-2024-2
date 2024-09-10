import prisma from "../database/client.js";

const controller = {}

controller.create = async function (req, res) {
    try {
        await prisma.fornecedor.create({ data: req.body })
        res.status(201).end()
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const result = await prisma.fornecedor.findMany({
            orderBy: [{ razao_social: 'asc' }]
        })
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const result = await prisma.fornecedor.findUnique({
            where: { id: req.params.id }
        })
        if (result) res.send(result)
        else res.status(404).end();
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }

}

controller.update = async function (req, res) {
    try {
        console.log(req.body)
        const result = await prisma.fornecedor.update({
            where: { id: req.params.id },
            data: req.body
        })
        if (result) res.status(204).end();
        else res.status(404).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

controller.delete = async function (req, res) {
    try {
        const result = await prisma.fornecedor.delete({
            where: { id: req.params.id }
        })
        if (result) res.status(202).end()
        else res.status(404).end();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

export default controller;