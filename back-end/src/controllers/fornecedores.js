import prisma from "../database/client.js";
import { includeRelations } from "../lib/utils.js";

const controller = {}     // Objeto vazio

controller.create = async function (req, res) {
    try {
        /*
            Conecta-se ao BD e envia uma instrução de
            criação de um novo documento, com os dados
            que estão dentro de req.body
        */
        await prisma.fornecedor.create({ data: req.body })

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
        const result = await prisma.fornecedor.findMany({
            orderBy: [{ razao_social: 'asc' }],
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
        // Manda buscar o documento no servidor usando
        const include = includeRelations(req.query)
        // como critério de busca um id informado no
        // parâmetro da requisição
        const result = await prisma.fornecedor.findUnique({
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
        const result = await prisma.fornecedor.update({
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
        const result = await prisma.fornecedor.delete({
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