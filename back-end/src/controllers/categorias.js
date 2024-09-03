import prisma from '../database/client.js'

const controller ={} // Objeto vazio

controller.create = async function (req,res) {
    try {
        /* Conecta-s ao BD e envia uma instrução de 
        criação de um novo documento, com os dados 
        que estão dentro de req.body */

        await prisma.categoria.create({data:req.body})

        // envia uma resposta de sucesso ao front-end
        // HTTP 201: Created
        res.status(201).end()
    
        
        }catch (error) {
            // Deu errado exibe o erro o console do back-end
            console.error(error)

            // Envia uma resposta de erro ao front-end
            // HTTP 500: Internal Server Error
            res.status(500).end()
        }
        
    } 
    


export default controller