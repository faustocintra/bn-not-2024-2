import prisma from '../database/client.js'
// import { includeRelations } from '../lib/utils.js'

// Versão da função includeRelations() especializada
// para o controller de vendas, lidando com include
// de segundo nivel
function includeRelations(query) {
  // Por padrão, não inclui nenhum relacionamento
  const include = {}

  // Se o parâmentro include estiver na query string
  if(query.include) {
    // Recorta o valor do parâmetro, separando os
    // relacionamentos passados por vírgula
    const relations = query.include.split(',')

    // Include de 2º nível
    if(relations.includes('itens.produto')) {
      include.itens = {
        include: { produto: true }
      }
    }
    // Include comum, de 1º nível
    else if(relations.includes('itens')) {
      include.itens = true
    }

    // Inclusão do cliente (1º nível)
    include.cliente = relations.includes('cliente')
  }

  return include
}

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    /*
      Conecta-se ao BD e envia uma instrução de
      criação de um novo documento, com os dados
      que estão dentro de req.body
    */
    await prisma.venda.create({ data: req.body })

    // Envia uma resposta de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda buscar os dados no servidor
    const result = await prisma.venda.findMany({
      orderBy: [ { data_hora: 'asc' } ],
      include
    })

    // Retorna os dados obtidos ao cliente com o status
    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    
    const include = includeRelations(req.query) 

    // Manda buscar o documento no servidor usando
    // como critério de busca um id informado no
    // parâmetro da requisição
    const result = await prisma.venda.findUnique({
      where: { id: req.params.id },
      include
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    // Busca o documento pelo id passado como parâmetro e, caso
    // o documento seja encontrado, atualiza-o com as informações
    // passadas em req.body
    const result = await prisma.venda.update({
      where: { id: req.params.id },
      data: req.body
    })

    // Encontrou e atualizou ~> retorna HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    // Busca o documento a ser excluído pelo id passado
    // como parâmetro e efetua a exclusão caso encontrado
    await prisma.venda.delete({
      where: { id: req.params.id }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()

  }
  catch(error) {
    if(error?.code === 'P2025') {   // Código erro de exclusão no Prisma
      // Não encontrou e não excluiu ~> HTTP 404: Not Found
      res.status(404).end()
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

/***************************************************************/

controller.createItem = async function(req, res) {
  try {
    // Adiciona no corpo da requisição o id da venda,
    // passado como parâmetro na rota
    req.body.venda_id = req.params.id

    await prisma.itemVenda.create({ data: req.body })

    // Envia uma resposta de sucesso ao front-end
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAllItems = async function(req, res) {
  try {
    const include = includeRelations(req.query)

    // Manda buscar os dados no servidor
    const result = await prisma.itemVenda.findMany({
      where: { venda_id: req.params.id },
      orderBy: [ { num_item: 'asc' } ],
      include
    })

    // HTTP 200: OK
    res.send(result)
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOneItem = async function(req, res) {
  try {

    // A rigor, o item da venda poderia ser encontrado apenas por
    // seu id. No entanto, para forçar a necessidade da associação
    // de um item de venda à venda correspondente, a busca é feita
    // usando-se tanto o id do item da venda quanto o id da venda
    const result = await prisma.itemVenda.findFirst({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      }
    })

    // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.updateItem = async function(req, res) {
  try {
    const result = await prisma.itemVenda.update({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      },
      data: req.body
    })

    // Encontrou e atualizou ~> HTTP 204: No Content
    if(result) res.status(204).end()
    // Não encontrou e não atualizou ~> HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.deleteItem = async function(req, res) {
  try {
    // Busca o documento a ser excluído pelo id passado
    // como parâmetro e efetua a exclusão caso encontrado
    await prisma.itemVenda.delete({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()

  }
  catch(error) {
    if(error?.code === 'P2025') {   // Código erro de exclusão no Prisma
      // Não encontrou e não excluiu ~> HTTP 404: Not Found
      res.status(404).end()
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