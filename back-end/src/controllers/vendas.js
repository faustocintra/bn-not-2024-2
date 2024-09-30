import prisma from "../database/client.js";
// import { includeRelations } from "../lib/utils.js";

function includeRelations(query) {
    const include = {}

    if (relations.includes('itens.produto')) {
        include.itens = { include: { produto: true } }
    } else if (relations.includes('itens')) {
        include.itens = true
    }

    if (query.include) {
        const relations = query.include.split(',')
        for (let rel of relations) {
            include[rel] = true
        }
    }
    console.log(include)
    return include
}

const controller = {}     // Objeto vazio

controller.create = async function (req, res) {
    try {
        /*
            Conecta-se ao BD e envia uma instrução de
            criação de um novo documento, com os dados
            que estão dentro de req.body
        */
        await prisma.venda.create({ data: req.body })

        // Envia uma resposta de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end()
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function (req, res) {
    try {
        const include = includeRelations(req.query)
        // Manda buscar os dados no servidor
        const result = await prisma.venda.findMany({
            orderBy: [{ data_hora: 'asc' }],
            include
        })

        // Retorna os dados obtidos ao cliente com o status
        // HTTP 200: OK (implícito)
        res.send(result)
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function (req, res) {
    try {
        const include = includeRelations(req.query)
        // Manda buscar o documento no servidor usando
        // como critério de busca um id informado no
        // parâmetro da requisição
        const result = await prisma.venda.findUnique({
            where: { id: req.params.id },
            include
        })

        // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
        if (result) res.send(result)
        // Não encontrou o documento ~> retorna HTTP 404: Not Found
        else res.status(404).end()
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async function (req, res) {
    try {
        const result = await prisma.venda.update({
            where: { id: req.params.id },
            data: req.body
        })

        if (result) return res.status(204).end()
        else res.status(404).end()

    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async function (req, res) {
    try {
        const result = await prisma.venda.delete({
            where: { id: req.params.id },
        })

        if (result) return res.status(204).end()
        else res.status(404).end()

    }
    catch (error) {
        if (error?.code === 'P2025') return res.status(404).end()
        else {
            // Deu errado: exibe o erro no console do back-end
            console.error(error)

            // Envia o erro ao front-end, com status 500
            // HTTP 500: Internal Server Error
            res.status(500).send(error)
        }
    }
}






controller.createItem = async function (req, res) {
    try {
        /*
            Conecta-se ao BD e envia uma instrução de
            criação de um novo documento, com os dados
            que estão dentro de req.body
        */
        req.body.venda_id = req.params.id
        await prisma.itemVenda.create({ data: req.body })

        // Envia uma resposta de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end()
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAllItems = async function (req, res) {
    try {
        const include = includeRelations(req.query)
        // Manda buscar os dados no servidor
        const result = await prisma.itemVenda.findMany({
            where: { venda_id: req.params.id },
            orderBy: [{ num_item: 'asc' }],
            include
        })

        // Retorna os dados obtidos ao cliente com o status
        // HTTP 200: OK (implícito)
        res.send(result)
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOneItem = async function (req, res) {
    try {
        const include = includeRelations(req.query)
        // Manda buscar o documento no servidor usando
        // como critério de busca um id informado no
        // parâmetro da requisição
        const result = await prisma.itemVenda.findFirst({
            where: {
                id: req.params.itemId,
                venda_id: req.params.id
            },
            include
        })

        // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
        if (result) res.send(result)
        // Não encontrou o documento ~> retorna HTTP 404: Not Found
        else res.status(404).end()
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.updateItem = async function (req, res) {
    try {
        const result = await prisma.itemVenda.update({
            where: {
                id: req.params.itemId,
                venda_id: req.params.id,
            },
            data: req.body
        })

        if (result) return res.status(204).end()
        else res.status(404).end()

    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.deleteItem = async function (req, res) {
    try {
        const result = await prisma.venda.delete({
            where: { id: req.params.id },
        })

        if (result) return res.status(204).end()
        else res.status(404).end()

    }
    catch (error) {
        if (error?.code === 'P2025') return res.status(404).end()
        else {
            // Deu errado: exibe o erro no console do back-end
            console.error(error)

            // Envia o erro ao front-end, com status 500
            // HTTP 500: Internal Server Error
            res.status(500).send(error)
        }
    }
}





export default controller