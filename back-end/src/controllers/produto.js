import prisma from '../database/client.js'

const controller ={} // Objeto vazio

controller.create = async function (req,res) {
    try {
        /* Conecta-s ao BD e envia uma instrução de 
        criação de um novo documento, com os dados 
        que estão dentro de req.body */

        await prisma.produto.create({data:req.body})

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
    
controller.retrieveALL = async function (req,res) {
    try{
        
        const result = await prisma.produto.findMany({
            include: {"categoria":true},
            orderBy: [{nome: 'asc'}]
        })

        res.send(result)
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
}
}

controller.retrieveOne = async function(req, res) {
    try {
        const result = await prisma.produto.findUnique({
            include: {"categoria":true},
            where: {id: req.params.id},
        })

        if(result) res.send(result)
        else res.status(404).end()

} catch (err) {

    console.log(err)
    res.status(500).send(err.message)
}}

controller.update = async function(req, res) {
    try {
        await prisma.produto.update({
            where: {id: req.params.id},
            data: req.body,
        })

        if(result)  res.status(204).end()

        else res.status(404).end()
} catch {
    console.log(err)
    res.status(500).send(err.message)
}
}

controller.delete = async function(req, res) {
    try {
        await prisma.produto.delete({
            where: {id: req.params.id},
        })
}catch(err){
    console.log(err)
    res.status(500).send(err.message)
}
}
export default controller