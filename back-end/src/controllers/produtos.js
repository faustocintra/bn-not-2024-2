import prisma from '../database/client.js';
import { includeRelations } from '../lib/utils.js';

const controller = {};  // Objeto vazio

// Função para criar um produto
controller.create = async function(req, res) {
  try {
    await prisma.produto.create({ data: req.body });
    res.status(201).end();  // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

// Função para buscar todos os produtos
controller.retrieveAll = async function(req, res) {
  try {
    const include = includeRelations(req.query);
    const result = await prisma.produto.findMany({
      include,
      orderBy: [{ nome: 'asc' }]
    });
    res.send(result);  // HTTP 200: OK (implícito)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

// Função para buscar um produto por ID
controller.retrieveOne = async function(req, res) {
  try {
    const include = includeRelations(req.query);
    const result = await prisma.produto.findUnique({
      where: { id: req.params.id },
      include
    });
    if (result) res.send(result);  // HTTP 200: OK
    else res.status(404).end();  // HTTP 404: Not Found
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

// Função para atualizar um produto
controller.update = async function(req, res) {
  try {
    const result = await prisma.produto.update({
      where: { id: req.params.id },
      data: req.body
    });
    if (result) res.status(204).end();  // HTTP 204: No Content
    else res.status(404).end();  // HTTP 404: Not Found
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

// Função para deletar um produto
controller.delete = async function(req, res) {
  try {
    await prisma.produto.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();  // HTTP 204: No Content
  } catch (error) {
    if (error?.code === 'P2025') {
      res.status(404).end();  // HTTP 404: Not Found
    } else {
      console.error(error);
      res.status(500).send(error);  // HTTP 500: Internal Server Error
    }
  }
};

// Funções para os itens da venda
controller.createItem = async function(req, res) {
  try {
    await prisma.item.create({
      data: {
        vendaId: req.params.id,
        ...req.body
      }
    });
    res.status(201).end();  // HTTP 201: Created
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

controller.retrieveAllItems = async function(req, res) {
  try {
    const items = await prisma.item.findMany({
      where: { vendaId: req.params.id }
    });
    res.send(items);  // HTTP 200: OK (implícito)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

controller.retrieveOneItem = async function(req, res) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.itemId }
    });
    if (item) res.send(item);  // HTTP 200: OK
    else res.status(404).end();  // HTTP 404: Not Found
  } catch (error) {
    console.error(error);
    res.status(500).send(error);  // HTTP 500: Internal Server Error
  }
};

export default controller;
