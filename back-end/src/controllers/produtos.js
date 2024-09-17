import prisma from '../database/client.js'

const controller = {}     // Objeto vazio

controller.create = async function (req, res) {
    try {
        /*
          Conecta-se ao BD e envia uma instrução de
          criação de um novo documento, com os dados
          que estão dentro de req.body
        */
        await prisma.produto.create({ data: req.body })

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
        // Manda buscar os dados no servidor
        const result = await prisma.produto.findMany({
            include: { categoria:true },
            orderBy: [{ nome: 'asc' }]
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

controller.retriveOne = async function (req, res) {
    try {
        const result = await prisma.produto.findUnique({
            where: { id: req.params.id }
        })
        if (result) res.send(result)
        else res.status(404).end()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

controller.update = async function (req, res) {
    try {
        // Busca o documento pelo id passado como parametro e, caso o documento
        // seja encontrado, atualiza-o com as informações passadas em req.body
        const result = await prisma.produto.update({
            where: { id: req.params.id },
            data: req.body
        })
        // Encontrou e atualizou -> retorna HTTP 204: No Content
        if (result) res.status(204).end()
        //Não encontrou (e não atualizou) -> retorna HTTP 404: Not Found
        else res.status(404).end()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export default controller
