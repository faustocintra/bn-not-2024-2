import prisma from '../database/client.js'
// import { includeRelations } from '../lib/utils.js'

// Versão da função includeRelations() especializada
// para o controller de vendas, lidando com include
// de segundo nível
function includeRelations(query) {
  const include = {}

  if (query.include) {
    const relations = query.include.split(',')

    if (relations.includes('itens.produto')) {
      include.itens = {
        include: { produto: true }
      }
    } else if (relations.includes('itens')) {
      include.itens = true
    }

    include.cliente = relations.includes('cliente')
  }

  return include
}

const controller = {} // Objeto vazio

controller.create = async function (req, res) {
  try {
    await prisma.venda.create({ data: req.body })
    res.status(201).end()
  } catch (error) {
    console.error('Erro ao criar venda:', error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function (req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.venda.findMany({
      orderBy: [{ data_hora: 'asc' }],
      include
    })
    res.send(result)
  } catch (error) {
    console.error('Erro ao recuperar todas as vendas:', error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function (req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.venda.findUnique({
      where: { id: req.params.id },
      include
    })
    if (result) res.send(result)
    else res.status(404).end()
  } catch (error) {
    console.error('Erro ao recuperar a venda com ID:', req.params.id, error)
    res.status(500).send(error)
  }
}

controller.update = async function (req, res) {
  try {
    const result = await prisma.venda.update({
      where: { id: req.params.id },
      data: req.body
    })
    if (result) res.status(204).end()
    else res.status(404).end()
  } catch (error) {
    console.error('Erro ao atualizar a venda com ID:', req.params.id, error)
    res.status(500).send(error)
  }
}

controller.delete = async function (req, res) {
  try {
    await prisma.venda.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error('Erro ao excluir a venda com ID:', req.params.id, error)
      res.status(500).send(error)
    }
  }
}

/***************************************************************/

controller.createItem = async function (req, res) {
  try {
    req.body.venda_id = req.params.id
    await prisma.itemVenda.create({ data: req.body })
    res.status(201).end()
  } catch (error) {
    console.error('Erro ao criar item de venda:', error)
    res.status(500).send(error)
  }
}

controller.retrieveAllItems = async function (req, res) {
  try {
    const include = includeRelations(req.query)
    const result = await prisma.itemVenda.findMany({
      where: { venda_id: req.params.id },
      orderBy: [{ num_item: 'asc' }],
      include
    })
    res.send(result)
  } catch (error) {
    console.error('Erro ao recuperar todos os itens da venda:', error)
    res.status(500).send(error)
  }
}

controller.retrieveOneItem = async function (req, res) {
  try {
    const result = await prisma.itemVenda.findFirst({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      }
    })
    if (result) res.send(result)
    else res.status(404).end()
  } catch (error) {
    console.error('Erro ao recuperar item de venda com ID:', req.params.itemId, error)
    res.status(500).send(error)
  }
}

controller.updateItem = async function (req, res) {
  try {
    const result = await prisma.itemVenda.update({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      },
      data: req.body
    })
    if (result) res.status(204).end()
    else res.status(404).end()
  } catch (error) {
    console.error('Erro ao atualizar item de venda com ID:', req.params.itemId, error)
    res.status(500).send(error)
  }
}

controller.deleteItem = async function (req, res) {
  try {
    await prisma.itemVenda.delete({
      where: {
        id: req.params.itemId,
        venda_id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end()
    } else {
      console.error('Erro ao excluir item de venda com ID:', req.params.itemId, error)
      res.status(500).send(error)
    }
  }
}

export default controller
