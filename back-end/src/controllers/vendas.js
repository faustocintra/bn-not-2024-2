import prisma from '../database/client.js';
import { includeRelations } from '../lib/utils.js';

const controller = {}; // Objeto vazio

controller.create = async function (req, res) {
  try {
    await prisma.venda.create({ data: req.body });
    res.status(201).end(); // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

controller.retrieveAll = async function (req, res) {
  try {
    const include = includeRelations(req.query);
    const result = await prisma.venda.findMany({
      orderBy: [{ data_hora: 'asc' }],
      include,
    });
    res.send(result); // HTTP 200: OK (implícito)
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

controller.retrieveOne = async function (req, res) {
  try {

    // A rigor, item da venda poderia ser encontrado apenas por
    // seu id. No entanto, para forçar a necessidade da associação
    // de um intem de venda à venda correspondente, a busca feita
    // usando-se tanto o id do item da venda quanto o id da venda
    const include = includeRelations(req.query);
    const result = await prisma.venda.findUnique({
      where: { 
        id: req.params.itemId,
        venda_id: req.params.id
        },      
    });

    // Encontrou o documento ~> retorna HTTP 200: OK (implicito)
    if (result) res.send(result); // HTTP 200: OK (implícito)
    // Não encontrou o documento ~> retorna HTTP 400: Not Found'
    else res.status(404).end(); // HTTP 404: Not Found
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

controller.update = async function (req, res) {
  try {
    const result = await prisma.venda.update({
      where: { id: req.params.id },
      data: req.body,
    });
    if (result) res.status(204).end(); // HTTP 204: No Content
    else res.status(404).end(); // HTTP 404: Not Found
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
};

controller.delete = async function (req, res) {
  try {
    await prisma.venda.delete({
      where: { id: req.params.id },
    });
    res.status(204).end(); // HTTP 204: No Content
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end(); // HTTP 404: Not Found
    } else {
      console.error(error);
      res.status(500).send(error); // HTTP 500: Internal Server Error
    }
  }
};

controller.createItem = async function (req, res) {
  try {
    req.body.venda_id = req.params.id; // Adiciona no corpo da requisição o id da venda
    await prisma.itemVenda.create({ data: req.body });
    res.status(201).end(); // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
}

controller.retrieveAllItems = async function (req, res) {
  try {
    const include = includeRelations(req.query);

    // Manda busccar os dados no servidor
    const result = await prisma.venda.findMany({
      orderBy: [{ num_item: 'asc' }],
      include,
    })

    // HTTP 200: OK
    res.send(result)

    res.send(result); // HTTP 200: OK (implícito)
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // HTTP 500: Internal Server Error
  }
}

export default controller;

