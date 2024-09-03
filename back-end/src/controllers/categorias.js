import prisma from '../database/client.js'

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
    try {
        /*
            Conecta-se ao BD e envia uma instrução de criação de um novo documento
            com os dados que estão dentro de req.body
        */
       await prisma.categoria.create({ data: req.body })

       // Envia uma resposta de sucesso ao front-end
       // HTTP 201: Created
       res.status(201).end()
    }
    catch(error) {
        // Deu errado: exibe o erro no console do back-end
        console.log(error)
        
        // Envia o erro ao front-end, com status 500
        // HTTPS 500: Internal Server Error
        res.status(500).send(error)
    }
}

export default controller