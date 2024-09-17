import prisma from '../database/client.js'
import { includeRelations } from '../lib/utils.js'

const controller = {} //Objeto vazio

controller.create = async function (req,res) {
    try {
        /** 
         * Conecta-se ao BD e envia uma instrução de
         * criação de um novo documento, com os dados que
         * estão dentro de req.body
        */
       await prisma.produto.create({data: req.body})

       // Envia uma resposta de sucesso ao front-end
       // HTTPS 201: Created
       res.status(201).end()
    } catch(error) {
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
        const result = await prisma.produto.findMany({
            include,
            orderBy: [{nome: 'asc'}]
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
        // Manda buscar os dados no servidor usando
        // como critério de busca um id informado no
        // parâmetro da requisição
        const include = includeRelations(req.query)

        const result = await prisma.produto.findUnique({
            include,
            where: {
                id: req.params.id
            }
        })

        // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
        if (result) res.send(result)
        // Não encontrou o documento ~> Retorna HTTP 404: Not found
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
         // Busca o documento pelo id passado como parâmetro e, caso
        // o documento seja encontrado, atualiza-o com as informações
        // passadas em req.body
        
        const result = await prisma.produto.update({
            where: {id: req.params.id},
            data: req.body
        })
           // Encontrou e atualizou ~> retorna HTTP 204: No Content
           if (result) res.status(204).send(result)
            // Não encontrou (e não atualizou) ~> Retorna HTTP 404: Not found
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
        // Busca o documento a ser excluído pelo id passado
        // como parâmetro e efetua a exclusão caso encontrado
        const result = await prisma.produto.delete({
            where: {id: req.params.id}
        })


        // Encontrou e exclui ~> HTTP 204: No Content
         res.status(204).end()
    }
    catch (error) {
        if(error?.error === 'P2025') {
            // Não encontrou e não excluiu ~> HTTP 204: Not Found
            res.status(204).end()
        }
        else {
            // Outros tipos de erro
            console.error(error)

            // Envia o erro ao front-end, com status 500
            // HTTP 500: Internal Server Error
            res.status(500).send(error)
        }
    }
}


export default controller