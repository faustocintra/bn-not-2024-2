import prisma from '../database/client.js'

const controller = {}   // objeto vazio

controller.create = async function(req, res) {
    try {
        /* conecta-se ao BD e envia uma instrução de 
        criacao de um novo documento, com os dados
        que estão dentro de req.body
        */
        await prisma.categoria.create ({ data: req.body })

        // Envia uam resposta de sucesso ao front-end
        // HHTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        //Deu errado: exibe o erro no console do back-end
        console.error(error)

        //Envia o erro ao front-end, com status 500
        //HTTP 500: internal Server Error
        res.status(500).send(error)
    }
}

export default controller;
