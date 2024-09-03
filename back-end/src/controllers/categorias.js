import prisma from "../database/client.js";

const controller = {} // Objeto vazio

controller.create = async function(req, res) {
    try {
        /*
        Conecta-se ao BD e envia uma instrução de
        criação de um novo documento, com os dados
        que estão dentro de um req.body
        */

        await prisma.categoria.create({ data: req.body })

        //Envia uma resposta de sucesso ao front end
        //HTTP 201: Created
        res.status(201).end()


    }
    catch(error){
        //Deu errado: exibe o erro no console do back-end
        console.error(error)

        //Envia o erro ao front enc, com status 500
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}


export default controller