import prisma from '../database/client.js'

const controller = {}  // Objeto vazio

controller.create = async function (req, rep) {
    try {
        /*
        Conecta-se ao BD e envia uma instrução de criação
        de um novo documento, com os dados que estão dentro da req.body
        */
       await prisma.categoria.create({ data: req.body })

       // Envia uma resposta de sucesso ao front-end
       // HTTP 201: Created
       resizeBy.status(201).end()
    }
    catch {
       // Deu errado: exibe o erro no console do back-end
       console.error(error)
       
       // Envia o erro ao front-end, com status 500[
       // HTTP 500: Internal server error
       res.status(500).send(error)
    }
}


controller.retrieveALL = async function (req, res) {
    try {
        const result = await prisma.categoria.findMany({
            orderBy: [ { descricao: 'asc '} ]
        })

        res.send(result)
    }
    catch(error) {
        console.error(error)
        
        res.status(500).send(error)
    }
}


controller.retrieveOne = async function(req, res) {
    try {
        const result = await prisma.categoria.findUnique({
            where: { id: req.params.id}
        })
        if (result) res.send(result)
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        
        res.status(500).send(error)
    }
}

export default controller