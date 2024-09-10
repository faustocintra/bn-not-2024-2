import prisma from '../database/client.js';

const controller = {}; // Objeto vazio

controller.create = async function (req, res) { 
    try {
        /*
        Conecta-se ao BD e envia uma instrução de criação
        de um novo documento, com os dados que estão dentro da req.body
        */
        await prisma.cliente.create({ data: req.body });

        // Envia uma resposta de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end(); // Corrigi 'resizeBy' para 'res'
    }
    catch (error) {
        // Deu errado: exibe o erro no console do back-end
        console.error(error);

        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal server error
        res.status(500).send(error);
    }
};

controller.retrieveAll = async function(req, res) {
    try {
        // Manda buscar os dados do servidor
        const result = await prisma.cliente.findMany({
            orderBy: [{ descricao: 'asc'}]
        })

        // Retorna os dados obtidos ao cliente com o status HTTP 200: OK
        res.send(result)
    }
    catch(error) {
        // Deu errado: Exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com status 500 HTTP 500: Internal server error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function(req, res) {
    try {
        // Manda buscar o documento no servidor usando
        // Como critério de busca um id informado no
        // Parâmetro da requisição
        const result = await prisma.cliente.findUnique({
            where: { id: req.paramns.id }
        })

        // Encontrou o documento ~> retorna HTTP 200: OK
        if (result) res.send(result)
        // Não encontrou o documento ~> retorna HTTP 404 not found
        else res.status(404).end()
    }
    catch(error) {
        // Deu errado: Exibe o console no back-end
        console.error(error)

        // Envia ao front-end com status 500
        res.status(500).send(error)
    }
}
controller.update = async function(req, res) {
    try {
        // Manda buscar o documento no servidor usando
        // Como critério de busca um id informado no
        // Parâmetro da requisição
        const result = await prisma.cliente.update({
            where: { id: req.paramns.id },
            data: req.body
        })

        // Encontrou o documento ~> retorna HTTP 200: OK
        if (result) res.status(204).end()
        // Não encontrou o documento ~> retorna HTTP 404 not found
        else res.status(404).end()
    }
    catch(error) {
        // Deu errado: Exibe o console no back-end
        console.error(error)

        // Envia ao front-end com status 500
        res.status(500).send(error)
    }
}
controller.delete = async function(req, res) {
    try {
        // Manda buscar o documento no servidor usando
        // Como critério de busca um id informado no
        // Parâmetro da requisição
        const result = await prisma.cliente.delete({
            where: { id: req.paramns.id }
        })

        // Encontrou o documento ~> retorna HTTP 200: OK
        if (result) res.status(204).end()
        // Não encontrou o documento ~> retorna HTTP 404 not found
        else res.status(404).end()
    }
    catch(error) {
        // Deu errado: Exibe o console no back-end
        if (error?.code === 'P2025') {
            res.status(400).end()
        } else {
            console.error(error)
        }

        // Envia ao front-end com status 500
        res.status(500).send(error)
    }
}


export default controller;