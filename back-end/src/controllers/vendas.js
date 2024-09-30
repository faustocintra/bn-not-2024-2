import prisma from '../database/client.js'
//import { includeRelations } from '../lib/utils.js'
function includeRelations(query){

  //Por padrão, não inclui nenhum relacionamento
  const include ={}

  //Se o parâmetro include estiver na query string
  if(query.include){
      //Recorta o valor do parâmetro, separando os
      //relacionamentos passados por vírgula
      const relations = query.include.split(',')
    
  }
  return include
}

const controller = {}

controller.create = async function(req, res) {
  try {
    await prisma.venda.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.venda.findMany({
      orderBy: [ { data_hora: 'asc' } ],
      include
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
    const include = includeRelations(req.query)
    const result = await prisma.venda.findUnique({
      where: { id: req.params.id },
      include
    })
    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    const result = await prisma.venda.update({
      where: { id: req.params.id },
      data: req.body
    })
    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.venda.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.createItem = async function(req, res) {
  try {
    req.body.venda_id = req.params.id
    await prisma.itemVenda.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAllItems = async function(req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.itemVenda.findMany({
      where: { venda_id: req.params.id },
      orderBy: [ { num_item: 'asc' } ],
      include
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOneItem = async function(req, res) { // Corrigido
  try {
    const result = await prisma.itemVenda.findFirst({
      where: { 
        id: req.params.itemId,
        venda_id: req.params.id
      },
      include
    })
    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}


controller.updateItem = async function (req,res) {
  try{
    const result = await prisma.itemVenda.update({
      where:{
        id: req.params.itemId,
        venda_id: req.params.id
      },
      data:req.body
    })

    //Encontrou e atualizou ~> HTTP 204: No Content
    if(result) res.status(204).end()
    //Não encontrou e não atualizou ~> HTTP 404: Not Found
    else res.status(404).end()  
  }

  catch(error) {
    //Deu errado: exibe o erro no console do back-en
    console.error(error)

    //Envia o erro ap front-end, com status 500
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }

  controller.deleteItem = async function(req, res) {
    try {
      await prisma.Itemvenda.delete({
        where: { id: req.params.id }
      })
      res.status(204).end()
    }
    catch(error) {
      if(error?.code === 'P2025') {
        res.status(404).end()
      } else {
        console.error(error)
        res.status(500).send(error)
      }
    }
  }
}



export default controller
